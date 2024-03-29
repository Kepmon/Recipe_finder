<script lang="ts">
  import Popup from '../Popup.svelte'
  import IngredientOptions from "./IngredientOptions.svelte";
  import FormOptionsList from "./FormOptionsList.svelte";
  import Spinner from "../Spinner.svelte";
  import {
  formData,
  recipesData,
  isFormSubmitted,
  formErrors,
  handleSubmit,
  resetFormData,
  focusErrorMessage
} from '../../stores/formStore'
import { getRecipesOnPageLoad } from '../../helpers/recipes';
import { scale, fade } from "svelte/transition";
import { onMount } from 'svelte';

onMount(async () => {
  const data = await getRecipesOnPageLoad()
  
  if (data != null) {
    $recipesData = data
  }
})
</script>

<Popup />
<section aria-labelledby="form-title">
  <form on:submit|preventDefault={handleSubmit} class="form">
    <header class="form__group">
      <h2 class="form__title" id="form-title">Choose desired criteria for your recipe</h2>
      <p class="form__hint">
        HINT: You need to fill in at least one form section
      </p>
    </header>
    <div class="form__input-pair form__group">
      <label for="name" class="form__input-label">Name</label>
      <input
        bind:value={$formData.q}
        type="text"
        id="name"
        name="q"
        class="form-input"
      />
    </div>
    <div class="form__input-pair form__group">
      <label for="calories" class="form__input-label"
        >Caloric range (kcal per serving)</label
      >
      <div class="form__input-range">
        <input
          bind:value={$formData.calories.from}
          type="number"
          id="calories"
          name="calories-from"
          min="0"
        />
        -
        <input
          bind:value={$formData.calories.to}
          type="number"
          id="calories"
          name="calories-to"
        />
      </div>
    </div>
    <FormOptionsList />
    <IngredientOptions />
    <div class="form__buttons">
      <button
        class="form__submit-btn bigger-btn-padding scale-on-hover"
        disabled={$isFormSubmitted}
      >
        {#if $isFormSubmitted}
          <Spinner />
        {/if}
        {$isFormSubmitted ? "Loading..." : "Find Recipes"}
      </button>
      <button
      on:click={resetFormData}
        class="form__submit-btn bigger-btn-padding scale-on-hover"
        disabled={$isFormSubmitted}
        type="button"
      >
        Reset Form
      </button>
    </div>
  
    {#if $formErrors.noFieldFilled !== "" || $formErrors.negativeCalories !== ""}
      <p
        use:focusErrorMessage
        in:scale={{ duration: 200 }}
        out:fade={{ duration: 200 }}
        tabindex="-1"
        class="form__error-message"
        data-message="form-error"
      >
        {$formErrors.noFieldFilled}{$formErrors.negativeCalories}
      </p>
    {/if}
  </form>
</section>

<style lang="scss">
  section {
    padding-block: var(--section-spacer);
  }

  .form {
    --spinner-width: 1.5rem;
    --spinner-border: 4px;
    --spinner-color: hsl(var(--black-color) / 0.8);
    display: grid;
    margin-inline: auto;
    padding: var(--spacer);
    width: var(--form-width);
    background-color: hsl(var(--pink-color));
    border-radius: var(--form-radius);
    text-align: center;
    box-shadow: 1px 1px 5px hsl(var(--black-color) / 0.4);

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
      gap: var(--half-spacer);

      input {
        max-width: 6rem;
      }
    }

    &__buttons {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacer);
      margin-inline: auto;
      margin-block-start: calc(var(--spacer) * 1.5);
    }

    &__submit-btn {
      display: flex;
      gap: var(--half-spacer);
      align-items: center;
      margin-inline: auto;
      margin-block-end: var(--half-spacer);
      width: max-content;
    }

    &__error-message {
      margin-block-start: var(--half-spacer);
      color: hsl(var(--dark-red));
      font-weight: 500;
      font-size: 0.9em;
      transition: scale 0.3s ease-in;

      &:focus-visible {
        scale: 1.2;
        outline: 2px solid transparent;
      }
    }
  }
</style>
