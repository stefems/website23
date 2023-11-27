<script>
	import Header from '../components/Header/Header.svelte';
	import './layout.scss';
	export let data;
</script>

<svelte:head>
	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.description} />
	<meta property="og:image" content={data.mainImage.image} />
</svelte:head>
<div class="main-container">
	<Header />
	<main>
		<slot />
	</main>
</div>
