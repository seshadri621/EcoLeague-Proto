import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSESBecXaN_VW9bFG3OxdyBF6CRyoVriM",
  authDomain: "ecoleague-1d3be.firebaseapp.com",
  projectId: "ecoleague-1d3be",
  storageBucket: "ecoleague-1d3be.firebasestorage.app",
  messagingSenderId: "500835895309",
  appId: "1:500835895309:web:7da5e62c17befa0e3e6d44"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);