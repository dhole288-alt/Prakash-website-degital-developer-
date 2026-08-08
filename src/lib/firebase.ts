import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);

// Connectivity check test
export async function testFirebaseConnection() {
  try {
    await getDocFromServer(doc(db, '_connection_test', 'ping'));
    console.log('Firebase connection verified successfully.');
    return true;
  } catch (error) {
    console.warn('Firebase connection note:', error);
    return false;
  }
}

export default app;
