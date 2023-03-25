import { renderListWithTemplate } from "./utils.mjs";

function randomRecipeGenerator(recipe) {
  return `<li>
        <div class="recipe-card">
        <a href="../views/recipeListing.html?recipeId=${recipe.id}">
        <img
          src="${recipe.image}"
          alt="Image of"/>
        <h2>${recipe.title}</h2>
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
   let list = await this.dataSource.getRandomRecipes();
    this.renderRecipes(list);
  }

  renderRecipes(list) {
    renderListWithTemplate(randomRecipeGenerator, this.listElement, list);
  }
}
