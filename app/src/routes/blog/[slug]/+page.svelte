<script>
	import './post.scss';
	import { onMount } from 'svelte';
	import Head from '../../../components/Head/Head.svelte';
	import { SyncLoader } from 'svelte-loading-spinners';
	import { setActiveNav } from '../../../lib/utils/setActiveNav.js';
	import { PortableText } from '@portabletext/svelte'
	import BlockCarousel from '../../../components/BlockCarousel/BlockCarousel.svelte'
	import BlockImage from '../../../components/BlockImage/BlockImage.svelte'
	import BigText from '../../../components/BigText/BigText.svelte';
	export let data;

	onMount(() => {
    setActiveNav('/');
		document.body.classList.remove('-no-scroll');
  });

	function preload(image) {
		return new Promise((resolve) => {
			let img = new Image()
			img.onload = resolve
			img.src = image
		})
  }
	const loadedMainImage = preload(data.mainImage.image)

</script>

<section class="page-post">
	<Head data={data} />
	<BigText text={data.title} vertical={true}/>
	{#await loadedMainImage}
		<div class="loading">
			<SyncLoader size="30" color="lime" unit="px" duration="1s" />
		</div>
	{:then}
		<img alt={data.mainImage.alt} src={data.mainImage.image} class="post-image"/>
	{/await}
	{#if data.mainImage.label}
		<div class="main-attribution">
			<PortableText
				value={data.mainImage.label}
			/>
		</div>
	{/if}
	<h1 class="title">{data.title}</h1>
	{#if data.date}
		<div class="date">
			<span class="post-date-label">posted:&nbsp;</span>
			<span class="post-date">
				{data.date}
			</span>
		</div>
	{/if}
	{#if data.tags}
		<div class="post-tags">
			{#each data.tags as tag}
				<span class="post-tag">{tag.title}</span>
			{/each}
		</div>
	{/if}
	{#if data.body}
		<div class="body">
			<PortableText
				value={data.body}
				components={{
					types: {
						blockImage: BlockImage,
						blockCarousel: BlockCarousel
					}
				}}
			/>
		</div>
	{/if}
</section>
