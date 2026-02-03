(() => {

const recipes = [
  {
    id:1,
    title:"Pasta",
    time:20,
    difficulty:"easy",
    description:"Quick pasta",
    category:"pasta",
    steps:[
      "Boil water",
      "Add pasta",
      { title:"Make Sauce", substeps:["Cut onion","Fry tomato"] }
    ],
    ingredients:["Pasta","Salt","Tomato"]
  },
  {
    id:2,
    title:"Salad",
    time:15,
    difficulty:"easy",
    description:"Healthy salad",
    category:"salad",
    steps:["Cut vegetables","Add salt","Mix well"],
    ingredients:["Tomato","Cucumber","Salt"]
  },
  {
    id:3,
    title:"Biryani",
    time:60,
    difficulty:"medium",
    description:"Spicy rice",
    category:"curry",
    steps:["Wash rice","Cook rice"],
    ingredients:["Rice","Masala"]
  },
  {
    id:4,
    title:"Pizza",
    time:45,
    difficulty:"medium",
    description:"Cheesy pizza",
    category:"fastfood",
    steps:["Prepare dough","Add toppings"],
    ingredients:["Flour","Cheese"]
  },
  {
    id:5,
    title:"Lasagna",
    time:90,
    difficulty:"hard",
    description:"Layered pasta",
    category:"pasta",
    steps:["Layer pasta","Bake"],
    ingredients:["Pasta","Cheese"]
  },
  {
    id:6,
    title:"Cake",
    time:70,
    difficulty:"hard",
    description:"Sweet dessert",
    category:"dessert",
    steps:["Mix flour","Bake"],
    ingredients:["Flour","Sugar"]
  },
  {
    id:7,
    title:"Soup",
    time:25,
    difficulty:"easy",
    description:"Warm soup",
    category:"soup",
    steps:["Boil water","Add veggies"],
    ingredients:["Water","Vegetables"]
  },
  {
    id:8,
    title:"Burger",
    time:35,
    difficulty:"medium",
    description:"Juicy burger",
    category:"fastfood",
    steps:[
      "Prepare patty",
      { title:"Assemble Burger", substeps:["Add bun","Add sauce"] }
    ],
    ingredients:["Bun","Patty"]
  }
];

const recipeContainer = document.querySelector("#recipe-container");

let currentFilter = "all";
let currentSort = "none";

/* ---------- RECURSION ---------- */
const renderSteps = (steps) => {
  return steps.map(step => {
    if (typeof step === "string") {
      return `<li>${step}</li>`;
    } else {
      return `<li>${step.title}
                <ul>${renderSteps(step.substeps)}</ul>
              </li>`;
    }
  }).join("");
};

/* ---------- CREATE CARD ---------- */
const createRecipeCard = (recipe) => `
  <div class="recipe-card">
    <h3>${recipe.title}</h3>
    <p>${recipe.description}</p>

    <span class="difficulty ${recipe.difficulty}">
      ${recipe.difficulty}
    </span>

    <br><br>

    <button class="toggle-steps">Show Steps</button>
    <button class="toggle-ingredients">Show Ingredients</button>

    <div class="steps hidden">
      <ul>${renderSteps(recipe.steps)}</ul>
    </div>

    <div class="ingredients hidden">
      <ul>
        ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
      </ul>
    </div>
  </div>
`;

/* ---------- RENDER ---------- */
const renderRecipes = (recipesArray) => {
  recipeContainer.innerHTML = recipesArray.map(createRecipeCard).join("");
};

/* ---------- FILTER ---------- */
const filterRecipes = (data, filter) => {
  if (filter === "easy" || filter === "medium" || filter === "hard") {
    return data.filter(r => r.difficulty === filter);
  }
  if (filter === "quick") {
    return data.filter(r => r.time < 30);
  }
  return data;
};

/* ---------- SORT ---------- */
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

/* ---------- UPDATE DISPLAY ---------- */
const updateDisplay = () => {
  const filtered = filterRecipes(recipes, currentFilter);
  const sorted = sortRecipes(filtered, currentSort);
  renderRecipes(sorted);
};

/* ---------- FILTER BUTTONS ---------- */
document.querySelectorAll(".filters button").forEach(btn => {
  btn.onclick = () => {
    currentFilter = btn.dataset.filter;
    updateDisplay();
  };
});

/* ---------- SORT BUTTONS ---------- */
document.querySelectorAll(".sorting button").forEach(btn => {
  btn.onclick = () => {
    currentSort = btn.dataset.sort;
    updateDisplay();
  };
});

/* ---------- TOGGLE STEPS / INGREDIENTS ---------- */
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle-steps")) {
    const card = e.target.closest(".recipe-card");
    card.querySelector(".steps").classList.toggle("hidden");
  }

  if (e.target.classList.contains("toggle-ingredients")) {
    const card = e.target.closest(".recipe-card");
    card.querySelector(".ingredients").classList.toggle("hidden");
  }
});

/* ---------- INIT ---------- */
updateDisplay();

})();
