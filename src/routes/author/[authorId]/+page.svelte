<script lang="ts">
	import { Fa } from "svelte-fa";
	import { faWikipediaW } from "@fortawesome/free-brands-svg-icons";
	import { fade } from "svelte/transition";

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
					<a
						href={author.infoUrl}
						target="_blank"
						rel="noreferrer"
						title="Wikipedia"
					>
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
					<span class="poem-title-he" dir="rtl"
						>{poem.hebrewTitle}</span
					>
				</a>
			{/each}
		</div>
	</main>
</div>

<style>
	.author-page {
		max-width: 900px;
		margin: 0 auto;
		padding: 4rem 2rem;
	}

	.author-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.author-name {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 2rem;
	}

	.author-name .en {
		font-size: 3.5rem;
		font-weight: 700;
		font-family: var(--font-display);
		color: var(--brand-primary);
		line-height: 1.1;
		letter-spacing: -0.02em;
	}

	.author-name .he {
		font-size: 2.8rem;
		color: var(--brand-secondary);
		opacity: 0.9;
		font-family: var(--font-hebrew);
		font-weight: 500;
	}

	.author-bio {
		font-size: 1.2rem;
		line-height: 1.6;
		color: var(--text-secondary);
		max-width: 650px;
		margin: 0 auto;
		padding: 2rem;
		background: var(--bg-secondary);
		border-radius: 8px;
		border-left: 3px solid var(--accent-gold);
	}

	.author-bio a {
		color: var(--brand-primary);
		font-size: 0.85rem;
		display: inline-block;
		vertical-align: middle;
		opacity: 0.8;
		transition: var(--transition-fast);
	}

	.author-bio a:hover {
		opacity: 1;
		color: var(--brand-secondary);
	}

	.sep {
		margin: 0 0.5rem;
		opacity: 0.4;
		color: var(--text-light);
	}

	/* Poems Grid */
	.poems-list h2 {
		font-size: 2rem;
		margin-bottom: 2rem;
		text-align: center;
		color: var(--brand-primary);
		opacity: 0.9;
	}

	.grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		margin-top: 2rem;
	}

	.poem-card {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 2rem;
		background: rgba(255, 255, 255, 0.7);
		border-radius: 8px;
		text-decoration: none;
		color: var(--text-primary);
		transition: var(--transition-base);
		border: 1px solid var(--divider-primary);
		text-align: center;
		position: relative;
		overflow: hidden;
	}

	/* Decorative corner accent */
	.poem-card::before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 0 40px 40px 0;
		border-color: transparent var(--accent-gold) transparent transparent;
		opacity: 0;
		transition: var(--transition-base);
	}

	.poem-card:hover {
		transform: translateY(-4px);
		background: white;
		box-shadow: var(--shadow-lg);
		border-color: var(--brand-secondary);
	}

	.poem-card:hover::before {
		opacity: 0.15;
	}

	.poem-title-en {
		font-weight: 600;
		font-size: 1.3rem;
		font-family: var(--font-display);
		color: var(--brand-primary);
		font-style: italic;
	}

	.poem-title-he {
		font-family: var(--font-hebrew);
		font-size: 1.4rem;
		color: var(--text-secondary);
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.author-page {
			padding: 2.5rem 1rem;
		}

		.author-header {
			margin-bottom: 3rem;
		}

		.author-name {
			margin-bottom: 1.5rem;
		}

		.author-name .en {
			font-size: 2.5rem;
		}

		.author-name .he {
			font-size: 2rem;
		}

		.author-bio {
			font-size: 1.1rem;
			padding: 1.5rem;
		}

		.grid {
			grid-template-columns: 1fr;
			gap: 1.25rem;
			margin-top: 1.5rem;
		}

		.poem-card {
			padding: 1.5rem;
			min-height: 44px;
		}

		.poem-title-en {
			font-size: 1.2rem;
		}

		.poem-title-he {
			font-size: 1.25rem;
		}
	}

	@media (max-width: 480px) {
		.author-page {
			padding: 2rem 0.75rem;
		}

		.author-name .en {
			font-size: 2rem;
		}

		.author-name .he {
			font-size: 1.6rem;
		}

		.author-bio {
			font-size: 1rem;
			padding: 1.25rem;
		}

		.poem-card {
			padding: 1.25rem 1rem;
			gap: 0.5rem;
		}

		.poem-title-en {
			font-size: 1.1rem;
		}

		.poem-title-he {
			font-size: 1.15rem;
		}
	}

	main {
		padding: 0 1rem 3rem;
	}
</style>
