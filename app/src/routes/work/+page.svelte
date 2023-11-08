<script>
  import { PortableText } from '@portabletext/svelte';
  import { setActiveNav } from '../../lib/utils/setActiveNav.js';
  import { onMount } from 'svelte';
  import './work.scss';

  export let data;
  let showingProfessional = true;
  let projects = data.work.professional;
  $: projects = showingProfessional ? data.work.professional : data.work.personal;

  onMount(() => {
    setActiveNav(window.location.pathname);
    document.body.classList.remove('-no-scroll');
  });
</script>

<div class="work-page">
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
        <img src={project.mainImage} class="project-image" alt={project.imageAlt} />
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