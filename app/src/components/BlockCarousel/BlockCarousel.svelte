<script>
  import './BlockCarousel.scss';
  import { PortableText } from '@portabletext/svelte'
  export let portableText;
  const images = portableText.value.images;
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
</script>

<div class="block-carousel">
  <button class="arrow" on:click={() => changeActive(-1)}>
    &lsaquo;
  </button>
  <img
    class="carousel-image"
    src={images[activeImageIndex].image.url}
    alt={images[activeImageIndex].alt}
  />
  {#if images[activeImageIndex].label}
    <div class="label">
      <PortableText
        value={images[activeImageIndex].label}
      />
    </div>
  {/if}
  <button class="arrow next" on:click={() => changeActive(1)}>
    &rsaquo;
  </button>
  <span class="divider">---</span>
</div>