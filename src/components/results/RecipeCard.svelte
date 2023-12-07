<script lang="ts">
  import type { Recipe } from "../../types/recipes";
  import { isRecipeDetailsSectionShown, idOfClickedRecipe } from "../../stores/formStore";

  export let recipe: Recipe;

  const basicRecipeInfo = [
    {
      label: "Total calories",
      value: recipe.calories.toFixed(0),
    },
    {
      label: "Servings",
      value: recipe.yield,
    },
    {
      label: "Calories per serving",
      value: (recipe.calories / recipe.yield).toFixed(0),
    },
    {
      label: "Prep Time (mins)",
      value: recipe.totalTime,
    },
  ];

  const showRecipeDetails = () => {
    $isRecipeDetailsSectionShown = true
    $idOfClickedRecipe = recipe.id
  }
</script>

<article>
  <h3>{recipe.label}</h3>
  <img
    src={recipe.images.SMALL.url}
    alt={`The visual presentation of the ${recipe.label} meal`}
    class="whole-width"
  />
  <div>
    {#each basicRecipeInfo as { label, value }}
      <p>
        <span class="bold">{label}:</span>
        {value}
      </p>
    {/each}
  </div>
  <button on:click={showRecipeDetails} class="scale-on-hover">Read More</button>
</article>

<style lang="scss">
  article {
    display: grid;
    gap: (var(--spacer));
    grid-template-columns: var(--half-spacer) 1fr var(--half-spacer);
    padding-block: var(--spacer);
    width: min(90%, 18rem);
    background-color: hsl(var(--white-color));
    color: hsl(var(--black-color));
    text-align: center;
    border-radius: var(--border-radius);

    > * {
      grid-column: 2 / -2;
    }

    > .whole-width {
      grid-column: 1 / -1;
    }

    h3 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
    }

    button {
      position: relative;
      margin-inline: auto;
      font-size: 0.95em;
      font-weight: 500;
    }
  }

  .bold {
    font-weight: 500;
  }
</style>
