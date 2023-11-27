<script lang="ts">
  import DownChevron from "../components/svgs/DownChevron.svelte"
  import FormOptions from "./FormOptions.svelte"
  import { formData } from "../stores/formStore"

  const options = [
    {
      name: 'diet',
      label: "Diet Type",
      data: $formData.diet,
    },
    {
      name: 'dishType',
      label: "Dish Type",
      data: $formData.dishType,
    },
    {
      name: 'cuisineType',
      label: "Cuisine Type",
      data: $formData.cuisineType,
    },
    {
      name: 'health',
      label: "Health Label",
      data: $formData.health,
    }
  ]
</script>

{#each options as { name, label, data } (label)}
  <div class="form__group">
    <button
      on:click={() => (data.isExpanded = !data.isExpanded)}
      aria-label="click here to choose one or more options"
      aria-expanded={data.isExpanded}
      type="button"
      class="form__group-title"
    >
      {label}
      <DownChevron />
    </button>
    <FormOptions nameAttr={name} option={data} />
  </div>
{/each}
