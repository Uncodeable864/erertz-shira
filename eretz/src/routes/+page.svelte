<script lang="ts">
	let { data } = $props();
	const { poems } = data;
</script>

<svelte:head>
	<title>Eretz Shira — Hebrew Poetry</title>
</svelte:head>

<main>
	<h1>Eretz Shira</h1>
	<p>A collection of Hebrew poetry.</p>

	<div class="poem-list">
		{#each poems as poem}
			<a href="/poem/{poem.id}" class="poem-card">
				<h2>{poem.title}</h2>
				<p>{poem.author.en} · {poem.hebrewTitle}</p>
			</a>
		{/each}
	</div>
</main>

<style>
	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	h1 {
		text-align: center;
		margin-bottom: 0.5rem;
	}

	p {
		text-align: center;
		color: #666;
		margin-bottom: 2rem;
	}

	.poem-list {
		display: grid;
		gap: 1rem;
	}

	.poem-card {
		display: block;
		padding: 1.5rem;
		border: 1px solid #ddd;
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
		border-color: #bbb;
	}

	.poem-card h2 {
		margin: 0 0 0.5rem 0;
		font-size: 1.25rem;
	}

	.poem-card p {
		margin: 0;
		text-align: left;
		color: #555;
	}
</style>
