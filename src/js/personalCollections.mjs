import {
  setLocalStorage,
  alertMessage,
  getLocalStorage,
  removeFromLocalStorage,
} from "./utils.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export function addToCollection(recipeid) {
  setLocalStorage("All Recipes", recipeid);
}

function listRecipeGenerator(recipe) {
  let html = `<li>
    <div class="horizontal-recipe-card">
        <img
        src="${recipe.image}"
        alt="Image of"/>
        <div>
        <h2>${recipe.title}</h2>
            <p>${recipe.summary}</p>
            <br><br>
            <a class="button" href="../views/recipeListing.html?recipeId=${recipe.id}">View Recipe</a>
            <a href="#" class="delete-btn" data-recipe-id="${recipe.id}">Remove</a>
        <div>
    <div>
  </li>`;
  return html;
}

function collectionListGenerator(collectionTitle) {
  return `<a>${collectionTitle}</a>`
}

export default class personalRecipeData {
  constructor(dataSource, listElement, key) {
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.key = key;
    this.collectionsKey = "collectionTitles";
    this.collectionsElement = document.getElementById("collections-titles");
  }
  async init() {
    let collectionsIds = getLocalStorage(this.key);
    let list = [];
    if (collectionsIds === null) {
      this.listElement.innerHTML = `<div class="not-found"><h1>No recipes! Go find some fun food to make!</h1><a href="../../">Go back to home</a><div><img src="https://images.unsplash.com/photo-1555861496-0666c8981751?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"><div></div>`;
    } else {
      await Promise.all(
        collectionsIds.map(async (id) => {
          const recipe = await this.dataSource.getRecipeById(id);
          list.push(recipe);
        })
      );

      this.renderCollectionRecipes(list);

      const deletebtnsNodeList = document.querySelectorAll(".delete-btn");
      const deletebtns = Array.from(deletebtnsNodeList);
      deletebtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const recipeId = btn.dataset.recipeId;
          removeFromLocalStorage(this.key, recipeId);
          location.reload();
        });
      });
    }

    const addToCollectionTitle = document.getElementById("add-collection-name");
      addToCollectionTitle.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          setLocalStorage(this.collectionsKey, addToCollectionTitle.value);

          const collections = getLocalStorage(this.collectionsKey);
          this.renderCollectionsList(collections);
  }
});
  }

  renderCollectionRecipes(list) {
    renderListWithTemplate(listRecipeGenerator, this.listElement, list);
  }

  renderCollectionsList(collections) {
    renderListWithTemplate(collectionListGenerator, this.collectionsElement, collections);
}
}
