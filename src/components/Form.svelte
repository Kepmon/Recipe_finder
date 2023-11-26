<script lang="ts">
  import IngredientOptions from "./IngredientOptions.svelte"
  import FormOptionsList from "./FormOptionsList.svelte"
  import { formData, handleSubmit } from "../stores/formStore"

  
</script>

<form on:submit|preventDefault={handleSubmit} class="form">
  <header class="form__group">
    <h2 class="form__title">Choose desired criteria for your recipe</h2>
    <p class="form__hint">HINT: You need to fill at least one form field</p>
  </header>
  <div class="form__input-pair form__group">
    <label for="name" class="form__input-label">Name</label>
    <input bind:value={$formData.q} type="text" id="name" name="name" class="form-input" />
  </div>
  <div class="form__input-pair form__group">
    <header>
      <label for="calorie" class="form__input-label">Caloric range (kcal)</label
      >
      <p class="form__hint">HINT: You need to fill in both fields</p>
    </header>
    <div class="form__input-range">
      <input bind:value={$formData.calories.from} type="number" name="calories" /> -
      <input bind:value={$formData.calories.to} type="number" name="calories" />
    </div>
  </div>
  <FormOptionsList />
  <IngredientOptions />
  <button class="form__submit-btn">Find recipes</button>
</form>

<style lang="scss">
  .form {
    --spacer: 1rem;
    display: grid;
    margin-inline: auto;
    padding: var(--spacer);
    width: var(--form-width);
    background-color: hsl(var(--pink-color));
    border-radius: var(--form-radius);
    text-align: center;
    box-shadow: 1px 1px 5px hsl(var(--black-color) / 0.4);

    h2 {
      font-size: clamp(1.125rem, 0.9924rem + 0.7576vw, 1.75rem);
    }

    &__hint {
      color: hsl(var(--gray-color));
      font-size: clamp(0.6875rem, 0.6345rem + 0.303vw, 0.9375rem);
    }

    &__input-pair {
      display: grid;
      justify-items: center;

      header {
        margin-block-end: var(--spacer);
      }
    }

    &__input-range {
      display: flex;
      gap: calc(var(--spacer) / 2);

      input {
        max-width: 6rem;
      }
    }

    &__submit-btn {
      margin-inline: auto;
      margin-block-start: calc(var(--spacer) * 1.5);
      margin-block-end: calc(var(--spacer) / 2);
      width: max-content;
    }
  }
</style>
