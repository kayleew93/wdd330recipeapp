import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";
import { addToCollection } from "./personalCollections.mjs";

function singleRecipeGenerator(recipe) {
  let html = `
    <img
      src="${recipe.image}"
      alt="Image of"/>
      <div>
      <a href="#" class="save-btn`;

        let ids = getLocalStorage("collection");
        if (ids && ids.includes(recipe.id.toString())) {
          html += ` loved`;
        }
        html += `" data-recipe-id="${recipe.id}"><span>&#10084;</span></a></div>
                <h2>${recipe.title}</h2>
                <a href="${recipe.sourceUrl}" target="_blank">Original Recipe</a>
                <p>Total Time: ${recipe.readyInMinutes} min</p>
                <p>${recipe.servings} servings</p>
                <h3>Ingredients:</h3>`;

  recipe.extendedIngredients.forEach((element) => {
    html += `<p>${element.original}</p>`;
  });

  html += `<h3>Instructions:</h3>`;
  console.log(recipe);
  if (recipe.analyzedInstructions[0]) {recipe.analyzedInstructions[0].steps.forEach((element, i) => {
    html += `<p>${i + 1}. ${element.step}</p>`;
  });} else {html += `<p>Oops! Check out the <a href="${recipe.sourceUrl}" target="_blank">site</a> for instructions.</p>`;}

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

    // document.querySelector(".save-btn").addEventListener("click", () => {
    //   this.addToCollection();
    // });

    const saveBtn = document.querySelector(".save-btn");
  saveBtn.addEventListener("click", () => {
    const recipeId = saveBtn.dataset.recipeId;
    addToCollection(recipeId);
    this.renderRecipeDetails(this.listElement);
  });

    
  }

  renderRecipeDetails(selector) {
    const element = document.querySelector(selector);
    element.innerHTML = '';
    element.insertAdjacentHTML(
      "afterbegin",
      singleRecipeGenerator(this.recipe)
    );
  }

  renderRecipe() {
    renderListWithTemplate(
      singleRecipeGenerator,
      this.listElement,
      this.recipe
    );
  }
}
