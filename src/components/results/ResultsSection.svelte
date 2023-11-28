<script lang="ts">
  import type { RecipesData } from "../../types/recipes";
  import { recipesData } from "../../stores/formStore";
  import RecipeCard from "./RecipeCard.svelte";

  $: recipes = $recipesData.recipes as RecipesData["recipes"];

  const scrollIntoView = (section: HTMLElement) => {
    section.scrollIntoView();
  };
</script>

{#if recipes.length > 0}
  <section use:scrollIntoView aria-labelledby="section-title">
    <div class="wrapper">
      <h2 id="section-title">Here are your search results:</h2>
      <div class="results__cards">
        {#each recipes as recipe (recipe.label)}
          <RecipeCard {recipe} />
        {/each}
      </div>
    </div>

    {#if $recipesData.hasNextPage}
      <button> Load More </button>
    {/if}
  </section>
{/if}

<style lang="scss">
  section {
    --border-radius: var(--half-spacer);
    padding-block: 2em;
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
    }

    button {
      display: block;
      margin-inline: auto;
      margin-block-start: var(--double-spacer);
      width: max-content;
      background-color: hsl(var(--yellow-color));
      color: hsl(var(--black-color));
      border-radius: var(--border-radius);
    }
  }
</style>
