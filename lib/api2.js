// You'll need to add your API keys to your environment variables
const NUTRITIONIX_APP_ID = process.env.NEXT_PUBLIC_NUTRITIONIX_APP_ID;
const NUTRITIONIX_API_KEY = process.env.NEXT_PUBLIC_NUTRITIONIX_API_KEY;

// Import axios
import axios from 'axios';

// Create axios instance with base URL for Nutritionix API
const nutritionixApi = axios.create({
  baseURL: 'https://trackapi.nutritionix.com/v2',
  headers: {
    'x-app-id': NUTRITIONIX_APP_ID,
    'x-app-key': NUTRITIONIX_API_KEY,
    'Content-Type': 'application/json'
  }
});

/**
 * Unified function to search for foods using Nutritionix API
 * Always returns multiple results regardless of query type
 * @param {string} query - Search query (can be simple or natural language)
 * @returns {Promise<Array>} - Array of food items with nutrition data
 */
export async function searchFoods(query) {
  try {
    // First try the instant search which always returns multiple results
    const searchResponse = await nutritionixApi.get('/search/instant', {
      params: { 
        query,
        detailed: true
      }
    });
    
    // Process all food items uniformly (both common and branded)
    const allResults = [
      // Process common foods
      ...(searchResponse.data.common || []).map(food => ({
        id: food.food_name,
        name: food.food_name,
        brand: null,
        servingSize: food.serving_qty ? `${food.serving_qty} ${food.serving_unit || 'serving'}` : 'Varied',
        calories: food.full_nutrients?.find(n => n.attr_id === 208)?.value || null,
        protein: food.full_nutrients?.find(n => n.attr_id === 203)?.value || null,
        carbs: food.full_nutrients?.find(n => n.attr_id === 205)?.value || null,
        fat: food.full_nutrients?.find(n => n.attr_id === 204)?.value || null,
        source: 'nutritionix'
      })),
      
      // Process branded foods
      ...(searchResponse.data.branded || []).map(food => ({
        id: `${food.nix_item_id}`,
        name: food.food_name,
        brand: food.brand_name || null, // Keep brand info but treat everything as a unified list
        servingSize: food.serving_qty ? `${food.serving_qty} ${food.serving_unit || 'serving'}` : 'Varied',
        calories: food.nf_calories,
        protein: food.nf_protein,
        carbs: food.nf_total_carbohydrate,
        fat: food.nf_total_fat,
        source: 'nutritionix'
      }))
    ];
    
    // If it looks like a natural language query, also fetch detailed nutrition data
    // but don't replace the multiple results, just supplement them with the precise match
    if (query.match(/\d+\s+\w+/) || 
        query.includes('cup') || query.includes('tbsp') || 
        query.includes('tsp') || query.includes('ounce') || 
        query.includes('oz') || query.includes('slice') || 
        query.includes('piece')) {
      
      try {
        const detailedResponse = await nutritionixApi.post('/natural/nutrients', { query });
        
        // Process the detailed results
        const detailedItems = detailedResponse.data.foods.map(food => ({
          id: `${food.food_name}_detailed`,
          name: food.food_name,
          brand: food.brand_name || null,
          servingSize: `${food.serving_qty} ${food.serving_unit}`,
          calories: food.nf_calories,
          protein: food.nf_protein,
          carbs: food.nf_total_carbohydrate,
          fat: food.nf_total_fat,
          source: 'nutritionix',
          isDetailedMatch: true  // Flag to indicate this is a precise natural language match
        }));
        
        // Add the detailed results at the beginning since they're likely more relevant
        // but maintain a single unified list format
        return [...detailedItems, ...allResults];
      } catch (error) {
        console.error('Natural language processing failed, returning standard search results', error);
        // If natural language processing fails, still return the standard search results
        return allResults;
      }
    }
    
    return allResults;
  } catch (error) {
    console.error('Food search error:', error.response?.data || error.message);
    throw error;
  }
}