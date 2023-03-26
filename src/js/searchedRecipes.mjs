import { renderListWithTemplate } from "./utils.mjs";
import { addToCollection } from "./personalCollections.mjs";

function searchedRecipeGenerator(recipe) {
  return `<li>
        <div class="list-recipe-card">
        <a href="../views/recipeListing.html?recipeId=${recipe.id}">
        <img
          src="${recipe.image}"
          alt="Image of"/>
        <div>
          <h2>${recipe.title}</h2>
        <div>
        </a>
        <a href="#" class="save-btn" data-recipe-id="${recipe.id}">&#10084;</a>
        <div>
      </li>`;
}

export default class RecipeData {
  constructor(dataSource, listElement) {
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const ingredients = document.querySelector("#ingredients-input").value;
    let list = await this.dataSource.findRecipeByIngredients(ingredients);
    this.renderRecipes(list);
 
    const svbtnsNodeList = document.querySelectorAll(".save-btn");
    const svbtns = Array.from(svbtnsNodeList);
    svbtns.forEach(btn => btn.addEventListener("click", function() {
       const recipeId = this.dataset.recipeId;
       addToCollection(recipeId);
    }));
 }

  renderRecipes(list) {
    renderListWithTemplate(searchedRecipeGenerator, this.listElement, list);
  }
}
