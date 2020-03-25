const shortenInput = document.getElementById("shorten-input"),
  shortenForm = document.getElementById("shorten-form"),
  shortenErrorMessage = document.getElementById("shorten-error-message");

const shortLinks = document.getElementById("short-container");

const navBurger = document.getElementById("nav-burger"),
  navModal = document.getElementById("nav-modal");

// Event Listeners
shortenForm.addEventListener("submit", e => {
  e.preventDefault();

  if (!shortenInput.value) {
    shortenInput.classList.add("error");
    shortenErrorMessage.style.opacity = 1;
  }
});

// show mobal nav when burger is clicked
navBurger.addEventListener("click", () => {
  navModal.classList.add('show');

});

window.addEventListener('click', (e) => {
  if(e.target.classList.contains('nav-modal')) {
    navModal.classList.remove('show');
  }
} )

// On Reload - scroll to top of page
window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};
