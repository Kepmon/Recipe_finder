<script lang="ts">
  import DownChevron from '../components/svgs/DownChevron.svelte'
  import FormOptions from "./FormOptions.svelte"
  import { formData } from "../stores/formData"

  const options = [
    {
      label: 'Diet Type',
      data: $formData.dietType
    },
    {
      label: 'Dish Type',
      data: $formData.dishType
    },
    {
      label: 'Cuisine Type',
      data: $formData.cuisineType
    },
    {
      label: 'Health Label',
      data: $formData.healthLabel
    }
  ]
</script>


{#each options as { label, data }}
  <div class="form__group">
    <button
      on:click={() => data.isExpanded = !(data.isExpanded)}
      aria-label="click here to choose one or more options"
      aria-expanded={data.isExpanded}
      type="button"
      class="form__group-title"
    >
      {label}
      <DownChevron />
    </button>
    <FormOptions options={data} />
  </div>
{/each}