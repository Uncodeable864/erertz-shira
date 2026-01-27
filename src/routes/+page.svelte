<script lang="ts">
	let { data } = $props();
	const { poems } = data;
</script>

<svelte:head>
	<title>Eretz Shira — Hebrew Poetry</title>
</svelte:head>

<main>
	<div class="he-en-group">
		<h1>Eretz Shira</h1>
		<h1 class="l-hebrew">ארץ שירה</h1>
	</div>

	<div class="poem-list">
		{#each poems as poem}
			<a href="/poem/{poem.id}" class="poem-card">
				<div class="he-en-group">
					<h2 dir="ltr"><i>{poem.title}</i></h2>
					<h2 class="l-hebrew">{poem.hebrewTitle}</h2>
				</div>
				<div class="he-en-group">
					<p>{poem.author.en}</p>
					<p class="l-hebrew">{poem.author.he}</p>
				</div>
			</a>
		{/each}
	</div>
</main>

<style>
	main {
		max-width: 900px;
		margin: 0 auto;
		padding: 3rem 2rem;
	}

	h1 {
		text-align: center;
		margin-bottom: 0.75rem;
		font-family: var(--font-display);
		font-size: 2.5rem;
		font-weight: 600;
		color: var(--brand-primary);
		letter-spacing: -0.01em;
	}

	.poem-list {
		display: grid;
		gap: 1.5rem;
		margin-top: 3rem;
	}

	.poem-card {
		display: block;
		padding: 2rem;
		background: rgba(255, 255, 255, 0.7);
		border: 1px solid var(--divider-primary);
		border-radius: 8px;
		text-decoration: none;
		color: inherit;
		transition: var(--transition-base);
		box-shadow: var(--shadow-sm);
		position: relative;
		overflow: hidden;
	}

	/* Subtle decorative accent */
	.poem-card::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 4px;
		height: 0;
		background: linear-gradient(
			to bottom,
			var(--accent-gold),
			var(--accent-terracotta)
		);
		transition: var(--transition-base);
	}

	.poem-card:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-lg);
		border-color: var(--brand-secondary);
		background: rgba(255, 255, 255, 0.95);
	}

	.poem-card:hover::before {
		height: 100%;
	}

	.poem-card h2 {
		margin: 0 0 0.75rem 0;
		font-size: 1.4rem;
		font-family: var(--font-display);
		font-weight: 600;
		color: var(--brand-primary);
	}

	.poem-card h2 i {
		font-style: italic;
		font-weight: 500;
	}

	.poem-card p {
		margin: 0;
		text-align: left;
		color: var(--text-muted);
		font-size: 1.05rem;
	}

	.he-en-group {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 2rem;
	}

	@media (max-width: 600px) {
		main {
			padding: 2rem 1.5rem;
		}

		h1 {
			font-size: 2rem;
		}

		.poem-card {
			padding: 1.5rem;
		}

		.he-en-group {
			flex-direction: column;
			gap: 0.5rem;
			align-items: center;
		}

		.poem-card h2 {
			font-size: 1.25rem;
			text-align: center;
		}

		.poem-card p {
			text-align: center;
		}
	}
</style>
