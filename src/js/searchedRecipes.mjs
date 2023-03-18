import { renderListWithTemplate } from "./utils.mjs";

function searchedRecipeGenerator(recipe) {
  return `<li>
        <div class="list-recipe-card">
        <a href="../views/recipeListing.html?recipeId=${recipe.id}">
        <img
          src="${recipe.image}"
          alt="Image of"/>
        <h2>${recipe.title}</h2>
        <a href="${recipe.sourceUrl}" target="_blank">Recipe</a>
        </a>
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
  }

  renderRecipes(list) {
    renderListWithTemplate(searchedRecipeGenerator, this.listElement, list);
  }
}
