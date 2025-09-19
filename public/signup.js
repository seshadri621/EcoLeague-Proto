
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        window.location.href = "/mission-control-dashboard";
      } catch (error) { 
        alert(`Error: ${error.message}`);
      }
    });
  }
});
