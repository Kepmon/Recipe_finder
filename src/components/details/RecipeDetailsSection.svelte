<script lang="ts">
  import { recipesData, isRecipeDetailsSectionShown, idOfClickedRecipe } from "../../stores/formStore"
  import { scrollIntoResults } from "../../stores/formStore"

  $: recipe = $recipesData.recipes.find(({ id }) => id === $idOfClickedRecipe) || $recipesData.recipes[0]
  

  const returnCalculatedNutrients = (quantity: number, unit = 'kcal') => {
    return `${Math.round(quantity / recipe.totalWeight * 100)} ${unit !== 'kcal' ? unit : ''}`
  }
</script>

{#if $isRecipeDetailsSectionShown}
  <section use:scrollIntoResults aria-labelledby="recipe-details" id="recipe-details">
    <div class="wrapper">
      <h2 id="recipe-details">Details on <span>{recipe.label}</span> recipe:</h2>
      <img src={recipe.images.LARGE.url} alt="clicked meal">
      <section aria-labelledby="nutritional-data">
        <h3 id="nutritional-data">Nutritional data (per 100 g):</h3>
        <div class="nutrients-wrapper">
          <div class="nutrient">
            <p>kcal</p>
            <p>{returnCalculatedNutrients(recipe.calories)}</p>
          </div>
          <div class="nutrient">
            <p>fat</p>
            <p>{returnCalculatedNutrients(recipe.totalNutrients.FAT.quantity, recipe.totalNutrients.FAT.unit)}</p>
          </div>
          <div class="nutrient">
            <p>saturates</p>
            <p>{returnCalculatedNutrients(recipe.totalNutrients.FASAT.quantity, recipe.totalNutrients.FASAT.unit)}</p>
          </div>
          <div class="nutrient">
            <p>trans</p>
            <p>{returnCalculatedNutrients(recipe.totalNutrients.FATRN.quantity, recipe.totalNutrients.FATRN.unit)}</p>
          </div>
          <div class="nutrient">
            <p>carbs</p>
            <p>{returnCalculatedNutrients(recipe.totalNutrients.CHOCDF.quantity, recipe.totalNutrients.CHOCDF.unit)}</p>
          </div>
          <div class="nutrient">
            <p>sugars</p>
            <p>{returnCalculatedNutrients(recipe.totalNutrients.SUGAR.quantity, recipe.totalNutrients.SUGAR.unit)}</p>
          </div>
          <div class="nutrient">
            <p>protein</p>
            <p>{returnCalculatedNutrients(recipe.totalNutrients.PROCNT.quantity, recipe.totalNutrients.PROCNT.unit)}</p>
          </div>
          <div class="nutrient">
            <p>fiber</p>
            <p>{returnCalculatedNutrients(recipe.totalNutrients.FIBTG.quantity, recipe.totalNutrients.FIBTG.unit)}</p>
          </div>
        </div>
      </section>
      <section aria-labelledby="ingredients">
        <h3 id="ingredients">Ingredients:</h3>
        <ul>
          {#each recipe.ingredientLines as ingredient}
            <li>{ingredient.replaceAll(' ,', ',')}</li>
          {/each}
        </ul>
      </section>
    </div>
  </section>
{/if}

<style lang="scss">
  section {
    &:first-of-type {
      padding-block-start: 2em;
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

    .nutrients-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: var(--half-spacer);
    }

    .nutrient {
      flex-grow: 1;
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