import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Check if all required Firebase config values are present
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
];

const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !process.env[envVar]
);

if (missingEnvVars.length > 0) {
  console.warn('Missing required Firebase environment variables:', missingEnvVars);
  console.warn('Firebase client functionality will not work without proper configuration.');
}

// Mock implementations for testing or when Firebase is not configured
const createMockServices = () => {
  return {
    mockApp: {
      name: '[DEFAULT]',
      options: {}
    },
    mockAuth: {
      currentUser: null,
      onAuthStateChanged: () => {},
      signOut: async () => {}
    },
    mockDb: {
      collection: () => ({
        doc: () => ({
          get: async () => ({
            exists: false,
            data: () => null
          }),
          set: async () => {},
          update: async () => {}
        })
      })
    },
    mockStorage: {
      ref: () => ({
        put: async () => {},
        getDownloadURL: async () => ''
      })
    }
  };
};

// Initialize Firebase only if all required variables are present
let firebaseApp: any;
let auth: Auth | any;
let db: Firestore | any;
let storage: FirebaseStorage | any;

if (missingEnvVars.length === 0) {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };

  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApp();
  }

  // Initialize Firebase services
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
  storage = getStorage(firebaseApp);
} else {
  // Create mock services when Firebase is not configured
  const mockServices = createMockServices();
  firebaseApp = mockServices.mockApp;
  auth = mockServices.mockAuth;
  db = mockServices.mockDb;
  storage = mockServices.mockStorage;
}

// Export services
export const app = firebaseApp;
export { auth, db, storage }; 