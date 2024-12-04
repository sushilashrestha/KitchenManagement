document.addEventListener("DOMContentLoaded", () => {
  const addRecipeButton = document.getElementById("addRecipeButton");
  const addRecipeModal = document.getElementById("addRecipeModal");
  const cancelRecipe = document.getElementById("cancelRecipe");
  const saveRecipe = document.getElementById("saveRecipe");
  const addIngredient = document.getElementById("addIngredient");
  const addInstruction = document.getElementById("addInstruction");
  const ingredientsList = document.getElementById("ingredientsList");
  const instructionsList = document.getElementById("instructionsList");
  const recipeList = document.getElementById("recipeList");

  // Open Add Recipe Modal
  addRecipeButton.addEventListener("click", () => {
      addRecipeModal.style.display = "flex";
  });

  // Close Modal
  cancelRecipe.addEventListener("click", () => {
      addRecipeModal.style.display = "none";
  });

  // Add Ingredient
  addIngredient.addEventListener("click", () => {
      const ingredientInput = document.createElement("input");
      ingredientInput.type = "text";
      ingredientInput.placeholder = "Enter ingredient";
      ingredientsList.appendChild(ingredientInput);
  });

  // Add Instruction
  addInstruction.addEventListener("click", () => {
      const instructionInput = document.createElement("textarea");
      instructionInput.placeholder = "Enter instruction";
      instructionsList.appendChild(instructionInput);
  });

  // Save Recipe
  saveRecipe.addEventListener("click", () => {
      const title = document.getElementById("recipeTitle").value;
      const imageUrl = document.getElementById("recipeImage").value;

      const recipeCard = document.createElement("div");
      recipeCard.className = "recipe-card";

      recipeCard.innerHTML = `
          <img src="${imageUrl}" alt="${title}">
          <div class="recipe-info">
              <p class="recipe-title">${title}</p>
              <button class="recipe-action">View Recipe</button>
          </div>
      `;

      recipeList.appendChild(recipeCard);
      addRecipeModal.style.display = "none";
  });
});
