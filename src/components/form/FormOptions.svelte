<script lang="ts">
  type Option = {
    isExpanded: boolean;
    items: string[];
  };

  export let nameAttr: string;
  export let option: Option;
</script>

{#if option.items.length > 0}
  <div data-expanded={option.isExpanded} class="items-wrapper">
    <ul>
      {#each option.items as item, index (item)}
        <li>
          <input
            type="checkbox"
            name={`${nameAttr}-${index}`}
            id={item}
            tabindex={option.isExpanded ? 0 : -1}
          />
          <label for={item}>
            {item}
          </label>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style lang="scss">
  .items-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--transition-duration);

    &[data-expanded="true"] {
      grid-template-rows: 1fr;

      ul {
        margin-block-start: var(--half-spacer);
        padding-block: calc(var(--spacer) / 4);
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      gap: var(--half-spacer);
      justify-content: center;
      overflow: hidden;

      li {
        position: relative;
        isolation: isolate;
        padding: 0.25em 1.5em;
        
        > * {
          cursor: pointer;
        }
      }

      label {
        font-size: 0.85em;
      }

      input[type="checkbox"] {
        position: absolute;
        inset: 0;
        border-radius: 100vmax;
        background-color: hsl(var(--yellow-color));
        z-index: -1;
        appearance: none;
      }

      input[type="checkbox"]:checked {
        background-color: hsl(var(--black-color));
      }

      input[type="checkbox"]:checked + label {
        color: hsl(var(--white-color));
      }

      input[type="checkbox"]:focus-visible {
        outline: 2px solid hsl(var(--black-color));
      }
    }
  }
</style>
