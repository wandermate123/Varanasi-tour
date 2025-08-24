#!/usr/bin/env node

const fs = require('fs');
const https = require('https');

console.log('🔍 Google Maps API Diagnostic Tool');
console.log('=====================================\n');

// Check environment file
function checkEnvFile() {
  console.log('📁 Checking .env.local file...');
  
  if (!fs.existsSync('.env.local')) {
    console.log('❌ .env.local file not found');
    return null;
  }
  
  const envContent = fs.readFileSync('.env.local', 'utf8');
  console.log('📄 Raw file content:');
  console.log(envContent);
  console.log('📄 End of file content\n');
  
  // Try multiple regex patterns to find the API key
  const patterns = [
    /NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=(.+)/,
    /NEXT_PUBLIC_GOOGLE_MAPS_API_KEY\s*=\s*(.+)/,
    /NEXT_PUBLIC_GOOGLE_MAPS_API_KEY\s*=\s*"(.+)"/,
    /NEXT_PUBLIC_GOOGLE_MAPS_API_KEY\s*=\s*'(.+)'/
  ];
  
  let apiKey = null;
  for (const pattern of patterns) {
    const match = envContent.match(pattern);
    if (match) {
      apiKey = match[1].trim().replace(/['"]/g, '');
      break;
    }
  }
  
  if (!apiKey) {
    console.log('❌ NEXT_PUBLIC_GOOGLE_MAPS_API_KEY not found in .env.local');
    return null;
  }
  
  console.log('✅ API key found in .env.local');
  console.log(`   Key: ${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}`);
  console.log(`   Length: ${apiKey.length} characters`);
  
  // Validate format
  if (!apiKey.startsWith('AIzaSy')) {
    console.log('⚠️  Warning: API key should start with "AIzaSy"');
  } else {
    console.log('✅ API key format looks correct');
  }
  
  if (apiKey.length !== 39) {
    console.log(`⚠️  Warning: API key should be 39 characters (current: ${apiKey.length})`);
  } else {
    console.log('✅ API key length is correct');
  }
  
  return apiKey;
}

// Test API key with a simple request
function testApiKey(apiKey) {
  return new Promise((resolve) => {
    console.log('\n🌐 Testing API key with Google Maps API...');
    
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=New+York&key=${apiKey}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          
          if (res.statusCode === 200) {
            if (response.status === 'OK') {
              console.log('✅ API key is valid and working!');
              console.log(`   Response: Found ${response.results.length} results`);
              resolve(true);
            } else if (response.status === 'REQUEST_DENIED') {
              console.log('❌ API key denied by Google');
              console.log(`   Error: ${response.error_message || 'Unknown error'}`);
              if (response.error_message && response.error_message.includes('API key')) {
                console.log('   → Check if Geocoding API is enabled');
                console.log('   → Check API key restrictions');
              }
              resolve(false);
            } else {
              console.log(`⚠️  API key works but got status: ${response.status}`);
              resolve(true);
            }
          } else {
            console.log(`❌ HTTP Error: ${res.statusCode}`);
            console.log(`   Response: ${data.substring(0, 200)}...`);
            resolve(false);
          }
        } catch (error) {
          console.log('❌ Error parsing response:', error.message);
          console.log(`   Raw response: ${data.substring(0, 200)}...`);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log(`❌ Network error: ${err.message}`);
      resolve(false);
    });
  });
}

// Check Next.js pages
function checkPages() {
  console.log('\n📄 Checking test pages...');
  
  const testPagePath = 'src/app/maps-test/page.tsx';
  if (fs.existsSync(testPagePath)) {
    console.log('✅ Maps test page exists at /maps-test');
  } else {
    console.log('❌ Maps test page not found');
  }
  
  const securityPagePath = 'src/app/api-security/page.tsx';
  if (fs.existsSync(securityPagePath)) {
    console.log('✅ API security guide exists at /api-security');
  } else {
    console.log('❌ API security guide page not found');
  }
}

// Main function
async function main() {
  const apiKey = checkEnvFile();
  
  if (apiKey) {
    const isValid = await testApiKey(apiKey);
    
    if (isValid) {
      console.log('\n🎉 Google Maps setup looks good!');
      console.log('\n📋 Next Steps:');
      console.log('1. Start your dev server: npm run dev');
      console.log('2. Visit http://localhost:3000/maps-test to test the UI');
      console.log('3. Check browser console (F12) for any JavaScript errors');
    } else {
      console.log('\n🔧 API Key Issues Found:');
      console.log('1. Check Google Cloud Console: https://console.cloud.google.com/');
      console.log('2. Enable these APIs:');
      console.log('   - Maps JavaScript API');
      console.log('   - Places API');
      console.log('   - Geocoding API');
      console.log('3. Check API key restrictions');
      console.log('4. Ensure billing is enabled');
    }
  } else {
    console.log('\n📋 Setup Required:');
    console.log('1. Add your Google Maps API key to .env.local');
    console.log('2. Format: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here');
    console.log('3. Get API key from: https://console.cloud.google.com/');
  }
  
  checkPages();
  
  console.log('\n🔗 Useful Links:');
  console.log('- Google Cloud Console: https://console.cloud.google.com/');
  console.log('- Test Page: http://localhost:3000/maps-test');
  console.log('- Security Guide: http://localhost:3000/api-security');
}

main().catch(console.error); 