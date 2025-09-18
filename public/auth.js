
import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "/";
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    });
  }

  const guestBtn = document.getElementById("guest-btn");
  if (guestBtn) {
    guestBtn.addEventListener("click", () => {
      window.location.href = "/";
    });
  }
});
