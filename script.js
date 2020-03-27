const shortenInput = document.getElementById("shorten-input"),
  shortenForm = document.getElementById("shorten-form"),
  shortenErrorMessage = document.getElementById("shorten-error-message");

const short = document.getElementById("short");


const shortDeleteBtn = document.getElementById("short-delete");

const navBurger = document.getElementById("nav-burger"),
  navModal = document.getElementById("nav-modal");

let links = [];

// Get Shorter URL from API
async function createShorterURL(urlInput) {
  const res = await fetch("https://rel.ink/api/links/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url: urlInput })
  });
  const data = await res.json();

  const { hashid, url, created_at } = data;

  links.push({
    url,
    hashid,
    created_at
  });

  // Save links Array to localStorage
  localStorage.setItem("links", JSON.stringify(links));

  short.innerHTML = ``;
  addLinksToDOM();
}

// Delete clicked link from Arr, localStorage and DOM
short.addEventListener('click', (e) => {
  if(e.target.tagName === "I") {
    // Get hashid we wants to delete
    let hash = e.target.dataset.hash;
    // Filter hashid from Links Array and delete it
    links = links.filter(link => link.hashid !== hash)
    
    // Save new Links to localStorage 
    localStorage.setItem("links", JSON.stringify(links));
    // Reload DOM with new Array
    addLinksToDOM()
  }
});

// Add links to Dom
function addLinksToDOM() {
  short.innerHTML = ``;
  if (links) {
    links.forEach(link => {
      const shortLink = document.createElement("div");
      shortLink.classList.add("short-container");
      shortLink.innerHTML = `
      <div class="short" data-hash="${link.hashid}">
        <div class="short-delete"">
        <i class="fas fa-minus" data-hash="${link.hashid}"></i>
        </div>

        <p class="short-url">
          ${link.url}
        </p>

        <a target="_blank" href="https://rel.ink/${link.hashid}" class="short-new-url">https://rel.ink/${link.hashid}</a>

        <button class="btn btn-square btn-cyan btn-small">Copy</button>

      </div>
      `;
      short.appendChild(shortLink);
    });
  }
}

// MODAL
// show mobal nav when burger is clicked
navBurger.addEventListener("click", () => {
  navModal.classList.add("show");
});

// Close modal on click outside box
window.addEventListener("click", e => {
  if (e.target.classList.contains("nav-modal")) {
    navModal.classList.remove("show");
  }
});

// On Load - get LocalStorage Links array
function getLinksFromStorage() {


  const l = JSON.parse(localStorage.getItem("links"));
  if(l === null) {
   links = []
  } else {

    links = l;
    addLinksToDOM();
  }
}

getLinksFromStorage();

// Before Reload - scroll to top of page
window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};

// Event Listeners
shortenForm.addEventListener("submit", e => {
  e.preventDefault();

  if (!shortenInput.value) {
    shortenInput.classList.add("error");
    shortenErrorMessage.style.opacity = 1;
    console.log("kek");
  } else {
    shortenInput.classList.remove("error");
    shortenErrorMessage.style.opacity = 0;
    createShorterURL(shortenInput.value);
    shortenInput.value = "";
  }
});
