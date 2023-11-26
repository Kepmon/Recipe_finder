<script lang="ts">
  import { isFormSubmitted } from "../stores/formStore"
</script>

<div class="contribution" data-change-color={$isFormSubmitted}>
  <a
    href="https://www.edamam.com/"
    target="_blank"
    aria-label="click here to go to the edamam's website"
  >
    <img
      src="/img/svgs/edamam_contribution.svg"
      alt="logo of edamam - the recipes data provider"
    />
  </a>
</div>

<style lang="scss">
  .contribution {
    display: grid;
    place-items: center;
    padding: 0.5rem;
    margin-inline: auto;
    width: var(--form-width);
    background-color: hsl(var(--pink-color));
    border-radius: var(--form-radius) var(--form-radius) 0 0;

    &[data-change-color="true"] {
      background-color: hsl(var(--brown-color));
    }

    &[data-change-color="false"] img {
      filter: brightness(0.8);
    }
  }
</style>
