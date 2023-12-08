<script lang="ts">
  import type { Recipe } from "../../types/recipes";
  import {
    recipesData,
    idOfClickedRecipe,
    scrollIntoSection,
  } from "../../stores/formStore";

  type NutrientsPair = [string, "calories" | keyof Recipe["totalNutrients"]];

  $: recipe =
    $recipesData.recipes.find(({ id }) => id === $idOfClickedRecipe) || null;

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
  >
    <div class="wrapper">
      <h2 id="recipe-details">
        Details on the <span>{recipe.label}</span> recipe:
      </h2>
      <img
        src={recipe.images[returnImgSize()].url}
        alt="clicked meal"
        width="600"
        height="600"
      />
      <section aria-labelledby="nutritional-data">
        <h3 id="nutritional-data">Nutritional data (per 100 g):</h3>
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
        <ul>
          {#each recipe.ingredientLines as ingredient}
            <li>{ingredient.replaceAll(" ,", ",")}</li>
          {/each}
        </ul>
      </section>
    </div>
  </section>
{/if}

<style lang="scss">
  section {
    &[data-section="recipe-details"] {
      padding-block: 2em;
    }

    .wrapper {
      display: grid;
      place-content: center;
      gap: var(--double-spacer);
    }

    h2 {
      text-align: center;

      span {
        color: hsl(var(--brown-color));
      }
    }

    img {
      margin-inline: auto;
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
      padding-inline: 1.2rem;
      list-style-type: disc;
    }
  }
</style>
