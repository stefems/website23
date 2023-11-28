<script>
  import { PortableText } from '@portabletext/svelte';
  import { setActiveNav } from '../../lib/utils/setActiveNav.js';
  import { SyncLoader } from 'svelte-loading-spinners';
  import Head from '../../components/Head/Head.svelte';
  import { onMount } from 'svelte';
  import './work.scss';
	import BigText from '../../components/BigText/BigText.svelte';

  export let data;
  let resolvedImages = new Promise(() => '');
  let showingProfessional = true;
  let projects = data.work.professional;
  $: projects = showingProfessional ? data.work.professional : data.work.personal;

  onMount(() => {
    setActiveNav(window.location.pathname);
    document.body.classList.remove('-no-scroll');
  });

  const imageUrls = projects.map(({ mainImage }) => mainImage)
  resolvedImages = preload(imageUrls)

  function preload(images) {
    const promises = images.map((image) => {
      return new Promise((resolve) => {
          let img = new Image()
          img.onload = resolve
          img.src = image
      })
    })
    return Promise.all(promises)
  }
</script>

<div class="work-page">
  <Head data={data.work} />
  <BigText text="the work" vertical={true} spread={true}/>
  <div class="toggle">
    <button
      on:click={() => showingProfessional = !showingProfessional}
      class={"toggle-button " + (showingProfessional ? '-active' : '')}
    >
      Professional
    </button>
    <span class="middle">|</span>
    <button
      on:click={() => showingProfessional = !showingProfessional}
      class={"toggle-button " + (!showingProfessional ? '-active' : '')}
    >
      Personal
    </button>
  </div>
  <div class="projects">
    {#each projects as project, index}
      <div class={"project " + ((index + 1) % 2 === 0 ? "-right" : "")}>
        {#await resolvedImages}
          <div class="loading">
            <SyncLoader size="30" color="lime" unit="px" duration="1s" />
          </div>
        {:then}
          <img src={project.mainImage} class="project-image" alt={project.imageAlt} />
        {/await}
        <div class="info">
          <h2 class="title">{project.title}</h2>
          <span class="date">{project.date}</span>
          <div class="body">
            <PortableText value={project.body} />
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>