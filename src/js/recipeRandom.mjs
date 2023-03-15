import { renderListWithTemplate } from "./utils.mjs";

function randomRecipeGenerator(recipe) {
  return `<li>
        <img
          src="${recipe.image}"
          alt="Image of"/>
        <h2>${recipe.title}</h2>
        <a href="${recipe.sourceUrl}">Recipe</a>
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
