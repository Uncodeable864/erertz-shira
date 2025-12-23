<script lang="ts">
	import { Fa } from 'svelte-fa';
	import { faWikipediaW } from '@fortawesome/free-brands-svg-icons';
	import { fade } from 'svelte/transition';

	let { data } = $props();
	const { author } = data;
</script>

<svelte:head>
	<title>{author.name.en} | Eretz Shira</title>
</svelte:head>

<div class="author-page" in:fade>
	<header class="author-header">
		<h1 class="author-name">
			<span class="en">{author.name.en}</span>
			<span class="he" dir="rtl">{author.name.he}</span>
		</h1>
		<div class="author-bio">
			<p>
				{author.description}
				{#if author.infoUrl}
					<span class="sep">·</span>
					<a href={author.infoUrl} target="_blank" rel="noreferrer" title="Wikipedia">
						<Fa icon={faWikipediaW} />
					</a>
				{/if}
			</p>
		</div>
	</header>

	<main class="poems-list">
		<div class="grid">
			{#each author.poems as poem}
				<a href="/poem/{poem.id}" class="poem-card">
					<span class="poem-title-en">{poem.title}</span>
					<span class="poem-title-he" dir="rtl">{poem.hebrewTitle}</span>
				</a>
			{/each}
		</div>
	</main>
</div>

<style>
	.author-page {
		max-width: 800px;
		margin: 0 auto;
		padding: 4rem 1.5rem;
	}

	.author-header {
		text-align: center;
	}

	.author-name {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.author-name .en {
		font-size: 3rem;
		font-weight: 800;
		color: var(--brand);
		line-height: 1.1;
	}

	.author-name .he {
		font-size: 2.5rem;
		color: var(--brand);
		opacity: 0.8;
		font-family: 'Frank Ruhl Libre', serif;
	}

	.author-bio {
		font-size: 1.2rem;
		line-height: 1.6;
		color: var(--text);
		max-width: 600px;
		margin: 0 auto;
	}

	.author-bio a {
		color: var(--brand);
		font-size: 0.75rem;
		display: inline-block;
		vertical-align: middle;
		opacity: 0.7;
		transition: opacity 0.2s;
	}

	.author-bio a:hover {
		opacity: 1;
	}

	.sep {
		margin: 0 0.25rem;
		opacity: 0.4;
	}

	/* Poems Grid */
	.poems-list h2 {
		font-size: 2rem;
		margin-bottom: 2rem;
		text-align: center;
		color: var(--brand);
		opacity: 0.9;
	}

	.grid {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		margin-top: 2rem;
	}

	.poem-card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.6);
		border-radius: 12px;
		text-decoration: none;
		color: var(--text);
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		border: 1px solid rgba(44, 82, 130, 0.1);
		text-align: center;
	}

	.poem-card:hover {
		transform: translateY(-4px);
		background: white;
		box-shadow: 0 10px 20px rgba(44, 82, 130, 0.1);
		border-color: rgba(44, 82, 130, 0.3);
	}

	.poem-title-en {
		font-weight: 700;
		font-size: 1.2rem;
		color: var(--brand);
	}

	.poem-title-he {
		font-family: 'Frank Ruhl Libre', serif;
		font-size: 1.3rem;
		color: var(--muted);
	}

	@media (max-width: 600px) {
		.author-name .en {
			font-size: 2.5rem;
		}
		.author-name .he {
			font-size: 2rem;
		}
	}

	main {
		padding: 0 1rem 3rem;
	}
</style>
