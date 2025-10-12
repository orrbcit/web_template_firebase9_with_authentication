import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import $ from 'jquery';

//--------------------------------------------------------------
// If you have custom global styles, import them as well:
//--------------------------------------------------------------
import '/src/styles/style.css';

//--------------------------------------------------------------
// Custom global JS code (shared with all pages)can go here.
//--------------------------------------------------------------

// This is an example function. Replace it with your own logic.
function sayHello() {
  // TODO: implement your logic here
}
document.addEventListener('DOMContentLoaded', sayHello);

//--------------------------------------------------------------
// Function: loadSkeleton()
// Load dynamically navbar and footer from external HTML text files
// into the div placeholders in each HTML page.
// This avoids duplicating the same navbar/footer code in every HTML file.
// Note: This requires jQuery to be imported.
//--------------------------------------------------------------
function loadSkeleton(){
    console.log($('#navbarPlaceholder').load('/text/nav.txt'));
    console.log($('#footerPlaceholder').load('/text/footer.txt'));
}
loadSkeleton();  //invoke the function
