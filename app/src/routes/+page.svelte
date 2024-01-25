<script>
	import { onMount } from 'svelte';
	import { setActiveNav } from '../lib/utils/setActiveNav.js';
	import { SyncLoader } from 'svelte-loading-spinners';
	import './home.scss';
	import { fade, slide, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Head from '../components/Head/Head.svelte';
	import ReelButton from '../components/ReelButton/ReelButton.svelte';
	import Projector from '../components/Projector/Projector.svelte';

	export let data;

	const copy = {
		"titleShowing": "Now Showing: ",
		"titleRole": "My Role: ",
		"next": "Next",
		"previous": "Prev",
		"projectorAlt": "film projector icon",
		"name": "Stefan Kowal is...",
		"info": "a tried and tested senior web developer: I can jump onto a project and immediately make crucial fixes and contributions. I can also start a project and organize delivery from beginning to end. With Stink Studios (2020 - 2023) I built and led the building of numerous web experiences. We leveraged React JS, Next JS, CMS systems (Sanity & Contentful), tons of third party services, and gallons of coffee to deliver award-winning online experiences. Our team earned a D&AD Graphite Pencil award for creating an ARG set in the Cyberpunk universe, and we reached massive audiences with Nike's Air Max Day. These experiences helped me become a pro at collaborating with the kind and wonderful design and production teams.",
		"work": "I'm looking for work! Send me an email if you're* looking for a senior web developer",
		"disclaimer": "* I'm not interested in working with Amazon, defense contractors, big social media, or web3/crypto scammers.",
		"copied": "email copied to clipboard!"
	}
	const projects = data.home.projects;
	const videos = projects.map((project) => project.video.asset.url);
	let activeVideoIndex = 0;
	let animationKey = 0;
	let copied = false

	onMount(() => {
		setActiveNav(window.location.pathname);
			document.body.classList.remove('-no-scroll');
	});

	function changeActive(change) {
		const result = activeVideoIndex + change;
		if (result < 0) {
			activeVideoIndex = videos.length - 1;
		} else if (result === videos.length) {
			activeVideoIndex = 0;
		} else {
			activeVideoIndex = result
		}
		animationKey += 1;
	}

	function copyToClipboard() {
		navigator.clipboard.writeText('kowalmax.s@gmail');
		copied = true;
	}
</script>

<section class="container">
	<Head data={data.home} />
	<div class="home">
		<div class="carousel">
			{#each videos as video, i}
				{#if activeVideoIndex === i}
					<video
						muted
						loop
						class="video"
						src={video}
						autoplay
					/>
				{/if}
			{/each}
		</div>
		<div class="info">
			<div class="top-row">
				<div class="projector">
					<Projector copy={copy}/>
				</div>
					<div
						class="text"
					>
						<span class="showingTitle">{copy.titleShowing}</span>
						<span
							class="data">{projects[activeVideoIndex].title}</span>
						<br>
						<span class="roleTitle">{copy.titleRole}</span>
						<span
							class="data">{projects[activeVideoIndex].role}</span>
				</div>
			</div>
			<div class="buttons">
				<ReelButton onClick={() => changeActive(-1)} text={copy.previous} />
				<div class="division" />
				<ReelButton onClick={() => changeActive(1)} text={copy.next} />
			</div>
		</div>
		<div class="lower">
			<div class="name">{copy.name}</div>
			<div class="detail">{copy.info}</div>
			<div class="work">{copy.work}</div>
			<button on:click={copyToClipboard}>
				<img class="mail" alt="mail icon" src="images/mail.svg" />
			</button>
			{#if copied}
				<span class="copied">{copy.copied}</span>
			{/if}
			<div class="disclaimer">{copy.disclaimer}</div>
		</div>
	</div>
</section>
