// const admin = require('firebase-admin');
// const serviceAccount = require('../keys/serviceAccountKey.json'); // Update this path

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: 'gs://buildwell-83f63.appspot.com'
// });

// const bucket = admin.storage().bucket();

// module.exports = bucket;



//-----------------------------------

// import admin from 'firebase-admin';
// import serviceAccount from '../keys/serviceAccountKey.json'; // Update this path

// // Initialize Firebase Admin with service account credentials
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: 'gs://buildwell-83f63.appspot.com' // Replace with your actual storage bucket name
// });

// // Get a reference to the default Firebase Storage bucket
// const bucket = admin.storage().bucket();

// // Export the bucket instance for use in other modules
// export default bucket;



//-----------------------------------



import admin from 'firebase-admin';

import { config } from 'dotenv';

config();
// import { readFileSync } from 'fs';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// // Resolve the path to serviceAccountKey.json
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const serviceAccountPath = join(__dirname, '../keys/serviceAccountKey.json'); // Update path as necessary

// // Read the service account key file
// const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
};

// console.log(serviceAccount)

// Initialize Firebase Admin with service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://buildwell-83f63.appspot.com' // Replace with your actual storage bucket name
});

// Get a reference to the default Firebase Storage bucket
const bucket = admin.storage().bucket();

// Export the bucket instance for use in other modules
export default bucket;
