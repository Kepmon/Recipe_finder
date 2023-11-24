<script lang="ts">
import FormOptions from "./FormOptions.svelte"
import IngredientOptions from "./IngredientOptions.svelte";
import { formData } from "../stores/formData"
</script>

<form class="form">
  <header class="form__group">
    <h2 class="form__title">
      Choose desired criteria for your recipe
    </h2>
    <p class="form__hint">HINT: You need to fill at least one form field</p>
  </header>
  <div class="form__input-pair form__group">
    <label for="name" class="form__input-label">Name</label>
    <input type="text" id="name" name="name" class="form-input" />
  </div>
  <div class="form__input-pair form__group">
    <header>
      <label for="calorie" class="form__input-label">Caloric range (kcal)</label>
      <p class="form__hint">HINT: You need to fill in both fields</p>
    </header>
    <div class="form__input-range">
      <input type="number" name="calories" /> - <input type="number" name="calories" />
    </div>
  </div>
  <div class="form__group">
    <button
      on:click={() => $formData.dietType.isExpanded = !($formData.dietType.isExpanded)}
      aria-label="click here to choose one or more options"
      aria-expanded={$formData.dietType.isExpanded}
      type="button"
      class="form__group-title"
    >
      Diet type <slot name="chevron"></slot>
    </button>
    <FormOptions options={$formData.dietType} />
  </div>
  <div class="form__group">
    <button
      on:click={() => $formData.dishType.isExpanded = !($formData.dishType.isExpanded)}
      aria-label="click here to choose one or more options"
      aria-expanded={$formData.dishType.isExpanded}
      type="button"
      class="form__group-title"
    >
      Dish type <slot name="chevron"></slot>
    </button>
    <FormOptions options={$formData.dishType} />
  </div>
  <div class="form__group">
    <button
      on:click={() => $formData.cuisineType.isExpanded = !($formData.cuisineType.isExpanded)}
      aria-label="click here to choose one or more options"
      aria-expanded={$formData.cuisineType.isExpanded}
      type="button"
      class="form__group-title"
    >
      Cuisine type <slot name="chevron"></slot>
    </button>
    <FormOptions options={$formData.cuisineType} />
  </div>
  <div class="form__group">
    <button
      on:click={() => $formData.healthLabel.isExpanded = !($formData.healthLabel.isExpanded)}
      aria-label="click here to choose one or more options"
      aria-expanded={$formData.healthLabel.isExpanded}
      type="button"
      class="form__group-title"
    >
      Health label <slot name="chevron"></slot>
    </button>
    <FormOptions options={$formData.healthLabel} />
  </div>
  <IngredientOptions />
  <button class="form__submit-btn">Find recipes</button>
</form>

<style lang="scss">
  .form {
    --spacer: 1rem;
    display: grid;
    margin-inline: auto;
    padding: var(--spacer);
    width: min(100% - 2rem, 50rem);
    background-color: hsl(var(--pink-color));
    border-radius: 1.5rem;
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

    &__group {
      --transition-duration: 200ms;

      > button {
        background: none;
      }
    }

    &__group-title {
      display: flex;
      gap: 0.25rem;
      align-items: center;
      justify-content: center;
      margin-inline: auto;
    }

    &__submit-btn {
      margin-inline: auto;
      margin-block-start: calc(var(--spacer) * 1.5 );
      margin-block-end: calc(var(--spacer) / 2);
      width: max-content;
    }
  }
</style>