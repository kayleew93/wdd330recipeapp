import { loadPartials } from "./utils.mjs";
import SpoonacularConnection from "./SpoonacularConnection.mjs";
import collectionRecipeData from "./collectionsPage.mjs";
import { getParam } from "./utils.mjs";

loadPartials();

const dataSource = new SpoonacularConnection();
const element = document.querySelector("#collectionsPageList");
const key = getParam("collectionTitle");
console.log("Key: ", key);

const recipeList = new collectionRecipeData(dataSource, element, key);
recipeList.init();
