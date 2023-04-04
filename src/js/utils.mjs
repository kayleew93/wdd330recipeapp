// get data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function removeFromLocalStorage(key, data) {
  const collectionsList = (() => {
    const itemData = localStorage.getItem(key);
    return itemData === null ? [] : JSON.parse(itemData);
  })();

  // filter out the specific value from the array
  const updatedList = collectionsList.filter(e => e !== data);

  // save the updated list back to local storage
  localStorage.setItem(key, JSON.stringify(updatedList));
}

// save data to local storage
export function setLocalStorage(key, data) {

    // check if there is anything in local storage. If not,
    // create an empty array and add item. Otherwise, parse and add
    const collectionsList = (() => {
      const itemData = localStorage.getItem(key);
      return itemData === null ? []
      : JSON.parse(itemData);
    })();
  
    // check if recipeid already in list; otherwise add
    if (collectionsList.some(e => e === data)) {
      alertMessage("Already saved!");
      return;
    } else {
      collectionsList.push(data);
    }
  
  
    // save to local storage
      localStorage.setItem(key, JSON.stringify(collectionsList));
      alertMessage("Added to saved!");
  }


// function to take an optional object and a template and insert the objects as HTML into the DOM
export function renderTemplate(template, parentElement, data, callback, location = "afterbegin") {
  parentElement.insertAdjacentHTML(location, template);
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// load header and footer
export async function loadPartials() {
  const headTemplate = await loadTemplate("../partials/head.html");
  const headElement = document.querySelector("head");
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("footer");

  renderTemplate(headTemplate, headElement);
  renderTemplate(headerTemplate, headerElement);
  renderTemplate(footerTemplate, footerElement);
}

// takes a list of objects & template & inserts as HTML into DOM
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  clear = false,
  position = "afterbegin"
) {
  list = Object.values(list);
  const htmlStrings = list.map((item) => templateFn(item));
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const recipe = urlParams.get('recipeId');
  return recipe;
}

export function alertMessage(message, scroll = true, duration = 2000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p>`;

  const main = document.querySelector("main");
  main.prepend(alert);

  setTimeout(function () {
    main.removeChild(alert);
  }, duration);
}