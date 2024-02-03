const API_KEY = "8cfc901e3d534a038f69acb8e834d3ff";
const recipeListElement = document.getElementById("recipe-list");

function displayRecipes(recipes) {
  recipeListElement.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeItemElement = document.createElement("li");
    recipeItemElement.classList.add("recipe-item");

    const recipeImageElement = document.createElement("img");
    recipeImageElement.src = recipe.image;
    recipeImageElement.alt = "recipe image";

    const recipeTitle = document.createElement("h2");
    recipeTitle.innerText = recipe.title;

    const recipeIngredients = document.createElement("p");
    recipeIngredients.innerHTML = `<strong>Ingredients</strong> ${recipe.extendedIngredients
      .map((ingredient) => ingredient.original)
      .join(",")}`;

    const recipeButton = document.createElement("a");
    recipeButton.href = recipe.sourceUrl;
    recipeButton.innerText = "View Link";

    recipeItemElement.appendChild(recipeImageElement);
    recipeItemElement.appendChild(recipeTitle);
    recipeItemElement.appendChild(recipeIngredients);
    recipeItemElement.appendChild(recipeButton);

    recipeListElement.appendChild(recipeItemElement);
  });
}

async function getRecipes() {
  //gets information for website
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
  );

  const data = await response.json();

  return data.recipes;
}

async function init() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
  console.log(recipes);
}

init();
