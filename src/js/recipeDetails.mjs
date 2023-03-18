import { renderListWithTemplate } from "./utils.mjs";

function singleRecipeGenerator(recipe) {
  let html = `<div class="recipe-card">
        <img
          src="${recipe.image}"
          alt="Image of"/>
        <h2>${recipe.title}</h2>
        <p>Total Time: ${recipe.readyInMinutes} min</p>
        <p>${recipe.servings} servings</p>
        <p>`
        console.log(recipe.extendedIngredients);

        recipe.extendedIngredients.forEach(element => {
          html +=`<p>${element}</p>`;
        }); 
        
        
        


  html += `<p>${recipe.instructions}</p>
        <a href="${recipe.sourceUrl}" target="_blank">Recipe</a>
        <button class="save-btn">Save</button>
        </div>`;
  return html;
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
