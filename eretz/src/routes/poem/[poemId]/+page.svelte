<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { data } = $props();
	const { poem } = data; // Destructure poem from data

	interface Line {
		id: string;
		hebrew: string;
		trans: Record<string, string>;
	}

	interface Translation {
		id: string;
		name: string;
		author: string;
		copyright: string;
		infoUrl: string;
	}

	type LayoutMode = 'columns' | 'interlinear';

	let scrollY = $state(0);
	let mounted = $state(false);
	let showHebrew = $state(true);
	let showEnglish = $state(true);
	let layoutMode: LayoutMode = $state('columns');

	let currentTranslationId = $state('default'); // Default to first translation

	onMount(() => {
		mounted = true;
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	let headerTransform = $derived(`translateY(${scrollY * 0.3}px)`);
	let headerOpacity = $derived(Math.max(0, 1 - scrollY / 300));

	// Compute the current translation object
	let currentTranslation = $derived(
		poem.translations.find((t: Translation) => t.id === currentTranslationId) ||
			poem.translations[0]
	);

	function toggleHebrew() {
		showHebrew = !showHebrew;
		if (!showHebrew && !showEnglish) showEnglish = true;
	}

	function toggleEnglish() {
		showEnglish = !showEnglish;
		if (!showHebrew && !showEnglish) showHebrew = true;
	}

	function cycleLayoutMode() {
		layoutMode = layoutMode === 'columns' ? 'interlinear' : 'columns';
	}

	function getPoemClass() {
		const classes = ['poem'];
		if (!showHebrew) classes.push('hide-hebrew');
		if (!showEnglish) classes.push('hide-english');
		if (layoutMode === 'interlinear') classes.push('mode-interlinear');
		return classes.join(' ');
	}
</script>

<svelte:window bind:scrollY />

<svelte:head>
	<title>{poem.metadata.title} — Bilingual</title>
</svelte:head>

{#if mounted}
	<div>
		<header class="parallax-header" style:transform={headerTransform} style:opacity={headerOpacity}>
			<div class="header-inner">
				<h1 class="main-title">
					<span class="en">{poem.metadata.title}</span>
					<span class="he l-hebrew" dir="rtl">{poem.metadata.hebrewTitle}</span>
				</h1>
				<p class="author-meta">
					<span class="en">{poem.metadata.author.en}</span>
					<span class="he l-hebrew" dir="rtl">{poem.metadata.author.he}</span>
					<span class="info-sep">·</span>
					<a href={poem.metadata.infoUrl} target="_blank" rel="noreferrer" class="about-link"
						>About Poem</a
					>
				</p>
			</div>

			<div class="controls-container">
				<div class="view-controls">
					<button
						class:active={showHebrew}
						onclick={toggleHebrew}
						title="Toggle Hebrew"
						aria-label="Toggle Hebrew"
						class="lang-toggle"
					>
						א
					</button>
					<button
						class:active={showEnglish}
						onclick={toggleEnglish}
						title="Toggle English"
						aria-label="Toggle English"
						class="lang-toggle"
					>
						A
					</button>
					<div class="divider"></div>
					<button
						onclick={cycleLayoutMode}
						title="Change Layout ({layoutMode})"
						aria-label="Change Layout"
						class="layout-toggle"
					>
						{#if layoutMode === 'columns'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<rect x="2" y="3" width="9" height="18" rx="2" /><rect
									x="13"
									y="3"
									width="9"
									height="18"
									rx="2"
								/>
							</svg>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line
									x1="8"
									y1="18"
									x2="21"
									y2="18"
								/><line x1="3" y1="6" x2="3.01" y2="6" /><line
									x1="3"
									y1="12"
									x2="3.01"
									y2="12"
								/><line x1="3" y1="18" x2="3.01" y2="18" />
							</svg>
						{/if}
					</button>
				</div>
			</div>
		</header>

		<main>
			<div class="poem-wrapper">
				<div class="poem-meta-bar" class:stuck={scrollY > 20}>
					<div class="meta-left">
						<div class="translation-control">
							<label for="translation">Translation:</label>
							<div class="select-wrapper">
								<select bind:value={currentTranslationId} id="translation">
									{#each poem.translations as trans}
										<option value={trans.id}>{trans.name}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>
					<div class="meta-right">
						<small class="copyright-info">
							{currentTranslation.copyright}
							(<a href={currentTranslation.infoUrl} target="_blank" rel="noreferrer">Info</a>)
						</small>
					</div>
				</div>

				<section class={getPoemClass()} id="poem">
					{#key currentTranslationId}
						<div class="translation-fade-wrapper" in:fade={{ duration: 400 }}>
							{#each poem.content as stanza, sIdx}
								<div class="stanza-group">
									{#each stanza as line}
										<div class="line-grid">
											<span class="line hebrew" data-line={line.id} role="presentation">
												{line.hebrew}
											</span>
											<span class="line english" data-line={line.id} role="presentation">
												{@html line.trans[currentTranslationId as keyof typeof line.trans] ||
													line.trans['default']}
											</span>
										</div>
									{/each}
								</div>
								<div class="stanza-sep"><span class="sep-ornament">❖</span></div>
							{/each}
						</div>
					{/key}
				</section>
			</div>
		</main>
	</div>
{/if}

<style>
	/* Header and Titles */
	.parallax-header {
		text-align: center;
		padding: 4rem 1rem 3rem;
		margin-bottom: 2rem;
		transition: transform 0.1s ease-out;
		position: relative;
	}

	.main-title {
		margin: 0 0 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
	}

	.main-title .en {
		font-size: 2.8rem;
		font-weight: 800;
		color: var(--brand);
		text-shadow:
			1px 1px 0px rgba(255, 255, 255, 0.8),
			2px 2px 4px rgba(0, 0, 0, 0.05);
		letter-spacing: -0.02em;
	}

	.main-title .he {
		font-size: 2.4rem;
		color: var(--brand);
		opacity: 0.9;
		margin-top: -0.5rem;
	}

	.author-meta {
		margin: 0;
		color: var(--muted);
		font-size: 1.1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		font-style: italic;
	}

	.author-meta .he {
		font-style: normal;
		font-size: 1.25rem;
	}

	.info-sep {
		opacity: 0.5;
	}

	.about-link {
		color: var(--brand);
		text-decoration: none;
		font-size: 0.9rem;
		border-bottom: 1px solid transparent;
		transition: var(--transition);
		font-style: normal;
	}

	.about-link:hover {
		border-bottom-color: var(--brand);
		opacity: 0.8;
	}

	/* Controls Container */
	.controls-container {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
	}

	.view-controls {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		background: rgba(255, 255, 255, 0.6);
		padding: 0.25rem;
		border: 1px solid var(--divider);
		border-radius: 12px;
		box-shadow: var(--shadow-sm);
		backdrop-filter: blur(8px);
		transition: var(--transition);
	}

	.view-controls:hover {
		box-shadow: var(--shadow-md);
		border-color: var(--brand);
	}

	.view-controls button {
		width: 40px;
		height: 40px;
		border: none;
		background: transparent;
		color: var(--muted);
		border-radius: 8px;
		cursor: pointer;
		font-size: 1.1rem;
		font-weight: 600;
		transition: var(--transition);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.view-controls button:hover {
		background: rgba(255, 255, 255, 0.8);
		color: var(--brand);
		transform: scale(1.05);
	}

	.view-controls button.active {
		background: var(--brand);
		color: white;
		box-shadow: var(--shadow-sm);
		animation: pulse-active 2s infinite ease-in-out;
	}

	@keyframes pulse-active {
		0% {
			box-shadow: 0 0 0 0 rgba(44, 82, 130, 0.4);
		}
		70% {
			box-shadow: 0 0 0 10px rgba(44, 82, 130, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(44, 82, 130, 0);
		}
	}

	.divider {
		width: 1px;
		height: 20px;
		background: var(--divider);
		margin: 0 0.25rem;
	}

	/* Poem Wrapper and Meta Bar */
	.poem-wrapper {
		max-width: 1200px;
		margin: 0 auto 5rem;
		padding: 2.5rem;
		background: rgba(255, 255, 255, 0.4);
		border: 1px solid var(--divider);
		border-radius: 20px;
		box-shadow: var(--shadow-lg);
		position: relative;
	}

	.poem-wrapper::before {
		content: '';
		position: absolute;
		top: 10px;
		left: 10px;
		right: 10px;
		bottom: 10px;
		border: 1px solid rgba(44, 82, 130, 0.1);
		border-radius: 15px;
		pointer-events: none;
	}

	.poem-meta-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1.5rem;
		margin: 0 -2.5rem 3rem;
		padding: 1rem 2.5rem;
		border-bottom: 1px solid var(--divider);
		position: sticky;
		top: 0;
		z-index: 100;
		background: rgba(250, 249, 246, 0.9);
		backdrop-filter: blur(12px);
		transition: var(--transition);
	}

	.poem-meta-bar.stuck {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		border-bottom-color: rgba(44, 82, 130, 0.1);
	}

	.meta-left,
	.meta-right {
		display: flex;
		align-items: center;
	}

	.translation-control {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: var(--muted);
		font-weight: 500;
	}

	.select-wrapper select {
		font-family: inherit;
		padding: 0.5rem 2.5rem 0.5rem 1rem;
		border: 1px solid var(--divider);
		border-radius: 8px;
		background: white;
		color: var(--text);
		cursor: pointer;
		font-size: 0.95rem;
		box-shadow: var(--shadow-sm);
		transition: var(--transition);
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232C5282' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 0.75rem center;
		background-size: 1rem;
	}

	.select-wrapper select:hover {
		border-color: var(--brand);
		box-shadow: var(--shadow-md);
	}

	.copyright-info {
		color: var(--muted);
		font-size: 0.9rem;
	}

	.copyright-info a {
		color: var(--brand);
		text-decoration: none;
		font-weight: 600;
	}

	/* Poem Section */
	.poem {
		position: relative;
		z-index: 1;
		transition: var(--transition);
	}

	.line-grid {
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-content: center;
		column-gap: 3rem;
		row-gap: 0.5rem;
		max-width: 800px;
		padding: 0.1rem 0.6rem;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.line-grid:hover {
		background: var(--highlight);
		transform: scale(1.02);
		box-shadow: 0 0 15px rgba(44, 82, 130, 0.1);
		color: var(--brand);
	}
	/* Line and Hover Effects */
	.line-row {
		display: contents;
	}

	.line {
		width: fit-content;
		padding: 0.4rem 0.6rem;
		border-radius: 6px;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
		cursor: default;
		position: relative;
	}

	.line.hebrew {
		font-family: 'Frank Ruhl Libre', serif;
		direction: rtl;
		font-size: 1.35rem;
		line-height: 1.5;
		justify-self: end;
		text-align: right;
	}

	.line.english {
		font-size: 1.2rem;
		line-height: 1.5;
		justify-self: start;
		color: #4a5568;
	}

	/* Stanza Separation */
	.stanza-group {
		display: contents;
	}

	.stanza-sep {
		grid-column: 1 / -1;
		display: flex;
		justify-content: center;
		padding: 1.5rem 0;
		color: var(--divider);
		pointer-events: none;
		text-align: center;
	}

	.sep-ornament {
		font-size: 0.9rem;
		opacity: 1;
		transition: var(--transition);
		text-align: center;
	}

	/* Layout Modes */
	:global(.mode-interlinear) .line-grid {
		grid-template-columns: 1fr;
		row-gap: 2rem;
	}

	:global(.mode-interlinear) .line-row {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	:global(.mode-interlinear) .line {
		justify-self: center !important;
		align-self: center !important;
		text-align: center !important;
	}

	:global(.mode-interlinear) .line.english {
		font-size: 1.1rem;
		opacity: 0.8;
	}

	/* Monolingual Overrides */
	:global(.poem.hide-hebrew) .line-grid,
	:global(.poem.hide-english) .line-grid {
		grid-template-columns: 1fr;
		width: fit-content;
		max-width: 100%;
		margin: 0 auto;
	}

	:global(.poem.hide-hebrew) .line.english {
		justify-self: center;
		text-align: center;
	}

	:global(.poem.hide-english) .line.hebrew {
		justify-self: center;
		text-align: center;
	}

	/* Mobile Optimizations */
	@media (max-width: 768px) {
		.poem-wrapper {
			padding: 1.5rem;
			border-radius: 0;
			border-left: none;
			border-right: none;
		}

		.line-grid {
			grid-template-columns: 1fr;
			row-gap: 2rem;
		}

		.line-row {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.line {
			width: 100%;
			text-align: center !important;
			justify-self: center !important;
		}

		.main-title .en {
			font-size: 2rem;
		}
		.main-title .he {
			font-size: 1.8rem;
		}
	}
</style>
