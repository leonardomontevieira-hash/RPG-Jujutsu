import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDOpuEwFtqslPk5MeDdTDZn_Dxquj7tD8E",
  authDomain: "gen-lang-client-0882706943.firebaseapp.com",
  projectId: "gen-lang-client-0882706943",
  storageBucket: "gen-lang-client-0882706943.firebasestorage.app",
  messagingSenderId: "520012569176",
  appId: "1:520012569176:web:3b4ea1e72e1c4da9e3882d"
};

const app = initializeApp(firebaseConfig);
// Using custom firestore database id if specified, else default
const db = getFirestore(app, "ai-studio-catlogodomundofi-4ffbd2c5-88b8-4de0-9eb1-40c8a9858544");

export { db };
