export const validateGoogleMapsApiKey = (apiKey: string | undefined): { isValid: boolean; error?: string } => {
  if (!apiKey) {
    return {
      isValid: false,
      error: 'Google Maps API key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file.'
    };
  }

  if (!apiKey.startsWith('AIzaSy')) {
    return {
      isValid: false,
      error: 'Google Maps API key format is incorrect. It should start with "AIzaSy".'
    };
  }

  if (apiKey.length !== 39) {
    return {
      isValid: false,
      error: `Google Maps API key should be 39 characters long. Current length: ${apiKey.length}`
    };
  }

  return { isValid: true };
};

export const getGoogleMapsSetupInstructions = () => {
  return {
    title: "Google Maps API Setup",
    steps: [
      {
        step: 1,
        title: "Create Google Cloud Project",
        description: "Go to Google Cloud Console and create a new project or select an existing one.",
        link: "https://console.cloud.google.com/"
      },
      {
        step: 2,
        title: "Enable Required APIs",
        description: "Enable Maps JavaScript API, Places API, and Geocoding API in the Google Cloud Console.",
        apis: ["Maps JavaScript API", "Places API", "Geocoding API"]
      },
      {
        step: 3,
        title: "Create API Key",
        description: "Go to Credentials → Create Credentials → API Key. Copy the generated key.",
        note: "The key should start with 'AIzaSy' and be 39 characters long."
      },
      {
        step: 4,
        title: "Set Restrictions (Optional but Recommended)",
        description: "Add HTTP referrer restrictions for security.",
        example: "localhost:3000, yourdomain.com"
      },
      {
        step: 5,
        title: "Enable Billing",
        description: "Google Maps requires billing to be enabled, even for the free tier.",
        note: "You get $200 free credit monthly for Maps usage."
      },
      {
        step: 6,
        title: "Add to Environment",
        description: "Add the API key to your .env.local file:",
        code: "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here"
      },
      {
        step: 7,
        title: "Restart Development Server",
        description: "Restart your development server to load the new environment variable.",
        command: "npm run dev"
      }
    ]
  };
};

export const checkEnvironmentSetup = () => {
  const config = {
    googleMaps: {
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      isValid: false,
      error: null as string | null
    },
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      isValid: !!process.env.OPENAI_API_KEY,
      error: null as string | null
    },
    weather: {
      apiKey: process.env.OPENWEATHER_API_KEY,
      isValid: !!process.env.OPENWEATHER_API_KEY,
      error: null as string | null
    }
  };

  // Validate Google Maps API key
  const googleMapsValidation = validateGoogleMapsApiKey(config.googleMaps.apiKey);
  config.googleMaps.isValid = googleMapsValidation.isValid;
  config.googleMaps.error = googleMapsValidation.error || null;

  // Check OpenAI API key format
  if (config.openai.apiKey && !config.openai.apiKey.startsWith('sk-')) {
    config.openai.isValid = false;
    config.openai.error = 'OpenAI API key should start with "sk-"';
  }

  return config;
}; 