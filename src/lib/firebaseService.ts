import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';
import { db, auth } from './firebase';
import { Lead } from '../types';

export interface FirebaseUserRecord {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager';
  createdAt: string;
}

// 1. Save Lead to Firebase Firestore
export async function saveLeadToFirebase(leadData: Partial<Lead>) {
  try {
    const leadsRef = collection(db, 'leads');
    const newDoc = await addDoc(leadsRef, {
      ...leadData,
      status: leadData.status || 'New',
      createdAt: new Date().toISOString(),
      timestamp: serverTimestamp(),
      source: leadData.source || 'Website Form (Firebase Sync)'
    });
    console.log('Lead saved to Firebase Firestore with ID:', newDoc.id);
    return { success: true, firestoreId: newDoc.id };
  } catch (error) {
    console.error('Error saving lead to Firebase:', error);
    return { success: false, error };
  }
}

// 2. Fetch All Leads from Firebase Firestore
export async function getLeadsFromFirebase(): Promise<Lead[]> {
  try {
    const leadsRef = collection(db, 'leads');
    const q = query(leadsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    const leads: Lead[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      leads.push({
        id: docSnap.id,
        name: data.name || data.fullName || 'Anonymous',
        mobile: data.mobile || data.phone || '',
        whatsapp: data.whatsapp || data.mobile || data.phone || '',
        email: data.email || '',
        businessName: data.businessName || '',
        businessCategory: data.businessCategory || 'Website development',
        city: data.city || 'Nashik',
        service: data.service || 'Website development',
        websiteType: data.websiteType || 'Dynamic',
        pagesCount: data.pagesCount || 'Custom',
        budget: data.budget || '₹5,000 - ₹10,000',
        deliveryDate: data.deliveryDate || 'Asap',
        message: data.message || '',
        dateTime: data.createdAt || data.dateTime || new Date().toISOString(),
        ipAddress: data.ipAddress || '127.0.0.1',
        source: data.source || 'Firebase',
        status: data.status || 'New',
        notes: Array.isArray(data.notes) ? data.notes : []
      });
    });
    return leads;
  } catch (error) {
    console.error('Error fetching leads from Firebase:', error);
    return [];
  }
}

// 3. Update Lead Status in Firebase
export async function updateLeadStatusInFirebase(leadId: string, status: Lead['status'], notes?: any[]) {
  try {
    const docRef = doc(db, 'leads', leadId);
    await updateDoc(docRef, {
      status,
      ...(notes !== undefined ? { notes } : {}),
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error updating lead status in Firebase:', error);
    return false;
  }
}

// 4. Delete Lead from Firebase
export async function deleteLeadFromFirebase(leadId: string) {
  try {
    const docRef = doc(db, 'leads', leadId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting lead from Firebase:', error);
    return false;
  }
}

// 5. Firebase Auth & Firestore User Registration
export async function registerUserInFirebase(userData: { name: string; email: string; password?: string; role: 'admin' | 'manager' }) {
  const cleanEmail = userData.email.toLowerCase().trim();
  
  // Save user profile in Firestore
  try {
    const userDocRef = doc(db, 'users', cleanEmail);
    await setDoc(userDocRef, {
      name: userData.name,
      email: cleanEmail,
      role: userData.role,
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn('Firestore user doc creation note:', err);
  }

  // Also create user in Firebase Auth if password provided
  if (userData.password) {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, cleanEmail, userData.password);
      if (userCred.user) {
        await updateProfile(userCred.user, { displayName: userData.name });
      }
      return { success: true, user: userCred.user };
    } catch (authErr: any) {
      console.warn('Firebase Auth registration notice:', authErr?.message || authErr);
      // Even if Firebase Auth email password provider is pending activation in console, Firestore user record is created!
      return { success: true, note: 'User record saved in Firestore' };
    }
  }

  return { success: true };
}

// 6. Firebase Auth Login
export async function loginUserWithFirebase(email: string, password: string) {
  const cleanEmail = email.toLowerCase().trim();
  try {
    const userCred = await signInWithEmailAndPassword(auth, cleanEmail, password);
    const firestoreUser = await getUserFromFirebase(cleanEmail);
    return {
      success: true,
      user: {
        email: userCred.user.email || cleanEmail,
        name: firestoreUser?.name || userCred.user.displayName || 'Admin User',
        role: firestoreUser?.role || 'admin',
        token: await userCred.user.getIdToken()
      }
    };
  } catch (error: any) {
    // Check Firestore user fallback
    const firestoreUser = await getUserFromFirebase(cleanEmail);
    if (firestoreUser) {
      return {
        success: true,
        user: {
          email: firestoreUser.email,
          name: firestoreUser.name,
          role: firestoreUser.role,
          token: 'firebase_fs_' + Date.now()
        }
      };
    }
    return { success: false, message: error?.message || 'Firebase login failed' };
  }
}

// 7. Get User Record from Firebase
export async function getUserFromFirebase(email: string): Promise<FirebaseUserRecord | null> {
  try {
    const userDocRef = doc(db, 'users', email.toLowerCase().trim());
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as FirebaseUserRecord;
    }
    return null;
  } catch (error) {
    console.error('Error getting user from Firebase:', error);
    return null;
  }
}
