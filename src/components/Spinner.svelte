<div></div>

<style lang="scss">
div, div::before, div::after {
  position: relative;
  width: var(--spinner-width);
  aspect-ratio: 1;
  border-radius: 50%;
  border: var(--spinner-border) solid transparent;
  border-top-color: var(--spinner-color);
  animation: rotate 1.5s ease-in infinite;
}

div::before, div::after {
  content: '';
  position: absolute;
  inset: calc(var(--spinner-border) * -1);
}

div::before {
  border-left-color: var(--spinner-color);
  animation-duration: 1s;
}

div::after {
  border-right-color: var(--spinner-color);
  animation-duration: 2s;
}

@keyframes rotate {
  100% {
    rotate: 1turn;
  }
}
</style>