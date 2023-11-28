<script>
  export let data;
  const isBlogPost = data.slug !== undefined;
	const image = isBlogPost ? data.mainImage.image :data.ogImage;
	const description = isBlogPost ? data.description : data.ogDescription;
	const title = isBlogPost ? data.title : data.ogTitle 
	const url = isBlogPost ? `https://www.stefankowal.com/blog/${data.slug.current}` : (data._type === 'home' ? '/' : data._type);
</script>
<svelte:head>
	<meta property="og:url" content={url} />
	<meta property="twitter:url" content={url} />

	<meta name="twitter:image" content={image} />
	<meta name="facebook:image" content={image} />
	<meta property="og:image" content={image} />

	<meta property="og:description" content={description} />
  <meta name="description" content={description}>
  <meta name="twitter:description" content={description}>

	<meta property="og:title" content={title} />
  <meta name="twitter:title" content={title}>
</svelte:head>