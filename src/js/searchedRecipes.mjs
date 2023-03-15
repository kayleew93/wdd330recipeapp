import { renderListWithTemplate } from "./utils.mjs";

function searchedRecipeGenerator(recipe) {
  console.log("Made it here");
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

   const ingredients = document.querySelector("#ingredients-input").value;
   console.log(ingredients);
   let list = await this.dataSource.findRecipeByIngredients(ingredients);
   this.renderRecipes(list);
  }

  renderRecipes(list) {
    renderListWithTemplate(searchedRecipeGenerator, this.listElement, list);
  }
}
