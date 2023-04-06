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
              <a href="#" class="delete-btn" data-recipe-id="${recipe.id}">×</a>`;

              html += getDropdown(recipe);

              //${localStorage.getItem('temp') === "All Recipes" ? `<div class="dropdown-container addColl"></div><button class="addColl add-btn" data-recipe-id="${recipe.id}">Add</button>` : ''}



          html += `<div>
      <div>
    </li>`;
    return html;
  }

  function getDropdown(recipe) {
      let temp = localStorage.getItem('temp');
      if (temp == "All Recipes") {
        return `<div class="add-Col-Cont"><div class="dropdown-container addColl"></div><button class="addColl add-btn" data-recipe-id="${recipe.id}">Add</button><div>`;
      } else {
        return "";
      }
  }
  
  export default class collectionRecipeData {
    constructor(dataSource, listElement, key) {
      this.dataSource = dataSource;
      this.listElement = listElement;
      this.key = key;
    }
  
    async init() {
        localStorage.setItem("temp", this.key);

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

        // add dropdown options for each value in local storage
        if (this.key == "All Recipes") {
        const dropdownContainersNodeList = document.querySelectorAll('.dropdown-container');
        const dropdownContainers = Array.from(dropdownContainersNodeList);
        const valuesTitles = getLocalStorage('collectionTitles');

        // only show list if there are other collections
        if (valuesTitles.length > 1) {
          dropdownContainers.forEach((container) => {
          const options = valuesTitles.map((title) => {
            if (title == "All Recipes") {return};

            let titleValues = getLocalStorage(title);
            const recipeId = container.nextElementSibling.dataset.recipeId;
            if (titleValues && titleValues.includes(recipeId)) {
              return;
            } else {
              return `<option value="${title}">${title}</option>`;
            }
          }).join('');
          container.innerHTML = `<select>${options}</select>`;})}
          const dropdown = document.querySelector('.dropdown-container select');
          if (dropdown.options.length === 0) {
            document.querySelector('.add-Col-Cont').classList.add("hide");
          } 


  
        const deletebtnsNodeList = document.querySelectorAll(".delete-btn");
        const deletebtns = Array.from(deletebtnsNodeList);
        deletebtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            const recipeId = btn.dataset.recipeId;
            removeFromLocalStorage(this.key, recipeId);
            location.reload();
          });
        });
    }}
  
    renderCollectionRecipes(list) {
      renderListWithTemplate(listRecipeGenerator, this.listElement, list);

      const addbtnsNodeList = document.querySelectorAll(".add-btn");
      if (addbtnsNodeList) {
        const addbtns = Array.from(addbtnsNodeList);
        addbtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            const dropdownContainer = document.querySelector('.dropdown-container');
            const select = dropdownContainer.querySelector('select');
            const selectedValue = select.options[select.selectedIndex].value;

            const recipeId = btn.dataset.recipeId;
            setLocalStorage(selectedValue, recipeId);
            location.reload();
    });
  });
}
    }
  
  }