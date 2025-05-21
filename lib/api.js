// You'll need to add your API keys to your environment variables
const NUTRITIONIX_APP_ID = process.env.NEXT_PUBLIC_NUTRITIONIX_APP_ID;
const NUTRITIONIX_API_KEY = process.env.NEXT_PUBLIC_NUTRITIONIX_API_KEY;
const USDA_API_KEY = process.env.NEXT_PUBLIC_USDA_API_KEY;

// Import axios
import axios from 'axios';

// Create axios instances with base URLs for APIs
const nutritionixApi = axios.create({
  baseURL: 'https://trackapi.nutritionix.com/v2',
  headers: {
    'x-app-id': NUTRITIONIX_APP_ID,
    'x-app-key': NUTRITIONIX_API_KEY,
    'Content-Type': 'application/json'
  }
});

const usdaApi = axios.create({
  baseURL: 'https://api.nal.usda.gov/fdc/v1'
});

/**
 * Search for foods using Nutritionix natural language API
 * @param {string} query - Natural language query (e.g., "1 apple")
 * @returns {Promise<Array>} - Array of food items with nutrition data
 */
export async function searchNutritionix(query) {
  try {
    const response = await nutritionixApi.post('/natural/nutrients', { query });
    
    return response.data.foods.map(food => ({
      id: food.food_name,
      name: food.food_name,
      brand: food.brand_name || null,
      servingSize: `${food.serving_qty} ${food.serving_unit}`,
      calories: food.nf_calories,
      protein: food.nf_protein,
      carbs: food.nf_total_carbohydrate,
      fat: food.nf_total_fat,
      source: 'nutritionix'
    }));
  } catch (error) {
    console.error('Nutritionix API error:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Search for foods using USDA FoodData Central API
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Array of food items with basic info
 */
export async function searchUsda(query) {
  try {
    // When using axios with repeated query parameters (like dataType),
    // we need to handle it differently than URLSearchParams
    
    // Create URLSearchParams object for proper handling of multiple dataType values
    const params = new URLSearchParams({
      api_key: USDA_API_KEY,
      query,
      pageSize: 10
    });
    
    // Add each dataType value separately
    ['Survey (FNDDS)', 'Foundation', 'SR Legacy'].forEach(type => {
      params.append('dataType', type);
    });
    
    const response = await axios.get(`${usdaApi.defaults.baseURL}/foods/search?${params.toString()}`);
    
    return response.data.foods.map(food => ({
      fdcId: food.fdcId,
      name: food.description,
      brand: food.brandOwner || null,
      source: 'usda'
    }));
  } catch (error) {
    console.error('USDA API error:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Get detailed nutrition data for a specific food from USDA
 * @param {number} fdcId - FDC ID of the food
 * @returns {Promise<Object>} - Food item with detailed nutrition data
 */
export async function getFoodDetails(fdcId) {
  try {
    const params = {
      api_key: USDA_API_KEY
    };
    
    const response = await usdaApi.get(`/food/${fdcId}`, { params });
    const food = response.data;
    const nutrients = food.foodNutrients || [];
    
    // Extract common nutrients (IDs based on USDA's nutrient IDs)
    const getNutrientValue = (nutrientId) => {
      const nutrient = nutrients.find(n => n.nutrient?.id === nutrientId);
      return nutrient ? nutrient.amount : 0;
    };
    
    // 1008 = Energy (kcal)
    // 1003 = Protein
    // 1005 = Carbohydrates
    // 1004 = Total fat
    return {
      fdcId: food.fdcId,
      name: food.description,
      brand: food.brandOwner || null,
      servingSize: food.servingSize ? `${food.servingSize} ${food.servingSizeUnit || 'g'}` : 'Varies',
      calories: getNutrientValue(1008),
      protein: getNutrientValue(1003),
      carbs: getNutrientValue(1005),
      fat: getNutrientValue(1004),
      source: 'usda'
    };
  } catch (error) {
    console.error('USDA API error:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Search for foods using both Nutritionix and USDA APIs
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Combined results from both APIs
 */
export async function searchFoods(query) {
  try {
    // Use primarily Nutritionix for natural language processing
    if (query.match(/\d+/)) { // If query contains numbers, likely a natural language query
      return await searchNutritionix(query);
    } else {
      // Otherwise use both APIs
      const [nutritionixResults, usdaResults] = await Promise.all([
        searchNutritionix(query).catch(() => []),
        searchUsda(query).catch(() => [])
      ]);
      
      return [...nutritionixResults, ...usdaResults];
    }
  } catch (error) {
    console.error('Food search error:', error.message);
    throw error;
  }
}