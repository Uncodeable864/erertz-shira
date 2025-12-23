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
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		text-align: center;
		margin-bottom: 0.5rem;
	}

	.poem-list {
		display: grid;
		gap: 1rem;
	}

	.poem-card {
		display: block;
		padding: 1.5rem;
		margin: 0 -1.5rem;
		border: 1px solid var(--divider);
		border-radius: 8px;
		text-decoration: none;
		color: inherit;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.poem-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		border-color: var(--divider);
	}

	.poem-card h2 {
		margin: 0 0 0.5rem 0;
		font-size: 1.25rem;
	}

	.poem-card p {
		margin: 0;
		text-align: left;
		color: var(--muted);
	}
</style>
