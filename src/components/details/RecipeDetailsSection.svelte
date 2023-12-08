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

  const returnCalculatedNutrients = (nutrient: string, quantity: number) => {
    let value = recipe != null ? quantity / recipe.totalWeight * 100 : 0
    let unit = 'g'
  
    if (nutrient === 'kcal') {
      unit = ''
    }

    if (nutrient === 'salt') {
      value = recipe != null ? quantity / 1000 * 2.54 / recipe.totalWeight * 100 : 0
    }

    return `${Math.round(value)} ${unit}`
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
    ["salt", "NA"]
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
      <ul data-list="nutrients-wrapper">
        {#each recipeNutrients as nutrientPair (nutrientPair[0])}
          <li class="nutrient">
            <p class="nutrient__label">{nutrientPair[0].toUpperCase()}</p>
            <p class="nutrient__value">
              {
                returnCalculatedNutrients(
                  nutrientPair[0],
                  nutrientPair[1] === 'calories'
                    ? recipe.calories
                    : recipe.totalNutrients[nutrientPair[1]].quantity
                )
              }
            </p>
          </li>
        {/each}
      </ul>
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
      --border-radius: var(--half-spacer);
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

    h3 {
      margin-block-end: var(--half-spacer);
    }

    img {
      margin-inline: auto;
      object-fit: cover;
    }

    [data-list="nutrients-wrapper"],
    [data-list="nutrition-labels"] {
      display: grid;
      gap: var(--half-spacer);

      > * {
        padding: var(--half-spacer);
        background-color: hsl(var(--brown-color));
        color: hsl(var(--white-color));
        text-align: center;
        border-radius: var(--border-radius);
      }
    }
    
    [data-list="nutrients-wrapper"] {
      grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
    }
    
    [data-list="nutrition-labels"] {
      grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    }

    .nutrient {
      &__label {
        font-size: 0.75em;
        letter-spacing: 1.5px;
      }

      &__value {
        font-weight: 500;
      }
    }

    ul {
      &.list-style-disc {
        padding-inline-start: 1.5rem;
        list-style-type: disc;
      }

      ::marker {
        color: hsl(var(--brown-color));
      }
    }

    a {
      --color: hsl(var(--brown-color));
      position: relative;
      margin-block-start: var(--spacer);
      justify-self: center;
      color: var(--color);
      font-size: 1.2em;
      font-weight: 600;

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
