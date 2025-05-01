export default function AboutInfo() {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About NutriTrack</h1>
          <p className="mt-4 text-xl text-gray-500">Your personal nutrition tracking companion</p>
        </div>
        
        <div className="prose prose-lg prose-green mx-auto">
          <h2>Our Mission</h2>
          <p>
            NutriTrack was created with a simple goal in mind: to make nutrition tracking accessible, 
            intuitive, and insightful for everyone. We believe that understanding what you eat is the 
            first step toward making healthier choices and achieving your health and fitness goals.
          </p>
          
          <h2>How It Works</h2>
          <p>
            NutriTrack leverages powerful nutrition APIs to provide accurate data on thousands of foods. 
            Our app enables you to:
          </p>
          
          <ul>
            <li>Search for foods using natural language (e.g., "1 apple" or "grilled chicken breast")</li>
            <li>Log meals throughout the day and track your calorie and macronutrient intake</li>
            <li>Set personalized nutrition goals based on your needs</li>
            <li>Visualize your progress with intuitive charts and statistics</li>
            <li>Develop better eating habits through data-driven insights</li>
          </ul>
          
          <h2>Nutrition Data Sources</h2>
          <p>
            We use two primary data sources to provide comprehensive nutrition information:
          </p>
          
          <h3>Nutritionix API</h3>
          <p>
            The Nutritionix API offers natural language processing capabilities and a vast database of 
            both generic and branded food products. This allows you to search for foods the way you 
            naturally think about them.
          </p>
          
          <h3>USDA FoodData Central</h3>
          <p>
            The USDA FoodData Central database provides authoritative food composition data for thousands 
            of foods. This ensures we have accurate nutritional information even for foods that might not 
            be found in commercial databases.
          </p>
          
          <h2>Privacy First</h2>
          <p>
            We take your privacy seriously. NutriTrack stores all your nutrition data locally in your browser, 
            so your personal information never leaves your device. We don't track, share, or sell any of your 
            personal data.
          </p>
          
          <h2>Get In Touch</h2>
          <p>
            Have suggestions, feedback, or questions? We'd love to hear from you! Reach out to us at 
            <a href="mailto:contact@nutritrack.com" className="text-green-600 hover:text-green-700"> contact@nutritrack.com</a>.
          </p>
          
          <h2>Disclaimer</h2>
          <p>
            NutriTrack is designed as a tool to help track nutrition and is not intended to provide medical advice.
            The nutritional information comes from third-party sources and may not be completely accurate for all foods.
            Always consult with healthcare professionals for personalized nutrition advice.
          </p>
        </div>
      </div>
    );
  }