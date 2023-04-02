import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";
import { addToCollection } from "./personalCollections.mjs";

function searchedRecipeGenerator(recipe) {
  let html = `<li>
        <div class="list-recipe-card">
        <a href="../views/recipeListing.html?recipeId=${recipe.id}">
        <img
          src="${recipe.image}"
          alt="Image of"/>
        <div>
          <h2>${recipe.title}</h2>
        <div>
        </a>
        <a href="#" class="save-btn`;

        let ids = getLocalStorage("collection");
        if (ids && ids.includes(recipe.id.toString())) {
          html += ` loved`;
        }
        html += `" data-recipe-id="${recipe.id}"><span>&#10084;</span></a></div>
        <div>
      </li>`
      return html;
}

export default class RecipeData {
  constructor(dataSource, listElement) {
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    // Get ingredients
    const ingredients = document.querySelector("#ingredients-input").value;

    // Get diets
    const dietCheckboxes = document.querySelectorAll('.diet input[type="checkbox"]');
    const selectedDiets = [];
    for (let i = 0; i < dietCheckboxes.length; i++) {
      if (dietCheckboxes[i].checked) {
        selectedDiets.push(dietCheckboxes[i].id);
      }
    }
    const dietsPipeSeparated = selectedDiets.join('|');

    let list = await this.dataSource.findRecipeByAdvancedFilter(ingredients, dietsPipeSeparated);

    (list[0]) ? this.renderRecipes(list) : this.listElement.innerHTML = `<div class="not-found"><h2>No recipes! Try again.</h2><img src="https://images.unsplash.com/photo-1508935620299-047e0e35fbe3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"><div>`;
 
    const svbtnsNodeList = document.querySelectorAll(".save-btn");
    const svbtns = Array.from(svbtnsNodeList);
    const self = this;
    svbtns.forEach(btn =>
      btn.addEventListener("click", function () {
        const recipeId = this.dataset.recipeId;
        addToCollection(recipeId);
        self.renderRecipes(list);
      })
    );
  }

  renderRecipes(list) {
    renderListWithTemplate(searchedRecipeGenerator, this.listElement, list, true);
  }
}
