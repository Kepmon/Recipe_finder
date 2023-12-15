<script lang="ts">
  import type { Recipe } from "../../types/recipes";
  import { recipesData, showRecipeDetails } from "../../stores/formStore";

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
      label: "Prep time (mins)",
      value: recipe.totalTime,
      ariaLabel: 'Preparation time in minutes'
    },
  ];

  const focusFirstNewRecipe = (article: HTMLElement) => {
    const indexOfFirstRecipeInChunk = (($recipesData.recipes.length / 20) - 1) * 20
    const firstRecipeId = $recipesData.recipes[indexOfFirstRecipeInChunk].id
    const isFirstNewRecipe = $recipesData.recipes.length >= 40 && article.getAttribute('data-id') === firstRecipeId
    
    if (isFirstNewRecipe) {
      article.focus()
    }
  }
</script>

<article use:focusFirstNewRecipe tabindex="-1" data-id={recipe.id}>
  <h3>{recipe.label}</h3>
  <img
    src={recipe.images.SMALL.url}
    alt={`The photo of the ${recipe.label} meal`}
    class="whole-width"
  />
  <div>
    {#each basicRecipeInfo as { label, value, ariaLabel }}
    <p>
        <span class="sr-only">
          {ariaLabel != null ?`${ariaLabel}: ${value}` : `${label}: ${value}`}
        </span>
        <span aria-hidden="true" class="bold">{label}:</span>
        <span aria-hidden="true">{value}</span>
      </p>
    {/each}
  </div>
  <button on:click={() => showRecipeDetails(recipe.id)} class="scale-on-hover">
    Read More
  </button>
</article>

<style lang="scss">
  article {
    display: grid;
    gap: (var(--spacer));
    grid-template-columns: var(--half-spacer) 1fr var(--half-spacer);
    padding-block: var(--spacer);
    background-color: hsl(var(--white-color));
    color: hsl(var(--black-color));
    text-align: center;
    border-radius: var(--border-radius);
    outline: 2px solid transparent;

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
