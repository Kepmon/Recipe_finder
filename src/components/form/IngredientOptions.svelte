<script lang="ts">
  import CloseIcon from "../svgs/CloseIcon.svelte";
  import { formData } from "../../stores/formStore";
  import { scale } from "svelte/transition";
  import { nanoid } from "nanoid";
  import { isFormSubmitted } from '../../stores/formStore'

  const addNewInput = () => {
    $formData.ingredients = [
      ...$formData.ingredients,
      {
        name: "",
        id: nanoid(),
      },
    ];
  };

  const removeInput = (inputID: string) => {
    $formData.ingredients = $formData.ingredients.filter(
      ({ id }) => inputID !== id,
    );
  };

  const addFocusToNewInput = (input: HTMLInputElement) => {
    if ($formData.ingredients.length > 1) {
      input.focus();
    }
  };
</script>

<div class="form__group">
  <p class="form__input-label">Ingredients</p>
  <div class="form__ingredient-inputs">
    {#each $formData.ingredients as ingredient (ingredient.id)}
      <div class="form__ingredient-input">
        <input
          use:addFocusToNewInput
          transition:scale={{ duration: 150 }}
          bind:value={ingredient.name}
          type="text"
          name={`ingredients-${ingredient.id}`}
          class="main__form-option-input"
        />
        <button
          on:click={() => removeInput(ingredient.id)}
          aria-label="click here to remove this field"
          type="button"
        >
          <CloseIcon />
        </button>
      </div>
    {/each}
    <button
      on:click={addNewInput}
      disabled={$isFormSubmitted}
      type="button"
      class="add-more bigger-btn-padding scale-on-hover">Add more ingredients</button
    >
  </div>
</div>

<style lang="scss">
  .form {
    &__input-label,
    &__ingredient-inputs > * {
      margin-block-end: var(--spacer);
    }

    &__ingredient-inputs {
      display: inline-grid;
    }

    &__ingredient-inputs > :last-child {
      display: block;
      margin-inline: auto;
      margin-block-end: var(--half-spacer);
    }

    &__ingredient-input {
      --close-icon-width: 0.9rem;
      display: inline-flex;
      align-items: center;

      button {
        all: initial;
        display: grid;
        translate: 0.25em 0;
        padding: var(--half-spacer);
        border-radius: 4px;
        cursor: pointer;

        &:focus-visible {
          outline: 2px solid hsl(var(--black-color));
        }
      }
    }
  }
</style>
