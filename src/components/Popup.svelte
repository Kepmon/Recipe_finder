<script lang="ts">
  import { recipesError } from '../stores/formStore'
  import { slide } from 'svelte/transition'

  const focusPopup = (popup: HTMLElement) => {
    popup.focus()

    setTimeout(() => {
      popup.blur()
    }, 100)
  }
</script>

{#if $recipesError !== ''}
  <div use:focusPopup transition:slide tabindex="-1">
    {#if $recipesError === 'sth-wrong'}
      <p>Ooops, something went wrong...</p>
      <p>Try again later</p>
    {/if}
    {#if $recipesError === 'no-results'}
      <p>No results have been found...</p>
      <p>Try search for another query</p>
    {/if}
  </div>
{/if}

<style lang="scss">
  div {
    --distance: 2rem;
    position: fixed;
    top: var(--distance);
    right: min(var(--distance), 5%);
    padding: 0.75rem;
    width: min(90%, 16em);
    background-color: hsl(var(--red-color));
    color: hsl(var(--white-color));
    text-wrap: balance;
    border-radius: 0.5em;
    z-index: 100;

    &:focus-visible {
      outline: 2px solid transparent;
    }
    
    p:first-child {
      font-weight: 500;
    }
    
    p:not(:first-child) {
      font-size: 0.9em;
    }
  }
</style>
