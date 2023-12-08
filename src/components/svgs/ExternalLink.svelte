<script lang="ts">
  type ExternalLinkProps = {
    width: string
    stroke: string
  }
  export let externalLinkProps: ExternalLinkProps
</script>

<svg
   id="svg8"
   version="1.1"
   fill="none"
   viewBox="0 0 1.2 1.2"
   width={externalLinkProps.width}
  >
  <g
     transform="matrix(0.06,0,0,0.06,-0.12,-0.12)"
     id="g848">
    <path
       d="M 12,12 21,3"
       stroke={externalLinkProps.stroke}
       stroke-width="2"
       stroke-linecap="round"
       stroke-linejoin="round"
       id="path4" />
    <path
       d="M 11,3 H 7 C 4.79086,3 3,4.79086 3,7 v 10 c 0,2.2091 1.79086,4 4,4 h 10 c 2.2091,0 4,-1.7909 4,-4 v -4"
       stroke={externalLinkProps.stroke}
       stroke-width="2"
       stroke-linecap="round"
       id="path2" />
    <path
       d="M 21,9 V 3 h -6"
       stroke={externalLinkProps.stroke}
       stroke-width="2"
       stroke-linecap="round"
       stroke-linejoin="round"
       id="path6" />
  </g>
</svg>
