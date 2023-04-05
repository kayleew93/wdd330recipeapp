import { loadPartials } from "./utils.mjs";
import SpoonacularConnection from "./SpoonacularConnection.mjs";
import personalRecipeData from "./personalCollections.mjs";

loadPartials();

const dataSource = new SpoonacularConnection();
const element = document.querySelector(".collections-list");
const key = "All Recipes";

const recipeList = new personalRecipeData(dataSource, element, key);
recipeList.init();
