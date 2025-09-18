
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSESBecXaN_VW9bFG3OxdyBF6CRyoVriM",
  authDomain: "ecoleague-1d3be.firebaseapp.com",
  projectId: "ecoleague-1d3be",
  storageBucket: "ecoleague-1d3be.firebasestorage.app",
  messagingSenderId: "500835895309",
  appId: "1:500835895309:web:7da5e62c17befa0e3e6d44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
