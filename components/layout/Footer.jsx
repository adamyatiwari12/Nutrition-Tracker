export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-12 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-xl font-bold text-center">NutriTrack</p>
              <p className="text-sm text-gray-300">Track your nutrition journey with ease</p>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
                <div className="mt-2 space-y-2">
                  <a href="/" className="text-gray-300 hover:text-white block">Home</a>
                  <a href="/tracker" className="text-gray-300 hover:text-white block">Food Tracker</a>
                  <a href="/progress" className="text-gray-300 hover:text-white block">Progress</a>
                  <a href="/about" className="text-gray-300 hover:text-white block">About</a>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
                <div className="mt-2 space-y-2">
                  <a href="#" className="text-gray-300 hover:text-white block">Nutrition Tips</a>
                  <a href="#" className="text-gray-300 hover:text-white block">FAQ</a>
                  <a href="#" className="text-gray-300 hover:text-white block">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-300">
            <p>&copy; {new Date().getFullYear()} NutriTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }