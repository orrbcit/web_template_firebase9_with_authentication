/* ---------------------- MAIN PAGE LOGIC ----------------------- */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import $ from 'jquery';
import './styles/style.css';
import {
  onAuthReady,
  logoutUser
} from "./authentication.js"


if (location.pathname.endsWith('main.html')) {
  const $spinner = $("#loadingSpinner");
  const $content = $("#userContent");
  const $welcome = $("#welcomeMessage");

  onAuthReady((user) => {
    if (!user) {
      // Not logged in → go to login
      location.href = "index.html";
      return;
    }
    // Show greeting
    const name = user.displayName || user.email;
    $welcome.text(`Hello, ${name}!`);
    $spinner.addClass('d-none');
    $content.removeClass('d-none');
  });

  $("#logoutBtn").on("click", async () => {
    await logoutUser();
    location.href = "index.html";
  });
}