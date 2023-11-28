<script>
  import Blog from '../../components/Blog/Blog.svelte';
  import Head from '../../components/Head/Head.svelte';
  export let data;
</script>

<Head data={data.blog} />
<Blog posts={data.posts} tags={data.tags} />