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
import { db } from './firebase';
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

// 5. Register User in Firebase
export async function registerUserInFirebase(userData: { name: string; email: string; role: 'admin' | 'manager' }) {
  try {
    const userDocRef = doc(db, 'users', userData.email.toLowerCase().trim());
    await setDoc(userDocRef, {
      name: userData.name,
      email: userData.email.toLowerCase().trim(),
      role: userData.role,
      createdAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error registering user in Firebase:', error);
    return false;
  }
}

// 6. Get User Record from Firebase
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
