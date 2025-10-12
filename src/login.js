import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import $ from 'jquery';
import './styles/style.css';
import {
    loginUser,
    signupUser,
    authErrorMessage,
    checkAuthState,
    logoutUser
} from './authentication.js';

// --- Login and/or Signup Page ---
// This page has logic for both login and signup form task flows.
// We show/hide the appropriate form when the user clicks
// the "Login" or "Signup" buttons.
// We also handle the form submissions here.
// Note: We use jQuery for simplicity.
// The code checks which page is loaded using window.location.pathname
// and attaches event listeners accordingly.
// -------------------------------------------------------------

/* ---------------------- LOGIN PAGE LOGIC ---------------------- */
if (location.pathname.endsWith('/') || location.pathname.endsWith('login.html')) {
    const $alert = $("#authAlert");
    const showError = (msg) => $alert.text(msg).removeClass('d-none');
    const hideError = () => $alert.addClass('d-none').empty();

    // Toggle to signup
    $("#toSignup").on("click", (e) => {
        e.preventDefault();
        hideError();

        $("#loginView").addClass("d-none").hide();        // hide login
        $("#signupView").removeClass("d-none").show();    // show signup
        $("#signupView").find("input:first").trigger("focus");
    });

    // Toggle to login
    $("#toLogin").on("click", (e) => {
        e.preventDefault();
        hideError();

        $("#signupView").addClass("d-none").hide();       // hide signup
        $("#loginView").removeClass("d-none").show();     // show login
        $("#loginView").find("input:first").trigger("focus");
    });



    // Handle login
    $("#loginForm").on("submit", async (e) => {
        e.preventDefault();
        hideError();
        const email = $("#loginEmail").val();
        const password = $("#loginPassword").val();
        try {
            await loginUser(email, password);
            location.href = "main.html";
        } catch (err) {
            showError(authErrorMessage(err));
            console.error(err);
        }
    });

    // Handle signup
    $("#signupForm").on("submit", async (e) => {
        e.preventDefault();
        hideError();
        const name = $("#signupName").val();
        const email = $("#signupEmail").val();
        const password = $("#signupPassword").val();
        try {
            await signupUser(name, email, password);
            location.href = "main.html";
        } catch (err) {
            showError(authErrorMessage(err));
            console.error(err);
        }
    });
}