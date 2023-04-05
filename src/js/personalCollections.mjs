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
        btn.addEventListener("click", () => {
          if (confirm("Do you want to delete this collection and all associated recipes? NOTE: This action cannot be undone.")) {
          const title = btn.dataset.title;
          removeFromLocalStorage(this.collectionsKey, title);
          localStorage.removeItem(title);
          location.reload();}
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
  /*
  async renderCollectionsList(collections) {
    for (const title of collections) {
      this.renderCollectionTitle(title);
      let collectionsIds = getLocalStorage(title);
      let list = [];
      if (collectionsIds === null) {
        this.listElement.innerHTML = `<div class="not-found"><h1>No recipes! Go find some fun food to make!</h1><a href="../../">Go back to home</a><div><img src="https://images.unsplash.com/photo-1555861496-0666c8981751?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"><div></div>`;
      } else {
        await Promise.all(
          collectionsIds.map(async (id) => {
            const recipe = await this.dataSource.getRecipeById(id);
            list.push(recipe);
            console.log("list", list);
            this.renderCollectionRecipes(list);
          })
        );
        
      }
    }
  }
}*/


// let collectionsIds = getLocalStorage(this.key);
    // let list = [];
    // if (collectionsIds === null) {
    //   this.listElement.innerHTML = `<div class="not-found"><h1>No recipes! Go find some fun food to make!</h1><a href="../../">Go back to home</a><div><img src="https://images.unsplash.com/photo-1555861496-0666c8981751?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"><div></div>`;
    // } else {
    //   await Promise.all(
    //     collectionsIds.map(async (id) => {
    //       const recipe = await this.dataSource.getRecipeById(id);
    //       list.push(recipe);
    //     })
    //   );