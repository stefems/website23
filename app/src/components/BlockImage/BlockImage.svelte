<script>
  import './BlockImage.scss';
  import { SyncLoader } from 'svelte-loading-spinners';
  import { PortableText } from '@portabletext/svelte'
  export let portableText;

  const image = portableText.value.image;
  let resolvedImage = preload(portableText.value.image)

  function preload(image) {
    return new Promise((resolve) => {
      let img = new Image()
      img.onload = resolve
      img.src = image.url
    })
  }
</script>

<div class="block-image">
  {#await resolvedImage}
    <div class="loading">
      <SyncLoader size="30" color="lime" unit="px" duration="1s" />
    </div>
  {:then}
    <img
      class="image"
      src={image.url}
      alt={portableText.value.alt}
    />
    <div class="label">
      <PortableText
        value={portableText.value.label}
      />
    </div>
  {/await}
</div>