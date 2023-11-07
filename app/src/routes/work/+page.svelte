<script>
  import { PortableText } from '@portabletext/svelte';
  import './work.scss';

  export let data;
  let showingProfessional = true;
  let projects = data.work.professional;
  $: projects = showingProfessional ? data.work.professional : data.work.personal;
  console.log(projects)
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
          <PortableText value={project.body} class="body"/>
        </div>
      </div>
    {/each}
  </div>
</div>