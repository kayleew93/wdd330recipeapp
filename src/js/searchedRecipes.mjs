import { renderListWithTemplate } from "./utils.mjs";

function searchedRecipeGenerator(recipe) {
  return `<li>
        <a href="../views/recipeListing.html?recipeId=${recipe.id}">
        <img
          src="${recipe.image}"
          alt="Image of"/>
        <h2>${recipe.title}</h2>
        <a href="${recipe.sourceUrl}">Recipe</a>
        </a>
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
