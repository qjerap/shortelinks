const shortenInput = document.getElementById("shorten-input"),
  shortenForm = document.getElementById("shorten-form"),
  shortenErrorMessage = document.getElementById("shorten-error-message");

// Event Listeners
shortenForm.addEventListener("submit", e => {
  e.preventDefault();

  
  if(!shortenInput.value) {
    shortenInput.classList.add("error");
    shortenErrorMessage.style.opacity = 1
}



});





// On Reload - scroll to top of page
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }