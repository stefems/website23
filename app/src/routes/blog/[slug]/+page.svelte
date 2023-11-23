<script>
	import './post.scss';
	import { PortableText } from '@portabletext/svelte'
	import BlockCarousel from '../../../components/BlockCarousel/BlockCarousel.svelte'
	import BlockImage from '../../../components/BlockImage/BlockImage.svelte'
	export let data;
	console.log(data)
</script>

<section class="page-post">
	<img alt={data.mainImage.alt} src={data.mainImage.image} class="post-image"/>
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
