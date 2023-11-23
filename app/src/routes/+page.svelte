<script>
	import { onMount } from 'svelte';
	import { setActiveNav } from '../lib/utils/setActiveNav.js';
	import Experience from '../components/Three/Experience.js'

	import './home.scss';

	export let data;

	onMount(() => {
    setActiveNav(window.location.pathname);
		document.body.classList.remove('-no-scroll');
		// const experience = new Experience(document.querySelector('canvas.webgl'))
  });

</script>

<section class="container">
	<canvas class="webgl"/>
	<div class="home">
		{#each data.home.qAndA as qAndA}
			<div class="q-and-a">
				<div class="question">{qAndA.question}</div>
				<div class="answer">{qAndA.answer}</div>
			</div>
		{/each}
		<a href="/blog" class="blog-entry">enter the blog</a>
	</div>
</section>
