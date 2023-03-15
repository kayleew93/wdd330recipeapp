const baseURL = "https://api.spoonacular.com/recipes";
const APIKey = "&apiKey=5330af71810943f4a6021269bbf25094";

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    console.log("MAde it here", data);
    return data;
  } else {
    throw { name: 'servicesError', message: data };
  }
}

export default class SpoonacularConnection {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }

  async findRecipeByIngredients(ingredients) {
    console.log("ingredients");
    console.log("Request", `${baseURL}/findByIngredients?ingredients=${ingredients}&number=1`);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    let data = await fetch(`${baseURL}/findByIngredients?ingredients=${ingredients}&number=1${APIKey}`, options).then(convertToJson);
    return data;
  }
  async getRandomRecipes() {
    let url = `${baseURL}random?number=3${APIKey}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    let data = await fetch(`${baseURL}/random?limitLicense=true&number=2${APIKey}`, options).then(convertToJson);
    data = Object.values(data.recipes);
    return data;
  }

  async loginRequest(user) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(baseURL + "login", options).then(
      convertToJson
    );
    return response.accessToken;
  }
  // make a request to the server for the current orders
  // requires: a valid token
  // returns: a list of orders
  async getOrders(token) {
    const options = {
      method: "GET",
      // the server will reject our request if we don't include the Authorization header with a valid token!
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch("http://server-nodejs.cit.byui.edu:3000/orders", options).then(
      convertToJson
    );
    return response;
  }
}