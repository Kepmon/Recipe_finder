<script lang="ts">
  import CloseIcon from "../svgs/CloseIcon.svelte";
  import { formData } from "../../stores/formStore";
  import { scale } from "svelte/transition";
  import { nanoid } from "nanoid";
  import { isFormSubmitted } from '../../stores/formStore'

  $: isNewInputAdded = false

  const addNewInput = () => {
    isNewInputAdded = true
    $formData.ingredients = [
      ...$formData.ingredients,
      {
        name: "",
        id: nanoid(),
      },
    ];
  };

  const removeInput = (inputID: string) => {
    const indexOfRemovedInput = $formData.ingredients.findIndex(({ id }) => id === inputID)

    $formData.ingredients = $formData.ingredients.filter(
      ({ id }) => inputID !== id,
    );

    addFocusToAnotherRemoveBtn(indexOfRemovedInput)
  };

  const addFocusToNewInput = (input: HTMLInputElement) => {
    if (isNewInputAdded) {
      input.focus();
    }
  }

  const addFocusToAnotherRemoveBtn = (indexOfRemovedInput: number) => {
    const removeBtns = [
      ...document.querySelectorAll('[data-button="remove-ingredient"]')
    ] as HTMLButtonElement[]

    if (indexOfRemovedInput === 0 && removeBtns.length === 1) {
      const addNewIngredientBtn = document.querySelector(
        '[data-button="add-ingredient"]'
      ) as null | HTMLButtonElement

      if (addNewIngredientBtn != null) addNewIngredientBtn.focus()
      return
    }

    if (indexOfRemovedInput === 0) {
      if (removeBtns[1] != null) removeBtns[1].focus()
      return
    }

    if (removeBtns[indexOfRemovedInput - 1] != null) {
      removeBtns[indexOfRemovedInput - 1].focus()
    }
  }
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
          data-button="remove-ingredient"
        >
          <CloseIcon />
        </button>
      </div>
    {/each}
    <button
      on:click={addNewInput}
      disabled={$isFormSubmitted}
      type="button"
      class="add-more bigger-btn-padding scale-on-hover"
      data-button="add-ingredient"
    >
      Add more ingredients
    </button>
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
