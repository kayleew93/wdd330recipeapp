import { renderListWithTemplate } from "./utils.mjs";

function singleRecipeGenerator(recipe) {
  return `<li>
        <img
          src="${recipe.image}"
          alt="Image of"/>
        <h2>${recipe.title}</h2>
        <a href="${recipe.sourceUrl}">Recipe</a>
        <button class="save-btn">Save</button>
      </li>`;
}

export default class RecipeData {
  constructor(dataSource, listElement, recipeId) {
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.recipeId = recipeId;
  }
  async init() {
    this.recipe = await this.dataSource.getRecipeById(this.recipeId);
    this.renderRecipeDetails(this.listElement);
  }

  renderRecipeDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      'afterbegin',
      singleRecipeGenerator(this.recipe)
    );
  }

  renderRecipe() {
    renderListWithTemplate(singleRecipeGenerator, this.listElement, this.recipe);
  }
}
