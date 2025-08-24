'use client';

export default function TestAuthPage() {
  const testCredentials = [
    {
      title: 'Demo User (Premium)',
      email: 'demo@wandermate.com',
      password: 'DemoPassword123!',
      membership: 'Premium'
    },
    {
      title: 'Test User (VIP)',
      email: 'test@wandermate.com',
      password: 'TestPassword123!',
      membership: 'VIP'
    },
    {
      title: 'Regular User (Basic)',
      email: 'user@wandermate.com',
      password: 'UserPassword123!',
      membership: 'Basic'
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            🔐 Test Authentication
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Use these exact credentials to test authentication
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          {testCredentials.map((cred, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6 border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {cred.title}
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email:
                  </label>
                  <div className="mt-1 flex">
                    <input
                      type="text"
                      value={cred.email}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(cred.email)}
                      className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password:
                  </label>
                  <div className="mt-1 flex">
                    <input
                      type="text"
                      value={cred.password}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm font-mono"
                    />
                    <button
                      onClick={() => copyToClipboard(cred.password)}
                      className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  Membership: <span className="font-medium">{cred.membership}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <a
            href="/auth/signin"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Sign In Page
          </a>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            💡 Tip: Use the copy buttons to avoid typing errors
          </p>
        </div>
      </div>
    </div>
  );
} 