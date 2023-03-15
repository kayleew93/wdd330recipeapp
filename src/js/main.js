import { loadPartials } from "./utils.mjs";
import SpoonacularConnection from "./SpoonacularConnection.mjs";
import RecipeData from "./recipeRandom.mjs";

loadPartials();

const dataSource = new SpoonacularConnection();
//let data = await dataSource.getRandomRecipes().then((result) => result);
const element = document.querySelector(".recipes-main");
//data = data.then(function(result) {return result});

const recipe = new RecipeData(dataSource, element);
recipe.init();