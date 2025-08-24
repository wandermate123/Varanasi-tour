'use client';

import React, { useState } from 'react';
import { Shield, AlertTriangle, Check, X, Copy, ExternalLink } from 'lucide-react';

const APIKeySecurityGuide = () => {
  const [environment, setEnvironment] = useState<'development' | 'production'>('development');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const developmentConfig = {
    httpReferrers: {
      recommended: false,
      values: ['None (unrestricted)'],
      risk: 'Medium',
      description: 'Easier for development but less secure'
    },
    apiRestrictions: {
      recommended: true,
      values: ['Maps JavaScript API', 'Places API', 'Geocoding API'],
      risk: 'Low',
      description: 'Always restrict to needed APIs only'
    },
    ipRestrictions: {
      recommended: false,
      values: ['None'],
      risk: 'Low',
      description: 'Not suitable for web applications'
    }
  };

  const productionConfig = {
    httpReferrers: {
      recommended: true,
      values: [
        'yourdomain.com/*',
        'www.yourdomain.com/*',
        'subdomain.yourdomain.com/*'
      ],
      risk: 'Low',
      description: 'Essential for production security'
    },
    apiRestrictions: {
      recommended: true,
      values: ['Maps JavaScript API', 'Places API', 'Geocoding API'],
      risk: 'Low',
      description: 'Prevent unauthorized API usage'
    },
    ipRestrictions: {
      recommended: false,
      values: ['None (use HTTP referrers instead)'],
      risk: 'Low',
      description: 'Not recommended for dynamic web apps'
    }
  };

  const currentConfig = environment === 'development' ? developmentConfig : productionConfig;

  const developmentReferrers = `localhost:3000/*
localhost:3001/*
127.0.0.1:3000/*
127.0.0.1:3001/*`;

  const productionReferrers = `yourdomain.com/*
www.yourdomain.com/*
*.yourdomain.com/*`;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <Shield className="w-8 h-8 text-blue-500" />
          Google Maps API Key Security
        </h1>
        <p className="text-gray-600">
          Configure your API key restrictions for optimal security and functionality
        </p>
      </div>

      {/* Environment Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setEnvironment('development')}
            className={`px-4 py-2 rounded-md transition-colors ${
              environment === 'development'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Development
          </button>
          <button
            onClick={() => setEnvironment('production')}
            className={`px-4 py-2 rounded-md transition-colors ${
              environment === 'production'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Production
          </button>
        </div>
      </div>

      {/* Quick Recommendation */}
      <div className={`p-4 rounded-lg border-l-4 ${
        environment === 'development' 
          ? 'bg-amber-50 border-amber-400' 
          : 'bg-green-50 border-green-400'
      }`}>
        <div className="flex items-start gap-3">
          {environment === 'development' ? (
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
          ) : (
            <Shield className="w-5 h-5 text-green-500 mt-0.5" />
          )}
          <div>
            <h3 className="font-semibold text-gray-800">
              {environment === 'development' ? 'Development Recommendation' : 'Production Recommendation'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {environment === 'development' 
                ? 'For easier development, you can start without HTTP referrer restrictions, but always restrict API access.'
                : 'Always use HTTP referrer restrictions and API restrictions for production deployments.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Configuration Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* HTTP Referrer Restrictions */}
        <div className="bg-white rounded-lg border shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-3 h-3 rounded-full ${
              currentConfig.httpReferrers.recommended ? 'bg-green-500' : 'bg-amber-500'
            }`}></div>
            <h3 className="font-semibold text-gray-800">HTTP Referrers</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {currentConfig.httpReferrers.recommended ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-amber-500" />
              )}
              <span className="text-sm font-medium">
                {currentConfig.httpReferrers.recommended ? 'Recommended' : 'Optional'}
              </span>
            </div>
            
            <p className="text-xs text-gray-600">
              {currentConfig.httpReferrers.description}
            </p>
            
            <div className="space-y-1">
              {currentConfig.httpReferrers.values.map((value, index) => (
                <div key={index} className="text-xs font-mono bg-gray-50 p-2 rounded">
                  {value}
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-xs">
              <span>Risk Level:</span>
              <span className={`px-2 py-1 rounded ${
                currentConfig.httpReferrers.risk === 'Low' ? 'bg-green-100 text-green-700' :
                currentConfig.httpReferrers.risk === 'Medium' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
                {currentConfig.httpReferrers.risk}
              </span>
            </div>
          </div>
        </div>

        {/* API Restrictions */}
        <div className="bg-white rounded-lg border shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <h3 className="font-semibold text-gray-800">API Restrictions</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Always Recommended</span>
            </div>
            
            <p className="text-xs text-gray-600">
              {currentConfig.apiRestrictions.description}
            </p>
            
            <div className="space-y-1">
              {currentConfig.apiRestrictions.values.map((value, index) => (
                <div key={index} className="text-xs font-mono bg-gray-50 p-2 rounded">
                  {value}
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-xs">
              <span>Risk Level:</span>
              <span className="px-2 py-1 rounded bg-green-100 text-green-700">
                Low
              </span>
            </div>
          </div>
        </div>

        {/* IP Restrictions */}
        <div className="bg-white rounded-lg border shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <h3 className="font-semibold text-gray-800">IP Restrictions</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Not Recommended</span>
            </div>
            
            <p className="text-xs text-gray-600">
              {currentConfig.ipRestrictions.description}
            </p>
            
            <div className="space-y-1">
              {currentConfig.ipRestrictions.values.map((value, index) => (
                <div key={index} className="text-xs font-mono bg-gray-50 p-2 rounded">
                  {value}
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-xs">
              <span>Risk Level:</span>
              <span className="px-2 py-1 rounded bg-green-100 text-green-700">
                Low
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <ExternalLink className="w-5 h-5" />
          How to Configure in Google Cloud Console
        </h3>
        
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Step 1: Access API Key</h4>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Go to <a href="https://console.cloud.google.com/" target="_blank" className="text-blue-600 underline">Google Cloud Console</a></li>
                <li>Navigate to "APIs & Services" → "Credentials"</li>
                <li>Click on your API key</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Step 2: Set Restrictions</h4>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Scroll to "Application restrictions"</li>
                <li>Choose "HTTP referrers (web sites)"</li>
                <li>Add your domain patterns</li>
              </ol>
            </div>
          </div>

          {/* Copy-paste examples */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-700">
                  {environment === 'development' ? 'Development' : 'Production'} HTTP Referrers
                </h4>
                <button
                  onClick={() => copyToClipboard(environment === 'development' ? developmentReferrers : productionReferrers)}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="bg-gray-50 p-3 rounded text-xs font-mono whitespace-pre-wrap border">
                {environment === 'development' ? developmentReferrers : productionReferrers}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Security Best Practices */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h3 className="font-semibold text-blue-800 mb-4">🔐 Security Best Practices</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="font-medium text-blue-700 mb-2">Do's</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>✅ Always restrict APIs to only what you need</li>
              <li>✅ Use HTTP referrers for web applications</li>
              <li>✅ Monitor usage regularly</li>
              <li>✅ Set up billing alerts</li>
              <li>✅ Rotate keys periodically</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-700 mb-2">Don'ts</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>❌ Don't use IP restrictions for web apps</li>
              <li>❌ Don't commit API keys to version control</li>
              <li>❌ Don't use the same key for dev and prod</li>
              <li>❌ Don't ignore usage alerts</li>
              <li>❌ Don't make keys publicly accessible</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Quick Start:</strong> {environment === 'development' 
            ? 'For development, you can start without HTTP referrer restrictions for easier testing.'
            : 'For production, always implement HTTP referrer restrictions before going live.'
          }
        </p>
        <a 
          href="http://localhost:3001/maps-test" 
          target="_blank"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          Test your current setup
        </a>
      </div>
    </div>
  );
};

export default APIKeySecurityGuide; 