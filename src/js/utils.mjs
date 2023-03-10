// get data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// function to take an optional object and a template and insert the objects as HTML into the DOM
export function renderTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  //if there is a callback...call it and pass data
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
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
