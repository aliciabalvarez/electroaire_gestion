// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyClfgU28bMLDQqKfkksRK3rfH7EvsWLq4g',
	authDomain: 'fir-testtrazos.firebaseapp.com',
	projectId: 'fir-testtrazos',
	storageBucket: 'fir-testtrazos.appspot.com',
	messagingSenderId: '1073813140579',
	appId: '1:1073813140579:web:9ab288e559865a80297456'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Firestore module
const db = getFirestore(app);
export const blogCollectionReference = collection(db, 'pruebaBlog');
export const clientesCollectionReference = collection(db, 'clientes');
export const ProveedoresCollectionReference = collection(db, 'proveedores');

export { db };
//storage module
export const storage = getStorage(app);

//authentication module
export const auth = getAuth(app);
