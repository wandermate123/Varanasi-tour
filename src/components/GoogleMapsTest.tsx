'use client';

import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { CheckCircle, XCircle, AlertCircle, MapPin } from 'lucide-react';

const GoogleMapsTest = () => {
  const [testResults, setTestResults] = useState({
    apiKeyExists: false,
    apiKeyFormat: false,
    mapsLoaded: false,
    error: null as string | null
  });

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Check API key on component mount
  React.useEffect(() => {
    const results = {
      apiKeyExists: !!apiKey,
      apiKeyFormat: apiKey ? apiKey.startsWith('AIzaSy') && apiKey.length === 39 : false,
      mapsLoaded: false,
      error: null as string | null
    };
    
    if (!apiKey) {
      results.error = 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is missing from environment variables';
    } else if (!results.apiKeyFormat) {
      results.error = 'API key format is incorrect. Should start with "AIzaSy" and be 39 characters long';
    }
    
    setTestResults(results);
  }, [apiKey]);

  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '8px'
  };

  const center = {
    lat: 25.3176,
    lng: 83.0107 // Varanasi coordinates
  };

  const onLoad = (map: google.maps.Map) => {
    console.log('✅ Google Maps loaded successfully!');
    setTestResults(prev => ({ ...prev, mapsLoaded: true, error: null }));
  };

  const onError = (error: Error) => {
    console.error('❌ Google Maps failed to load:', error);
    setTestResults(prev => ({ 
      ...prev, 
      mapsLoaded: false, 
      error: `Google Maps API Error: ${error.message}` 
    }));
  };

  const TestResult = ({ label, success, message }: { label: string; success: boolean; message?: string }) => (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
      {success ? (
        <CheckCircle className="w-5 h-5 text-green-500" />
      ) : (
        <XCircle className="w-5 h-5 text-red-500" />
      )}
      <div>
        <span className="font-medium text-gray-800">{label}</span>
        {message && <p className="text-sm text-gray-600 mt-1">{message}</p>}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-blue-500" />
          Google Maps API Test
        </h2>
        <p className="text-gray-600">
          This test will help diagnose Google Maps integration issues.
        </p>
      </div>

      {/* Test Results */}
      <div className="grid gap-4 mb-6">
        <TestResult 
          label="API Key Exists" 
          success={testResults.apiKeyExists}
          message={testResults.apiKeyExists ? "✓ Found in environment" : "✗ Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"}
        />
        
        <TestResult 
          label="API Key Format" 
          success={testResults.apiKeyFormat}
          message={testResults.apiKeyFormat ? "✓ Correct format" : "✗ Should start with 'AIzaSy' and be 39 characters"}
        />
        
        <TestResult 
          label="Google Maps Loaded" 
          success={testResults.mapsLoaded}
          message={testResults.mapsLoaded ? "✓ Maps API loaded successfully" : "⏳ Waiting for maps to load..."}
        />

        {testResults.error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-800">Error Details</h4>
              <p className="text-sm text-red-600 mt-1">{testResults.error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Current API Key (masked) */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Current Configuration</h3>
        <div className="font-mono text-sm">
          <span className="text-gray-600">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = </span>
          <span className="text-blue-600">
            {apiKey ? `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}` : 'Not set'}
          </span>
        </div>
        {apiKey && (
          <p className="text-xs text-gray-500 mt-1">
            Length: {apiKey.length} characters (should be 39)
          </p>
        )}
      </div>

      {/* Google Maps Component */}
      {apiKey && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Live Maps Test</h3>
          <div className="border rounded-lg overflow-hidden">
            <LoadScript
              googleMapsApiKey={apiKey}
              onLoad={() => console.log('LoadScript loaded')}
              onError={onError}
              loadingElement={
                <div className="h-[300px] bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading Google Maps...</p>
                  </div>
                </div>
              }
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
                onLoad={onLoad}
                options={{
                  zoomControl: true,
                  streetViewControl: true,
                  fullscreenControl: true
                }}
              >
                <Marker 
                  position={center} 
                  title="Varanasi - Test Location"
                />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      )}

      {/* Troubleshooting Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-3">🔧 Troubleshooting Steps</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-blue-700">
          <li>Ensure your API key is in <code className="bg-blue-100 px-1 rounded">.env.local</code> file</li>
          <li>Enable "Maps JavaScript API" in Google Cloud Console</li>
          <li>Enable "Places API" in Google Cloud Console</li>
          <li>Check API key restrictions (HTTP referrers, IP addresses)</li>
          <li>Verify billing is enabled in Google Cloud (required for Maps API)</li>
          <li>Restart your development server after adding the API key</li>
        </ol>
      </div>

      {/* Console Logs */}
      <div className="mt-4 text-xs text-gray-500">
        <p>Check browser console (F12) for additional error messages.</p>
      </div>
    </div>
  );
};

export default GoogleMapsTest; 