// USDA FoodData Central API - No Nutritionix required
const USDA_API_KEY = process.env.NEXT_PUBLIC_USDA_API_KEY;

import axios from 'axios';

const usdaApi = axios.create({
  baseURL: 'https://api.nal.usda.gov/fdc/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Nutrient names to look for in search results
// The API returns nutrients with "nutrientName" field
const NUTRIENT_NAMES = {
  calories: ['Energy', 'Calories', 'Energy (Atwater General Factors)'],
  protein: ['Protein'],
  carbs: ['Carbohydrate, by difference', 'Carbohydrates', 'Total Carbohydrate'],
  fat: ['Total lipid (fat)', 'Total Fat', 'Fat'],
  fiber: ['Fiber, total dietary', 'Dietary Fiber'],
  sugar: ['Sugars, total including NLEA', 'Total Sugars', 'Sugars, total']
};

/**
 * Extract nutrient value from search results by matching nutrient name
 */
function getNutrientByName(nutrients, nameOptions) {
  if (!nutrients || !Array.isArray(nutrients)) return 0;
  
  for (const name of nameOptions) {
    const nutrient = nutrients.find(n => {
      const nutrientName = n.nutrientName || n.name || '';
      return nutrientName.toLowerCase().includes(name.toLowerCase());
    });
    if (nutrient) {
      return nutrient.value ?? nutrient.amount ?? 0;
    }
  }
  return 0;
}

/**
 * Search for foods using USDA FoodData Central API
 * Returns foods with full nutrition data
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Array of food items with nutrition data
 */
export async function searchUsda(query) {
  try {
    const response = await usdaApi.post('/foods/search', {
      query,
      pageSize: 20,
      dataType: ['Survey (FNDDS)', 'Foundation', 'SR Legacy']
    }, {
      params: { api_key: USDA_API_KEY }
    });

    if (!response.data?.foods) {
      return [];
    }

    // Filter out foods without nutrient data and map to our format
    const results = response.data.foods
      .filter(food => food.foodNutrients && food.foodNutrients.length > 0)
      .map(food => {
        const nutrients = food.foodNutrients || [];
        
        // Determine serving size
        let servingSize = '100g';
        if (food.servingSize) {
          servingSize = `${food.servingSize} ${food.servingSizeUnit || 'g'}`;
        } else if (food.householdServingFullText) {
          servingSize = food.householdServingFullText;
        }

        const calories = getNutrientByName(nutrients, NUTRIENT_NAMES.calories);
        const protein = getNutrientByName(nutrients, NUTRIENT_NAMES.protein);
        const carbs = getNutrientByName(nutrients, NUTRIENT_NAMES.carbs);
        const fat = getNutrientByName(nutrients, NUTRIENT_NAMES.fat);

        return {
          id: food.fdcId,
          fdcId: food.fdcId,
          name: formatFoodName(food.description),
          brand: food.brandOwner || food.brandName || null,
          servingSize,
          calories,
          protein,
          carbs,
          fat,
          fiber: getNutrientByName(nutrients, NUTRIENT_NAMES.fiber),
          sugar: getNutrientByName(nutrients, NUTRIENT_NAMES.sugar),
          dataType: food.dataType,
          source: 'usda'
        };
      })
      // Filter out items with no calories (likely incomplete data)
      .filter(food => food.calories > 0 || food.protein > 0 || food.carbs > 0 || food.fat > 0);

    return results;
  } catch (error) {
    console.error('USDA API error:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Get detailed nutrition data for a specific food from USDA
 * This fetches more complete data than search results
 * @param {number} fdcId - FDC ID of the food
 * @returns {Promise<Object>} - Food item with detailed nutrition data
 */
export async function getFoodDetails(fdcId) {
  try {
    const response = await usdaApi.get(`/food/${fdcId}`, {
      params: { api_key: USDA_API_KEY }
    });
    
    const food = response.data;
    const nutrients = food.foodNutrients || [];

    // For detailed view, nutrients have a different structure with nested nutrient object
    const getDetailedNutrient = (nameOptions) => {
      for (const name of nameOptions) {
        const nutrient = nutrients.find(n => {
          const nutrientName = n.nutrient?.name || n.nutrientName || n.name || '';
          return nutrientName.toLowerCase().includes(name.toLowerCase());
        });
        if (nutrient) {
          return nutrient.amount ?? nutrient.value ?? 0;
        }
      }
      return 0;
    };

    // Determine serving size
    let servingSize = '100g';
    if (food.servingSize) {
      servingSize = `${food.servingSize} ${food.servingSizeUnit || 'g'}`;
    } else if (food.householdServingFullText) {
      servingSize = food.householdServingFullText;
    }

    return {
      id: food.fdcId,
      fdcId: food.fdcId,
      name: formatFoodName(food.description),
      brand: food.brandOwner || food.brandName || null,
      servingSize,
      calories: getDetailedNutrient(NUTRIENT_NAMES.calories),
      protein: getDetailedNutrient(NUTRIENT_NAMES.protein),
      carbs: getDetailedNutrient(NUTRIENT_NAMES.carbs),
      fat: getDetailedNutrient(NUTRIENT_NAMES.fat),
      fiber: getDetailedNutrient(NUTRIENT_NAMES.fiber),
      sugar: getDetailedNutrient(NUTRIENT_NAMES.sugar),
      source: 'usda'
    };
  } catch (error) {
    console.error('USDA API error:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Format food name to be more readable
 * USDA names are often in ALL CAPS or have extra formatting
 */
function formatFoodName(name) {
  if (!name) return '';
  
  // Convert to title case if all caps
  if (name === name.toUpperCase()) {
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .replace(/,\s*/g, ', ');
  }
  return name;
}

/**
 * Parse natural language quantity from query
 * e.g., "2 apples" returns { query: "apple", multiplier: 2 }
 */
function parseQuantity(query) {
  const match = query.match(/^(\d+\.?\d*)\s+(.+)$/);
  if (match) {
    return {
      multiplier: parseFloat(match[1]),
      query: match[2]
    };
  }
  return { multiplier: 1, query };
}

/**
 * Main search function - searches USDA and applies quantity multipliers
 * @param {string} query - Search query (can include quantities like "2 apples")
 * @returns {Promise<Array>} - Array of food items with nutrition data
 */
export async function searchFoods(query) {
  try {
    const { multiplier, query: searchQuery } = parseQuantity(query.trim());
    
    const results = await searchUsda(searchQuery);
    
    // Apply multiplier if quantity was specified
    if (multiplier !== 1) {
      return results.map(food => ({
        ...food,
        name: `${multiplier}x ${food.name}`,
        calories: food.calories * multiplier,
        protein: food.protein * multiplier,
        carbs: food.carbs * multiplier,
        fat: food.fat * multiplier,
        fiber: (food.fiber || 0) * multiplier,
        sugar: (food.sugar || 0) * multiplier
      }));
    }
    
    return results;
  } catch (error) {
    console.error('Food search error:', error.message);
    throw error;
  }
}