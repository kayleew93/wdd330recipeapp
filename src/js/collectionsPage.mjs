import {
    setLocalStorage,
    alertMessage,
    getLocalStorage,
    removeFromLocalStorage,
    renderTemplate
  } from "./utils.mjs";
  import { renderListWithTemplate } from "./utils.mjs";
  
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
              <a href="#" class="delete-btn" data-recipe-id="${recipe.id}">×</a>
              ${JSON.parse(localStorage.getItem('temp'))[0] === "All Recipes" ? '<div class="dropdown-container addColl"></div><button class="addColl">Add</button>' : ''}
          <div>
      <div>
    </li>`;
    return html;
  }
  
  export default class collectionRecipeData {
    constructor(dataSource, listElement, key) {
      this.dataSource = dataSource;
      this.listElement = listElement;
      this.key = key;
    }
  
    async init() {
        setLocalStorage("temp", this.key);

        const collectionIds = getLocalStorage(this.key);

        let list = [];
        if (collectionIds === null) {
          this.listElement.innerHTML = `<div class="not-found"><h1>No recipes! Go find some fun food to make!</h1><a href="../../">Go back to home</a><div><img src="https://images.unsplash.com/photo-1555861496-0666c8981751?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"><div></div>`;
        } else {
          await Promise.all(
            collectionIds.map(async (id) => {
              const recipe = await this.dataSource.getRecipeById(id);
              list.push(recipe);
            })
          );}
        this.renderCollectionRecipes(list);
            localStorage.getItem("temp") === "All Recipes" ? console.log("yes") : console.log(JSON.parse(localStorage.getItem('temp'))[0]);
        // add dropdown options for each value in local storage
        if (this.key == "All Recipes") {
        const dropdownContainer = document.querySelector('.dropdown-container');
        const values = getLocalStorage('collectionTitles');
        // only show list if there are other collections
        if (values.length > 1) {
          const options = values.map((value) => {
            if (value == "All Recipes") {return};
            return `<option value="${value}">${value}</option>`;
          }).join('');
          dropdownContainer.innerHTML = `<select>${options}</select>`;}}
  
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
  
    renderCollectionRecipes(list) {
      renderListWithTemplate(listRecipeGenerator, this.listElement, list);
    }
  
  }