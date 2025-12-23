<script lang="ts">
	import { onMount } from 'svelte';

	let { data } = $props();
	const { poem } = data; // Destructure poem from data

	type ViewMode = 'both' | 'hebrew' | 'english';

	let viewMode: ViewMode = $state('both');
	let highlightedLine: string | null = $state(null);
	let currentTranslationId = $state('default'); // Default to first translation

	// Compute the current translation object
	let currentTranslation = $derived(
		poem.translations.find((t) => t.id === currentTranslationId) || poem.translations[0]
	);

	function setViewMode(mode: ViewMode) {
		viewMode = mode;
	}

	function handleMouseEnter(lineId: string) {
		highlightedLine = lineId;
	}

	function handleMouseLeave() {
		highlightedLine = null;
	}

	function getPoemClass() {
		if (viewMode === 'hebrew') return 'poem hide-english';
		if (viewMode === 'english') return 'poem hide-hebrew';
		return 'poem';
	}
</script>

<svelte:head>
	<title>{poem.metadata.title} — Bilingual</title>
</svelte:head>

<header>
	<h1>{poem.metadata.title}</h1>
	<p>
		{poem.metadata.author.en} ({poem.metadata.author.he}) ·
		<a href={poem.metadata.infoUrl} target="_blank" rel="noreferrer">About Poem</a>
	</p>

	<div class="controls">
		<button id="both" class:active={viewMode === 'both'} onclick={() => setViewMode('both')}>
			Hebrew + English
		</button>
		<button id="he" class:active={viewMode === 'hebrew'} onclick={() => setViewMode('hebrew')}>
			Hebrew only
		</button>
		<button id="en" class:active={viewMode === 'english'} onclick={() => setViewMode('english')}>
			English only
		</button>
		<select bind:value={currentTranslationId} id="translation">
			{#each poem.translations as trans}
				<option value={trans.id}>{trans.name}</option>
			{/each}
		</select>
	</div>
	<div class="meta-info">
		<small>
			Translation: {currentTranslation.copyright}
			(<a href={currentTranslation.infoUrl} target="_blank" rel="noreferrer">Info</a>)
		</small>
	</div>
</header>

<main>
	<section class={getPoemClass()} id="poem">
		<!-- Line-aligned layout: each row is a paired line -->
		<div class="line-grid">
			{#each poem.content as stanza}
				<div class="stanza-group">
					{#each stanza as line}
						<div class="line-row">
							<span
								class="line hebrew"
								class:highlight={highlightedLine === line.id}
								data-line={line.id}
								onmouseenter={() => handleMouseEnter(line.id)}
								onmouseleave={handleMouseLeave}
								role="presentation"
							>
								{line.hebrew}
							</span>
							<span
								class="line english"
								class:highlight={highlightedLine === line.id}
								data-line={line.id}
								onmouseenter={() => handleMouseEnter(line.id)}
								onmouseleave={handleMouseLeave}
								role="presentation"
							>
								<!-- Access the specific translation for this line -->
								{@html line.trans[currentTranslationId as keyof typeof line.trans] ||
									line.trans['default']}
							</span>
						</div>
					{/each}
				</div>
				<!-- Visual separator between stanzas if needed, though grid gap might suffice -->
				<div class="stanza-separator"></div>
			{/each}
		</div>
	</section>
</main>

<style>
	/* Add basic styling for the new metadata info */
	.meta-info {
		margin-top: 0.5rem;
		opacity: 0.8;
	}
	/* Ensure stanzas are visually distinct if we have multiple */
	.stanza-group {
		display: contents; /* Keep the grid layout flowing */
	}
	.stanza-separator {
		grid-column: 1 / -1;
		height: 1.5rem; /* Space between stanzas */
	}
	/* Reset grid gap for rows if needed, but existing CSS probably handles .line-grid */
</style>
