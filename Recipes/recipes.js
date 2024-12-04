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

  let editMode = false;
  let editTarget = null;

  // Open Add Recipe Modal
  addRecipeButton.addEventListener("click", () => {
      resetModal();
      editMode = false;
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
      ingredientInput.className = "dynamic-input";
      ingredientsList.appendChild(ingredientInput);
  });

  // Add Instruction
  addInstruction.addEventListener("click", () => {
      const instructionInput = document.createElement("textarea");
      instructionInput.placeholder = "Enter instruction";
      instructionInput.className = "dynamic-input";
      instructionsList.appendChild(instructionInput);
  });

  // Save Recipe
  saveRecipe.addEventListener("click", () => {
      const title = document.getElementById("recipeTitle").value;
      const imageUrl = document.getElementById("recipeImage").value;
      const ingredients = Array.from(ingredientsList.querySelectorAll("input"))
          .map(input => input.value)
          .filter(value => value.trim() !== "");
      const instructions = Array.from(instructionsList.querySelectorAll("textarea"))
          .map(input => input.value)
          .filter(value => value.trim() !== "");

      if (title.trim() === "" || imageUrl.trim() === "") {
          alert("Title and Image URL are required.");
          return;
      }

      if (editMode && editTarget) {
          // Update existing recipe
          const titleElement = editTarget.querySelector(".recipe-title");
          const imageElement = editTarget.querySelector("img");
          titleElement.textContent = title;
          imageElement.src = imageUrl;

          editTarget.dataset.ingredients = JSON.stringify(ingredients);
          editTarget.dataset.instructions = JSON.stringify(instructions);

          editMode = false;
          editTarget = null;
      } else {
          // Add new recipe
          const recipeCard = document.createElement("div");
          recipeCard.className = "recipe-card";
          recipeCard.dataset.ingredients = JSON.stringify(ingredients);
          recipeCard.dataset.instructions = JSON.stringify(instructions);

          recipeCard.innerHTML = `
              <img src="${imageUrl}" alt="${title}">
              <div class="recipe-info">
                  <p class="recipe-title">${title}</p>
                  <button class="edit-button">Edit</button>
                  <button class="delete-button">Delete</button>
              </div>
          `;

          recipeList.appendChild(recipeCard);
      }

      addRecipeModal.style.display = "none";
  });

  // Recipe List Actions (Edit and Delete)
  recipeList.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-button")) {
          // Delete Recipe
          const recipeCard = e.target.closest(".recipe-card");
          recipeList.removeChild(recipeCard);
      }

      if (e.target.classList.contains("edit-button")) {
          // Edit Recipe
          const recipeCard = e.target.closest(".recipe-card");
          const title = recipeCard.querySelector(".recipe-title").textContent;
          const imageUrl = recipeCard.querySelector("img").src;
          const ingredients = JSON.parse(recipeCard.dataset.ingredients || "[]");
          const instructions = JSON.parse(recipeCard.dataset.instructions || "[]");

          // Populate modal with existing data
          document.getElementById("recipeTitle").value = title;
          document.getElementById("recipeImage").value = imageUrl;

          ingredientsList.innerHTML = "";
          instructionsList.innerHTML = "";

          ingredients.forEach(ingredient => {
              const ingredientInput = document.createElement("input");
              ingredientInput.type = "text";
              ingredientInput.value = ingredient;
              ingredientInput.className = "dynamic-input";
              ingredientsList.appendChild(ingredientInput);
          });

          instructions.forEach(instruction => {
              const instructionInput = document.createElement("textarea");
              instructionInput.value = instruction;
              instructionInput.className = "dynamic-input";
              instructionsList.appendChild(instructionInput);
          });

          editMode = true;
          editTarget = recipeCard;
          addRecipeModal.style.display = "flex";
      }
  });

  // Reset Modal
  function resetModal() {
      document.getElementById("recipeTitle").value = "";
      document.getElementById("recipeImage").value = "";
      ingredientsList.innerHTML = "";
      instructionsList.innerHTML = "";
  }
});
