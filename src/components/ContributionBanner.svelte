<script lang="ts">
  import { recipesData } from "../stores/formStore"
</script>

<div class="contribution" data-change-color={$recipesData.recipes.length > 0}>
  <a
    href="https://www.edamam.com/"
    target="_blank"
    aria-label="click here to go to the edamam's website"
    data-link="contribution"
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
    padding: var(--spacer);
    margin-block-start: 5rem;
    margin-inline: auto;
    width: var(--form-width);
    background-color: hsl(var(--pink-color));
    border-radius: var(--form-radius) var(--form-radius) 0 0;

    &[data-change-color="true"] {
      background-color: hsl(var(--brown-color));

      a {
        outline-color: hsl(var(--white-color));
      }
    }

    &[data-change-color="false"] img {
      filter: brightness(0.8);
    }
  }
</style>
