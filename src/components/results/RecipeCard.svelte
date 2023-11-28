<script lang="ts">
  import type { Recipe } from "../../types/recipes";

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
  <a href={recipe.url} target="_blank">Read More</a>
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

    a {
      position: relative;
      margin-inline: auto;
      width: max-content;
      color: hsl(var(--brown-color));
      font-weight: 500;
      outline: 2px solid transparent;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -0.1em;
        width: 100%;
        height: 0.15em;
        background-color: hsl(var(--brown-color));
        scale: 0 1;
        transform-origin: center left;
        transition: scale 200ms ease-in;
      }

      &:is(:hover, :focus-visible)::after {
        scale: 1;
      }
    }
  }

  .bold {
    font-weight: 500;
  }
</style>
