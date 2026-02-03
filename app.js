const recipes = [
  { id:1, title:"Pasta", time:20, difficulty:"easy", description:"Quick pasta", category:"pasta" },
  { id:2, title:"Salad", time:15, difficulty:"easy", description:"Healthy salad", category:"salad" },
  { id:3, title:"Biryani", time:60, difficulty:"medium", description:"Spicy rice", category:"curry" },
  { id:4, title:"Pizza", time:45, difficulty:"medium", description:"Cheesy pizza", category:"fastfood" },
  { id:5, title:"Lasagna", time:90, difficulty:"hard", description:"Layered pasta", category:"pasta" },
  { id:6, title:"Cake", time:70, difficulty:"hard", description:"Sweet dessert", category:"dessert" },
  { id:7, title:"Soup", time:25, difficulty:"easy", description:"Warm soup", category:"soup" },
  { id:8, title:"Burger", time:35, difficulty:"medium", description:"Juicy burger", category:"fastfood" }
];

const recipeContainer = document.querySelector("#recipe-container");

const createRecipeCard = (recipe) => `
  <div class="recipe-card">
    <h3>${recipe.title}</h3>
    <p>${recipe.description}</p>
    <span class="difficulty ${recipe.difficulty}">
      ${recipe.difficulty}
    </span>
  </div>
`;

const renderRecipes = (recipesArray) => {
  recipeContainer.innerHTML = recipesArray.map(createRecipeCard).join("");
};

updateDisplay();
let currentFilter = "all";
let currentSort = "none";
const filterRecipes = (data, filter) => {
  if (filter === "easy" || filter === "medium" || filter === "hard") {
    return data.filter(r => r.difficulty === filter);
  }
  if (filter === "quick") {
    return data.filter(r => r.time < 30);
  }
  return data;
};

const sortRecipes = (data, type) => {
  const copy = [...data];

  if (type === "name") {
    return copy.sort((a,b) => a.title.localeCompare(b.title));
  }
  if (type === "time") {
    return copy.sort((a,b) => a.time - b.time);
  }
  return copy;
};
const updateDisplay = () => {
  const filtered = filterRecipes(recipes, currentFilter);
  const sorted = sortRecipes(filtered, currentSort);
  renderRecipes(sorted);
};
document.querySelectorAll(".filters button").forEach(btn => {
  btn.onclick = () => {
    currentFilter = btn.dataset.filter;
    updateDisplay();
  };
});

document.querySelectorAll(".sorting button").forEach(btn => {
  btn.onclick = () => {
    currentSort = btn.dataset.sort;
    updateDisplay();
  };
});



