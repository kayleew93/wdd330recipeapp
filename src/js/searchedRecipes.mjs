import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";
import { addToCollection } from "./personalCollections.mjs";

function searchedRecipeGenerator(recipe) {
  let html = `<li>
        <div class="list-recipe-card">
        <a href="../views/recipeListing.html?recipeId=${recipe.id}">
        <img
          src="${recipe.image}"
          alt="Image of"/>
        <div>
          <h2>${recipe.title}</h2>
        <div>
        </a>
        <a href="#" class="save-btn`;

        let ids = getLocalStorage("collection");
        console.log("ids: ", ids);
        if (ids && ids.includes(recipe.id.toString())) {
          html += ` loved`;
        }
        html += `" data-recipe-id="${recipe.id}"><span>&#10084;</span></a></div>
        <div>
      </li>`
      return html;
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
    const self = this;
    svbtns.forEach(btn =>
      btn.addEventListener("click", function () {
        const recipeId = this.dataset.recipeId;
        addToCollection(recipeId);
        self.renderRecipes(list);
      })
    );
  }

  renderRecipes(list) {
    renderListWithTemplate(searchedRecipeGenerator, this.listElement, list, true);
  }
}
