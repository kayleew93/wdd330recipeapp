import {
  setLocalStorage,
  alertMessage,
  getLocalStorage,
  removeFromLocalStorage,
  renderTemplate
} from "./utils.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export function addToCollection(recipeid) {
  setLocalStorage("All Recipes", recipeid);
}

function titleCardGenerator(title) {
  let html = `<div class="collection-card">
    <a href="../views/collectionsPage.html?collectionTitle=${title}">${title}</a>`;
    
    (title != "All Recipes") ? html += `<a href="#" class="delete-btn" data-title="${title}">×</a>` : "";

  html += `</div>`;
  return html;
}

export default class personalRecipeData {
  constructor(dataSource, listElement, key) {
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.key = key;
    this.collectionsKey = "collectionTitles";
    this.collectionsElement = document.querySelector(".collections-titles");
  }

  async init() {
    if(!getLocalStorage(this.collectionsKey)) {
      setLocalStorage(this.collectionsKey, this.key);}

      const collections = getLocalStorage(this.collectionsKey);
      this.renderCollectionsList(collections);

      const deletebtnsNodeList = document.querySelectorAll(".delete-btn");
      const deletebtns = Array.from(deletebtnsNodeList);
      deletebtns.forEach((btn) => {
        btn.addEventListener("click", async () => {

          let answer = await customConfirm();
          if (answer) {
            const title = btn.dataset.title;
            removeFromLocalStorage(this.collectionsKey, title);
            localStorage.removeItem(title);
            location.reload();
          }
        });
      });
    
    const addToCollectionTitle = document.getElementById("add-collection-name");
      addToCollectionTitle.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          setLocalStorage(this.collectionsKey, addToCollectionTitle.value);
          const collections = getLocalStorage(this.collectionsKey);
          this.renderCollectionsList(collections, true);
          location.reload();
  }
});
  }

  renderCollectionsList(list, clear = false) {
    renderListWithTemplate(titleCardGenerator, this.listElement, list, clear);
  }

}

function customConfirm() {
  return new Promise((resolve) => {
  var dialog = document.getElementById("custom-confirm");
  dialog.style.display = "block";

  var confirmYes = document.getElementById("confirm-yes");
  confirmYes.addEventListener("click", function() {
    dialog.style.display = "none";
    resolve(true);
  });

  var confirmNo = document.getElementById("confirm-no");
  confirmNo.addEventListener("click", function() {
    dialog.style.display = "none";
    resolve(false);
  });})
}