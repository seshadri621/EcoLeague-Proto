document.addEventListener("DOMContentLoaded", () => {
  const supabaseUrl = "https://dummy.supabase.co"; // Replace with your VITE_SUPABASE_URL from .env
  const supabaseKey =
    "dummykey.updateyourkkey.here"; // Replace with your VITE_SUPABASE_ANON_KEY from .env

  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "Supabase URL and Key are not set. Please update them in public/auth.js."
    );
    return;
  }

  const { createClient } = supabase;
  const _supabase = createClient(supabaseUrl, supabaseKey);

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const { data, error } = await _supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(`Error: ${error.message}`);
      } else {
        // On successful login, redirect to the main app
        window.location.href = "/";
      }
    });
  }

  const guestBtn = document.getElementById("guest-btn");
  if (guestBtn) {
    guestBtn.addEventListener("click", () => {
      // Redirect to the main app for guest access
      window.location.href = "/";
    });
  }
});