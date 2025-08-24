import * as admin from 'firebase-admin';

// Check if Firebase admin is properly configured
const requiredAdminVars = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY'
];

const missingAdminVars = requiredAdminVars.filter(
  (envVar) => !process.env[envVar]
);

if (missingAdminVars.length > 0) {
  console.warn('Missing required Firebase Admin environment variables:', missingAdminVars);
  console.warn('Firebase Admin functionality will not work without proper configuration.');
}

let auth: admin.auth.Auth | null = null;
let db: admin.firestore.Firestore | null = null;
let storage: admin.storage.Storage | null = null;

if (!admin.apps.length && missingAdminVars.length === 0) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
    
    auth = admin.auth();
    db = admin.firestore();
    storage = admin.storage();
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
    // Services remain null when initialization fails
  }
} else if (admin.apps.length > 0) {
  // Use existing app
  auth = admin.auth();
  db = admin.firestore();
  storage = admin.storage();
}
// Services remain null when not configured

export { auth, db, storage }; 