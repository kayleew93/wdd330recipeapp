import { loadPartials, getParam } from "./utils.mjs";
import SpoonacularConnection from "./SpoonacularConnection.mjs";
import RecipeData from "./recipeDetails.mjs";

loadPartials();

const recipeId = getParam("recipeId");

const dataSource = new SpoonacularConnection();
const element = ".individual-recipe";

const recipe = new RecipeData(dataSource, element, recipeId);
recipe.init();
