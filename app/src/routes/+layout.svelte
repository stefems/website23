<script>
	import Header from '../components/Header/Header.svelte';
	import './layout.scss';
</script>

<div class="main-container">
	<Header />
	<main>
		<slot />
	</main>
</div>
