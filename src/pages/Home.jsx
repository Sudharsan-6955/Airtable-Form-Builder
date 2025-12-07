import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Airtable Form Builder
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create dynamic forms connected to your Airtable bases. Build forms with conditional logic, 
            collect responses, and sync data automatically with webhooks.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium"
            >
              Get Started
            </Link>
            <Link
              to="/dashboard"
              className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium border-2 border-blue-600"
            >
              View Dashboard
            </Link>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold mb-2">Airtable Integration</h3>
              <p className="text-gray-600">
                Connect directly to your Airtable bases and tables. No manual data entry needed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Conditional Logic</h3>
              <p className="text-gray-600">
                Show or hide questions based on previous answers with powerful conditional rules.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-2">Real-time Sync</h3>
              <p className="text-gray-600">
                Automatic webhook synchronization keeps your data in sync between Airtable and our database.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-lg shadow-md p-6 text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Public Form Embed (no Airtable account needed)</h2>
            <p className="text-gray-600 mb-4">
              Anyone can view and submit this embedded form. Submissions go straight into your Airtable base.
            </p>
            <div className="w-full" style={{ minHeight: '533px' }}>
              <iframe
                className="airtable-embed w-full rounded"
                src="https://airtable.com/embed/apphJ6R60sok3YYyA/pagHAFY57OewE9rTA/form"
                frameBorder="0"
                width="100%"
                height="533"
                style={{ background: 'transparent', border: '1px solid #ccc' }}
              ></iframe>
            </div>
          </div>

          <footer className="mt-20 pt-8 border-t border-gray-200">
            <div className="flex justify-center space-x-6 text-sm text-gray-600">
              <Link to="/terms-of-service" className="hover:text-blue-600">
                Terms of Service
              </Link>
              <span>•</span>
              <Link to="/privacy-policy" className="hover:text-blue-600">
                Privacy Policy
              </Link>
              <span>•</span>
              <a 
                href="https://github.com/Sudharsan-6955/Airtable-Form-Builder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                GitHub
              </a>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              © 2025 Airtable Form Builder. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
