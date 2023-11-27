<script>
  import './BlockCarousel.scss';
  import { SyncLoader } from 'svelte-loading-spinners';
  import { PortableText } from '@portabletext/svelte'
  export let portableText;
  const images = portableText.value.images;
  let resolvedImages = preload(images)
  let activeImageIndex = 0;
  function changeActive(change) {
    const result = activeImageIndex + change;
    if (result < 0) {
      activeImageIndex = images.length - 1;
    } else if (result === images.length) {
      activeImageIndex = 0;
    } else {
      activeImageIndex = result
    }
  }

  function setActive(index) {
    activeImageIndex = index;
  }

  function preload(images) {
    const promises = images.map(({ image }) => {
      return new Promise((resolve) => {
        let img = new Image()
        img.onload = resolve
        img.src = image.url
      })
    })
    return Promise.all(promises)
  }
</script>

{#await resolvedImages}
  <div class="loading">
    <SyncLoader size="30" color="lime" unit="px" duration="1s" />
  </div>
{:then}
  <div class="block-carousel">
    <button class="arrow" on:click={() => changeActive(-1)}>
      &lsaquo;
    </button>
    {#each images as image, i}
      {#if activeImageIndex === i}
        <img
          class="carousel-image"
          src={image.image.url}
          alt={image.alt}
        />
        {#if images[activeImageIndex].label}
          <div class="label">
            <PortableText
              value={images[activeImageIndex].label}
            />
          </div>
        {/if}
      {/if}
    {/each}
    <button class="arrow next" on:click={() => changeActive(1)}>
      &rsaquo;
    </button>
    <div class="bubbles">
      {#each images as image, i}
        <button on:click={() => setActive(i)} class={`bubble ${i == activeImageIndex ? '-active' : ''}`} />
      {/each}
    </div>
  </div>
{/await}