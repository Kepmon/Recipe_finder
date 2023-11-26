<script lang="ts">
  type Item = {
    name: string,
    isChosen: boolean
  }
  type Option = {
    isExpanded: boolean,
    items: Item[]
  }

  export let options: Option
</script>

{#if options.items.length > 0}
  <div data-expanded={options.isExpanded} class="items-wrapper">
    <ul>
      {#each options.items as { name, isChosen } (name)}
        <li>
          <button
            on:click={() => isChosen = !isChosen}
            tabindex={options.isExpanded ? 0 : -1}
            class:chosen-option={isChosen}
          >
            {name}
          </button>
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
        margin-block-start: calc(var(--spacer) / 2);
        padding-block: calc(var(--spacer) / 4);
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
      overflow: hidden;
    }
    
    ul button {
      font-size: 0.85em;
      font-weight: normal;
    }
  }

  .chosen-option {
    background-color: hsl(var(--black-color));
    color: hsl(var(--white-color));
  }
</style>