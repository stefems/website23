<script>
	import { onMount } from 'svelte';
  import { SyncLoader } from 'svelte-loading-spinners';
  import { setActiveNav } from '../../lib/utils/setActiveNav.js';
  import BigText from '../../components/BigText/BigText.svelte'
  import './Blog.scss';
  export let posts = [];
  export let tags = [];
  let shownPosts = posts.slice(0);
  const selectOptions = [
    "recent first", "oldest first",
  ];
  let sortBy = selectOptions[1];
  let noTagsSelected = true;
  let showAddTags = false;
  let resolvedImages = new Promise(() => '');
  let activeTags = tags.reduce((reduction, current) => {
    reduction[current.title] = false;
    return reduction;
  }, {});
  onMount(() => {
    setActiveNav(window.location.pathname);
    document.body.classList.add('-no-scroll');
    const imageUrls = posts.map(({ mainImage }) => mainImage.image)
    resolvedImages = preload(imageUrls)
  });

  function toggleTags() {
    showAddTags = !showAddTags;
  }

  function toggleTag(title) {
    activeTags[title] = !activeTags[title];
    if (!Object.entries(activeTags).find(([key, value]) => value)) {
      noTagsSelected = true;
    } else {
      noTagsSelected = false;
    }
    updatePosts();
  }

  function updatePosts() {
    if (noTagsSelected) {
      shownPosts = posts.slice(0);
      return;
    }
    shownPosts = posts.filter((post) => {
      let filter = true;
      if (!post.tags || post.tags.length === 0) return false;
      for (let i = 0; i < post.tags.length; i++) {
        const tag = post.tags[i];
        if (activeTags[tag.title]) {
          filter = false;
          break;
        }
      }
      return !filter;
    });
  }

  function updateSort() {
    shownPosts = shownPosts.sort((postA, postB) => {
      const dateA = new Date(postA.date);
      const dateB = new Date(postB.date);
      if (sortBy === 'recent first') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }

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

<div class="blog-component grid">
  <BigText text={`THE BLOG`}/>
  <div class="filter-sort">
    <div class={"sort"}>
      <span class="label">sort by:</span>
      <select
        on:change={updateSort}
        bind:value={sortBy}
        class="sort-select"
      >
        {#each selectOptions as option}
          <option value={option} >{option}</option>
        {/each}
      </select>
    </div>
    <div class={"filter"}>
      <span class="label">filter via tags:</span>
      <button on:click={toggleTags} class="add-tag-button">
        <span class="plus"/>
        &nbsp;add tag
        {#if showAddTags}
          <button class="clear"/>
          <div class="add-tags-options">
            {#each tags as tag}
              <button
                on:click={() => toggleTag(tag.title)}
                class="tag-option"
              >
                {#if activeTags[tag.title]}
                  <span class="tag-check"/>
                {/if}
                  <span class="title">{tag.title}</span>
              </button>
            {/each}
          </div>
        {/if}
      </button>
      <div class="shown-tags">
        {#if !noTagsSelected}
          <span class="tags-note">only showing posts with one or more of these tags:</span>
        {/if}
        {#each Object.entries(activeTags) as tag}
          {#if tag[1]}
            <button class="shown-tag" on:click={() => toggleTag(tag[0])}>
              {tag[0]}
            </button>
          {/if}
        {/each}
      </div>
    </div>
  </div>
  <div class={"scroll-area " + (Object.entries(activeTags).length !== 0 ? '-filters-shown ' : '')}>
    <div class="posts">
      {#if !noTagsSelected && shownPosts.length === 0}
        <span class="no-posts">No posts found</span>
      {/if}
      {#each shownPosts as post}
        <a href={`/blog/${post.slug.current}`} class="post">
          {#await resolvedImages}
            <div class="loading">
              <SyncLoader size="30" color="lime" unit="px" duration="1s" />
            </div>
          {:then}
            <img alt={post.mainImage.alt} src={post.mainImage.image} class="post-image"/>
          {/await}
          <div class="post-info">
            <h2 class="post-title">{post.title}</h2>
            <p class="post-description">{post.description}</p>
            {#if post.tags}
              <div class="post-tags">
                {#each post.tags as tag}
                  <span class="post-tag">{tag.title}</span>
                {/each}
              </div>
            {/if}
            {#if post.date}
              <div class="date">
                <span class="post-date-label">posted:&nbsp;</span>
                <span class="post-date">
                  {post.date}
                </span>
              </div>
            {/if}
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>