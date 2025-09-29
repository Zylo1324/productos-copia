// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// Tu configuración real de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD0W2CDEqs3mruge9oso5wlg6yinrGrU6M",
  authDomain: "registro-de-clientes-c2003.firebaseapp.com",
  projectId: "registro-de-clientes-c2003",
  storageBucket: "registro-de-clientes-c2003.firebasestorage.app",
  messagingSenderId: "844114742521",
  appId: "1:844114742521:web:6a9422e0f4964948236628",
  measurementId: "G-43RFDLVGF2"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Servicios que sí vas a usar en tu app
const auth = getAuth(app);
const db = getFirestore(app);

let persistenceEnabled = true;
let persistenceError = null;

const persistenceReady = enableIndexedDbPersistence(db).catch(error => {
  persistenceEnabled = false;
  persistenceError = error;
  if (error?.code === "failed-precondition") {
    console.info("Firestore persistence disabled: another tab already has persistence enabled.");
  } else if (error?.code === "unimplemented") {
    console.info("Firestore persistence disabled: the current browser doesn't support IndexedDB persistence.");
  } else {
    console.error("Unexpected error enabling Firestore persistence", error);
  }
  throw error;
});

// Exporta para usarlos en otros archivos
export { app, auth, db, persistenceReady, persistenceEnabled, persistenceError };
