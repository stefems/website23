<script>
	import Header from '../components/Header/Header.svelte';
	import './layout.scss';
	export let data;
</script>

<svelte:head>
	{#if data && data.title && data.description && data.mainImage}
		<meta property="og:url" content={`https://www.stefankowal.com/blog/${data.slug}`} />
		<meta property="twitter:url" content={`https://www.stefankowal.com/blog/${data.slug}`} />
		<meta name="twitter:image" content={data.mainImage.image} />
		<meta property="og:title" content={data.title} />
		<meta property="og:description" content={data.description} />
		<meta property="og:image" content={data.mainImage.image} />
	{/if}
</svelte:head>
<div class="main-container">
	<Header />
	<main>
		<slot />
	</main>
</div>
