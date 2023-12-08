<script lang="ts">
  import type { Recipe } from "../../types/recipes";
  import {
    recipesData,
    idOfClickedRecipe,
    scrollIntoSection,
  } from "../../stores/formStore";
  import ExternalLink from "../svgs/ExternalLink.svelte";

  type NutrientsPair = [string, "calories" | keyof Recipe["totalNutrients"]];

  $: recipe =
    $recipesData.recipes.find(({ id }) => id === $idOfClickedRecipe) || null;

  $: nutritialLabels =
    recipe != null ? [...recipe.dietLabels, ...recipe.healthLabels] : [];

  const externalLinkProps = {
    width: '1rem',
    stroke: 'hsl(var(--brown-color))'
  }

  const returnCalculatedNutrients = (quantity: number, unit = "kcal") => {
    return recipe != null
      ? `${Math.round((quantity / recipe.totalWeight) * 100)} ${
          unit !== "kcal" ? unit : ""
        }`
      : 0;
  };

  const returnImgSize = () => {
    if (recipe != null) {
      return (
        ["SMALL", "REGULAR", "LARGE"] as (keyof typeof recipe.images)[]
      ).reduce((finalSize, currentSize) => {
        if (recipe != null && currentSize in recipe.images) return currentSize;

        return finalSize;
      }, "SMALL");
    }

    return "SMALL";
  };

  const recipeNutrients: NutrientsPair[] = [
    ["kcal", "calories"],
    ["fat", "FAT"],
    ["saturates", "FASAT"],
    ["trans", "FATRN"],
    ["carbs", "CHOCDF"],
    ["sugars", "SUGAR"],
    ["protein", "PROCNT"],
    ["fibre", "FIBTG"],
  ];
</script>

{#if recipe != null}
  <section
    use:scrollIntoSection
    aria-labelledby="recipe-details"
    id="recipe-details"
    data-section="recipe-details"
    class="wrapper"
  >
    <h2 id="recipe-details">
      Details on the <span>{recipe.label}</span> recipe:
    </h2>
    <img
      src={recipe.images[returnImgSize()].url}
      alt="clicked meal"
      width="600"
      height="600"
    />
    <section aria-labelledby="nutrition-data">
      <h3 id="nutrition-data">Nutrition data (per 100 g):</h3>
      <div class="nutrients-wrapper">
        {#each recipeNutrients as nutrientPair (nutrientPair[0])}
          <div class="nutrient">
            <p>{nutrientPair[0]}</p>
            <p>
              {nutrientPair[1] === "calories"
                ? returnCalculatedNutrients(recipe.calories)
                : returnCalculatedNutrients(
                    recipe.totalNutrients[nutrientPair[1]].quantity,
                    recipe.totalNutrients[nutrientPair[1]].unit,
                  )}
            </p>
          </div>
        {/each}
      </div>
    </section>
    <section aria-labelledby="ingredients">
      <h3 id="ingredients">Ingredients:</h3>
      <ul data-list="ingredients" class="list-style-disc">
        {#each recipe.ingredientLines as ingredient}
          <li>{ingredient.replaceAll(" ,", ",")}</li>
        {/each}
      </ul>
    </section>
    {#if nutritialLabels.length > 0}
      <section aria-labelledby="nutrition-labels">
        <h3 id="nutrition-labels">Nutrition labels:</h3>
        <ul data-list="nutrition-labels">
          {#each nutritialLabels as label}
            <li>{label}</li>
          {/each}
        </ul>
      </section>
    {/if}
    <a href={recipe.url} target="_blank">
      See full recipe
      <ExternalLink {externalLinkProps} />
    </a>
  </section>
{/if}

<style lang="scss">
  section {
    &[data-section="recipe-details"] {
      padding-block: 2em;
    }

    &.wrapper {
      display: grid;
      place-content: center;
      gap: var(--double-spacer);
      max-width: 70ch;
    }

    h2 {
      text-align: center;

      span {
        color: hsl(var(--brown-color));
      }
    }

    img {
      margin-inline: auto;
      object-fit: cover;
    }

    .nutrients-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: var(--half-spacer);
    }

    .nutrient {
      flex: 1;
      padding: var(--half-spacer);
      background-color: hsl(var(--brown-color));
      color: hsl(var(--white-color));
      text-align: center;
    }

    ul {
      &.list-style-disc {
        padding-inline-start: 1.5rem;
        list-style-type: disc;
      }

      &[data-list="nutrition-labels"] {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacer);
        background-color: hsl(var(--brown-color));
        color: hsl(var(--white-color));
      }
    }

    a {
      --color: hsl(var(--brown-color));
      position: relative;
      margin-block-start: var(--spacer);
      justify-self: center;
      color: var(--color);
      font-weight: 500;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 3px;
        background-color: var(--color);
        scale: 0 1;
        transform-origin: left;
        transition: scale 300ms ease-in;
      }

      &:focus-visible {
        outline: 2px solid transparent;
      }

      &:where(:hover, :focus-visible)::after {
        scale: 1;
      }
    }
  }
</style>
