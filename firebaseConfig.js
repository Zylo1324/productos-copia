import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD0W2CDEqs3mruge9oso5wlg6yinrGrU6M",
  authDomain: "registro-de-clientes-c2003.firebaseapp.com",
  projectId: "registro-de-clientes-c2003",
  storageBucket: "registro-de-clientes-c2003.appspot.com",
  messagingSenderId: "844114742521",
  appId: "1:844114742521:web:6a9422e0f4964948236628",
  measurementId: "G-43RFDLVGF2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
export default app;
