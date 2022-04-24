import "inputmask";

// import "just-validate";
import "../../node_modules/just-validate/dist/js/just-validate.min.js";
import autoJeka from "./components/auto-Jeka";
import search from "./components/search";
import footerModal from "./components/footer-modal";

document.addEventListener('DOMContentLoaded', function() {
  autoJeka();
  search();
  footerModal();
});