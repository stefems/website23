<script>
	import { onMount } from 'svelte';
	import { setActiveNav } from '../lib/utils/setActiveNav.js';
	import BigText from '../components/BigText/BigText.svelte';
	import './home.scss';
	import Head from '../components/Head/Head.svelte';

	export let data;

	onMount(() => {
    setActiveNav(window.location.pathname);
		document.body.classList.remove('-no-scroll');
  });

</script>

<section class="container">
	<Head data={data.home} />
	<BigText text="web site" />
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
