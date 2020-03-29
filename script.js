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
  // Check if data is valid

  if (data.hashid) {
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
  } else {
    // Show a error message "please enter a valid URL"

    shortenInput.classList.add("error");
    shortenErrorMessage.style.opacity = 1;
    shortenErrorMessage.innerHTML = `
      <small>Please add valid URL</small>
      `;

    // shortenInput.classList.remove("error");
    // shortenErrorMessage.style.opacity = 0;
    // createShorterURL(shortenInput.value);
    // shortenInput.value = "";
  }
}

// Copy shorted URL on button click XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
short.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    let copyText = e.target.previousElementSibling;
    // copyText.focus();
    copyText.select();
    document.execCommand("copy");
    shortenInput.select();

    let btn = e.target;
    btn.innerHTML = `copied!`;
    btn.style.fontWeight = "bold";

    setTimeout(() => {
      btn.innerText = `copy`;
      btn.style.fontWeight = "normal";
    }, 1000);
  }
});

// Delete clicked link from Arr, localStorage and DOM
short.addEventListener("click", e => {
  if (e.target.tagName === "I") {
    // Get hashid we wants to delete
    let hash = e.target.dataset.hash;
    // Filter hashid from Links Array and delete it
    links = links.filter(link => link.hashid !== hash);

    // Save new Links to localStorage
    localStorage.setItem("links", JSON.stringify(links));
    // Reload DOM with new Array
    addLinksToDOM();
  }
});

// Delete all links
function deleteAllLinks() {
  links = [];
  localStorage.setItem("links", JSON.stringify(links));

  addLinksToDOM();
}

// Add links to Dom
function addLinksToDOM() {
  short.innerHTML = ``;
  if (links.length > 0) {
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


        <textarea
        rows="1"
        readonly
        wrap="off" 
        class="short-new-url">https://rel.ink/${link.hashid}</textarea>
        <button 
        id="copied"
        class="copied btn btn-square btn-cyan btn-small" 
        onclick="copied" 
        >Copy</button>

      </div>
      `;
      short.appendChild(shortLink);
    });
    const deleteAll = document.createElement("div");
    deleteAll.innerHTML = `
      <button class="btn btn-square container btn-danger" onclick="deleteAllLinks()">delete all shortened URL</button>
    `;
    short.appendChild(deleteAll);
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
  if (l === null) {
    links = [];
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
    shortenErrorMessage.innerHTML = `
    <small>Please type an URL...</small>
    `;
    shortenInput.classList.add("error");
    shortenErrorMessage.style.opacity = 1;
  } else {
    shortenInput.classList.remove("error");
    shortenErrorMessage.style.opacity = 0;
    createShorterURL(shortenInput.value);
    shortenInput.value = "";
  }
});
