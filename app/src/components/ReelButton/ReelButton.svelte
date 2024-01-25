<script>
  import './ReelButton.scss';
  
  export let onClick = () => {}
  export let text = ''

</script>

<button on:click={onClick} class="button">
  <div class="dots top">
    {#each [...Array(10).keys()] as dot}
      <span class="dot" />
    {/each}
  </div>
  <span class="text">{text}</span>
  <div class="dots bottom">
    {#each [...Array(10).keys()] as dot}
      <span class="dot" />
    {/each}
  </div>
</button>