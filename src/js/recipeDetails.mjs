import { renderListWithTemplate } from "./utils.mjs";
import { addToCollection } from "./personalCollections.mjs";

function singleRecipeGenerator(recipe) {
  let html = `
        <img
          src="${recipe.image}"
          alt="Image of"/>
        <h2>${recipe.title}</h2>
        <p>Total Time: ${recipe.readyInMinutes} min</p>
        <p>${recipe.servings} servings</p>
        <h3>Ingredients:</h3>`

        recipe.extendedIngredients.forEach(element => {
          html +=`<p>${element.original}</p>`;
        }); 

        html += `<h3>Instructions:</h3>`

        recipe.analyzedInstructions[0].steps.forEach((element, i) => {
          html +=`<p>${i+1}. ${element.step}</p>`;
        }); 
        
  html += `
        <a href="${recipe.sourceUrl}" target="_blank">Recipe</a>
        <button class="save-btn">Save</button>`;
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
    
    document
      .getElementById("save-btn")
      .addEventListener("click", this.addToCollection.bind(this));
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
