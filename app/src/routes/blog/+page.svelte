<script>
  import Blog from '../../components/Blog/Blog.svelte';
  export let data;
</script>

<Blog posts={data.posts} tags={data.tags} />