// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Importa Firestore

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAQpXIJ7nCBdne8p1agn_cTZS6YfygD-2E",
  authDomain: "yaoficios.firebaseapp.com",
  projectId: "yaoficios",
  storageBucket: "yaoficios.appspot.com",
  messagingSenderId: "1021721998269",
  appId: "1:1021721998269:web:754a103872d33efd3bd8d4",
  measurementId: "G-YXVENXG9M9",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app); // Aquí se inicializa Firestore

// Inicializa Analytics
const analytics = getAnalytics(app);

// Exporta db para usarlo en otros componentes
export { db };
