<script lang="ts">
  import { formData } from "../stores/formData"

  const addNewInput = () => {
    $formData.ingredients = [...$formData.ingredients, '']
  }
</script>

<div class="form__group">
  <p class="form__input-label">Ingredients</p>
  <div class="form__ingredient-inputs">
    {#each $formData.ingredients as ingredient}
      <input type="text" name="ingredients" class="main__form-option-input" />
    {/each}
    <button on:click={addNewInput} type="button" class="add-more">Add more ingredients</button>
  </div>
</div>

<style lang="scss">
  .form {
    &__input-label,
    &__ingredient-inputs > * {
      margin-block-end: var(--spacer);
    }
    
    &__ingredient-inputs > :last-child {
      margin-block-end: calc(var(--spacer) / 2);
    }
  }
</style>