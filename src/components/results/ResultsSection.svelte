<script lang="ts">
  import type { RecipesData } from "../../types/recipes";
  import {
    recipesData,
    loadMoreRecipes,
    scrollIntoSection,
  } from "../../stores/formStore";
  import RecipeCard from "./RecipeCard.svelte";

  $: recipes = $recipesData.recipes as RecipesData["recipes"];
</script>

{#if recipes.length > 0}
  <section use:scrollIntoSection aria-labelledby="recipe-results" data-section="recipe-results" tabindex="-1">
    <div class="wrapper">
      <h2 id="recipe-results">Here are your search results:</h2>
      <ul class="results__cards">
        {#each recipes as recipe (recipe.id)}
          <li>
            <RecipeCard {recipe} />
          </li>
        {/each}
      </ul>
    </div>

    {#if $recipesData.hasNextPage}
      <button on:click={loadMoreRecipes} class="scale-on-hover">
        Load More
      </button>
    {/if}
  </section>
{/if}

<style lang="scss">
  section {
    --border-radius: var(--half-spacer);
    padding-block: 2em;
    isolation: isolate;
    background-color: hsl(var(--brown-color));
    color: hsl(var(--white-color));

    h2 {
      margin-block-end: var(--double-spacer);
      text-align: center;
    }

    .results__cards {
      display: flex;
      gap: 3rem;
      flex-wrap: wrap;
      justify-content: center;

      li {
        width: min(90%, 18rem);
      }
    }

    button {
      display: block;
      position: relative;
      margin-inline: auto;
      margin-block-start: var(--double-spacer);
      padding: 0.5em 1.25em;
      width: max-content;
      background-color: hsl(var(--yellow-color));
      color: hsl(var(--black-color));
      border-radius: var(--border-radius);

      &:focus-visible {
        outline-color: hsl(var(--white-color));
        outline-offset: calc(var(--spacer) / 4);
      }
    }
  }
</style>
