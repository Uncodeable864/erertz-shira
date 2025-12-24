<script lang="ts">
	import { Fa } from "svelte-fa";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { faWikipediaW } from "@fortawesome/free-brands-svg-icons";

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

	type LayoutMode = "columns" | "interlinear";

	let scrollY = $state(0);
	let mounted = $state(false);
	let showHebrew = $state(true);
	let showEnglish = $state(true);
	let layoutMode: LayoutMode = $state("columns");

	let currentTranslationId = $state("default"); // Default to first translation

	onMount(() => {
		mounted = true;
		if (window.innerWidth < 768) {
			layoutMode = "interlinear";
		}
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});

	// Compute the current translation object
	let currentTranslation = $derived(
		poem.translations.find(
			(t: Translation) => t.id === currentTranslationId,
		) || poem.translations[0],
	);

	// Compute global line numbers
	let lineNumberMap = $derived.by(() => {
		const map = new Map<string, number>();
		let count = 1;
		for (const stanza of poem.content) {
			for (const line of stanza) {
				map.set(line.id, count++);
			}
		}
		return map;
	});

	function toggleHebrew() {
		showHebrew = !showHebrew;
		if (!showHebrew && !showEnglish) showEnglish = true;
	}

	function toggleEnglish() {
		showEnglish = !showEnglish;
		if (!showHebrew && !showEnglish) showHebrew = true;
	}

	function cycleLayoutMode() {
		layoutMode = layoutMode === "columns" ? "interlinear" : "columns";
	}

	function getPoemClass() {
		const classes = ["poem"];
		if (!showHebrew) classes.push("hide-hebrew");
		if (!showEnglish) classes.push("hide-english");
		if (layoutMode === "interlinear") classes.push("mode-interlinear");
		return classes.join(" ");
	}
</script>

<svelte:window bind:scrollY />

<svelte:head>
	<title>{poem.metadata.title} — Bilingual</title>
</svelte:head>

{#if mounted}
	<div>
		<header>
			<div class="header-inner">
				<h1 class="main-title he-en-group">
					<span class="he l-hebrew" dir="rtl"
						>{poem.metadata.hebrewTitle}</span
					>
					<span class="en">{poem.metadata.title}</span>
				</h1>
				<p class="author-meta">
					<a
						href="/author/{poem.metadata.author.id}"
						class="author-link he l-hebrew"
						dir="rtl">{poem.metadata.author.he}</a
					>
					<span class="en-group">
						<a
							href="/author/{poem.metadata.author.id}"
							class="author-link en">{poem.metadata.author.en}</a
						>
					</span>
				</p>
			</div>
		</header>

		<main>
			<div class="poem-wrapper">
				{#if poem.metadata.description || poem.metadata.author.description}
					<div class="context-info">
						{#if poem.metadata.description}
							<div class="poem-desc">
								<p>
									{poem.metadata.description}
									{#if poem.metadata.infoUrl}
										<span class="info-sep" />
										<a
											href={poem.metadata.infoUrl}
											target="_blank"
											rel="noreferrer"
											class="about-link"
											aria-label="Wikipedia Link"
											><Fa icon={faWikipediaW} /></a
										>
									{/if}
								</p>
							</div>
						{/if}
						{#if poem.metadata.author.description}
							<div class="author-desc">
								<p>
									{poem.metadata.author.description}
									{#if poem.metadata.author.infoUrl}
										<span class="info-sep" />
										<a
											href={poem.metadata.author.infoUrl}
											target="_blank"
											rel="noreferrer"
											class="about-link"
											aria-label="Wikipedia Link"
											><Fa icon={faWikipediaW} /></a
										>
									{/if}
								</p>
							</div>
						{/if}
					</div>
				{/if}

				<div class="poem-meta-bar" class:stuck={scrollY > 20}>
					<div class="meta-left">
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
								{#if layoutMode === "columns"}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<rect
											x="2"
											y="3"
											width="9"
											height="18"
											rx="2"
										/><rect
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
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<line
											x1="8"
											y1="6"
											x2="21"
											y2="6"
										/><line
											x1="8"
											y1="12"
											x2="21"
											y2="12"
										/><line
											x1="8"
											y1="18"
											x2="21"
											y2="18"
										/><line
											x1="3"
											y1="6"
											x2="3.01"
											y2="6"
										/><line
											x1="3"
											y1="12"
											x2="3.01"
											y2="12"
										/><line
											x1="3"
											y1="18"
											x2="3.01"
											y2="18"
										/>
									</svg>
								{/if}
							</button>
						</div>

						<div class="meta-sep"></div>

						<div class="translation-control">
							<label for="translation">Translation:</label>
							<div class="select-wrapper">
								<select
									bind:value={currentTranslationId}
									id="translation"
								>
									{#each poem.translations as trans}
										<option value={trans.id}
											>{trans.name}</option
										>
									{/each}
								</select>
							</div>
						</div>
					</div>
					<div class="meta-right">
						<small class="copyright-info">
							Translation (c): {currentTranslation.copyright}
							(<a
								href={currentTranslation.infoUrl}
								target="_blank"
								rel="noreferrer">View</a
							>)
						</small>
					</div>
				</div>

				<section class={getPoemClass()} id="poem">
					{#key currentTranslationId}
						<div
							class="translation-fade-wrapper"
							in:fade={{ duration: 400 }}
						>
							{#each poem.content as stanza, sIdx}
								<div class="stanza-group">
									{#each stanza as line}
										{@const currentTrans =
											line.trans[currentTranslationId]}
										<div
											class="line-grid"
											class:centered-hebrew={!currentTrans}
										>
											<span class="line-number"
												>{lineNumberMap.get(
													line.id,
												)}</span
											>
											<span
												class="line hebrew"
												data-line={line.id}
												role="presentation"
											>
												{line.hebrew}
											</span>
											{#if currentTrans}
												<span
													class="line english"
													data-line={line.id}
													role="presentation"
												>
													{@html currentTrans}
												</span>
											{/if}
										</div>
										{#if layoutMode === "interlinear"}
											<div class="intl-seperator"></div>
										{/if}
									{/each}
								</div>
								<div class="stanza-sep">
									<span class="sep-ornament">❖</span>
								</div>
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
		max-width: 1000px;
		margin: 0 auto 1.5rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		align-items: baseline;
	}

	.main-title .en {
		font-size: 2.8rem;
		font-weight: 800;
		color: var(--brand);
		text-shadow:
			1px 1px 0px rgba(255, 255, 255, 0.8),
			2px 2px 4px rgba(0, 0, 0, 0.05);
		letter-spacing: -0.02em;
		justify-self: start;
		text-align: left;
	}

	.main-title .he {
		font-size: 2.4rem;
		color: var(--brand);
		text-shadow:
			1px 1px 0px rgba(255, 255, 255, 0.8),
			2px 2px 4px rgba(0, 0, 0, 0.05);

		margin-top: -0.5rem;
		justify-self: end;
		text-align: right;
	}

	.author-meta {
		margin: 0 auto 3rem;
		font-size: 1.1rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		max-width: 1000px;
		align-items: center;
	}

	.author-meta .he {
		font-style: normal;
		font-size: 1.25rem;
		justify-self: end;
		text-align: right;
	}

	.author-meta .en-group {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		justify-self: start;
		text-align: left;
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
	.view-controls {
		display: flex;
		align-items: center;
		padding: 0.15rem;
		background: rgba(255, 255, 255, 0.4);
		border-radius: 8px;
		border: 1px solid var(--divider);
	}

	.view-controls:hover {
		background: rgba(255, 255, 255, 0.8);
		border-color: var(--brand);
	}

	.view-controls button {
		width: 32px;
		height: 32px;
		border: none;
		background: transparent;
		color: var(--muted);
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.95rem;
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
		box-shadow: var(--shadow-lg);
		position: relative;
	}

	.poem-wrapper::before {
		content: "";
		position: absolute;
		top: 10px;
		left: 10px;
		right: 10px;
		bottom: 10px;
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
		gap: 1.25rem;
	}

	.meta-sep {
		width: 1px;
		height: 24px;
		background: var(--divider);
		margin: 0 0.25rem;
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

	.author-link {
		text-decoration: none;
		color: inherit;
		transition: opacity 0.2s;
	}

	.author-link:hover {
		opacity: 0.7;
	}

	/* Context Info */
	.context-info {
		margin: 0 0 3rem 0;
		text-align: left;
		color: var(--text);
		line-height: 1.6;
	}

	.context-info .about-link {
		font-size: 0.75rem;
		vertical-align: middle;
	}

	.poem-desc {
		font-size: 1rem;
		margin-bottom: 1.5rem;
	}

	.author-desc {
		font-size: 1rem;
	}

	.context-info p {
		margin: 0;
	}

	.context-info .info-sep {
		margin: 0 0.25rem;
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
		grid-template-columns: 1fr 2rem 1fr; /* 3-column grid */
		justify-content: center;
		column-gap: 1.5rem; /* Space between number and text */
		row-gap: 0.5rem;
		max-width: 1000px;
		padding: 0.1rem 0.6rem;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
		/* Baseline removed for better vertical centering of numbers */
	}

	.line-grid:hover {
		background: var(--highlight);
		transform: scale(1.02);
		box-shadow: 0 0 15px rgba(44, 82, 130, 0.1);
		color: var(--brand);
	}

	/* Centered Hebrew (Missing Translation) */
	.line-grid.centered-hebrew {
		grid-template-columns: 2rem 1fr 2rem; /* Keep structure but text is centered */
	}

	.line-grid.centered-hebrew .line.hebrew {
		grid-column: 2; /* Center column if using 3-col specialized? No, 2rem 1fr 2rem is simpler */
		justify-self: center;
		text-align: center;
	}

	.line-grid.centered-hebrew .line-number {
		grid-column: 1; /* Number on far left as fallback */
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
		align-self: start; /* Ensure text starts at top */
	}

	.line-number {
		grid-column: 2; /* Middle column by default */
		grid-row: 1;
		color: var(--divider-2);
		font-size: 0.75rem;
		align-self: center;
		justify-self: center;
		user-select: none;
		font-variant-numeric: tabular-nums;
	}

	.line.hebrew {
		grid-column: 1; /* Left column */
		font-family: "Frank Ruhl Libre", serif;
		direction: rtl;
		font-size: 1.35rem;
		line-height: 1.5;
		justify-self: end;
		text-align: right;
	}

	.line.english {
		grid-column: 3; /* Right column */
		font-size: 1.2rem;
		line-height: 1.5;
		justify-self: start;
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
		color: var(--divider-2);
		pointer-events: none;
		text-align: center;
	}

	.sep-ornament {
		font-size: 0.9rem;
		opacity: 1;
		transition: var(--transition);
		text-align: center;
	}

	:global(.mode-interlinear) .intl-seperator {
		height: 0.5rem;
	}

	/* Layout Modes */
	:global(.mode-interlinear) .line-grid {
		grid-template-columns: 2rem 1fr; /* Number | Content */
		row-gap: -0.1rem;
		column-gap: 0;
	}

	:global(.mode-interlinear) .line-grid.centered-hebrew {
		grid-template-columns: 2rem 1fr;
	}

	:global(.mode-interlinear) .line-number {
		grid-column: 1;
		grid-row: 1 / span 2;
		justify-self: center;
		/* align-self: center; Inherited from base class, removes start override */
	}

	:global(.mode-interlinear) .line-grid.centered-hebrew .line-number {
		grid-row: 1;
	}

	:global(.mode-interlinear) .line.hebrew {
		grid-column: 2;
		grid-row: 1;
		justify-self: center;
		text-align: center;
		padding-bottom: 0;
	}

	:global(.mode-interlinear) .line.english {
		grid-column: 2;
		grid-row: 2;
		justify-self: center;
		text-align: center;
		opacity: 0.8;
		padding-top: 0;
	}

	/* Monolingual Overrides */
	:global(.poem.hide-hebrew) .line-grid,
	:global(.poem.hide-english) .line-grid {
		grid-template-columns: 2rem 1fr; /* Number | Content */
		width: fit-content;
		max-width: 100%;
		margin: 0 auto;
	}

	:global(.poem.hide-hebrew) .line-number,
	:global(.poem.hide-english) .line-number {
		grid-column: 1;
	}

	:global(.poem.hide-hebrew) .line.english {
		grid-column: 2;
		justify-self: center;
		text-align: center;
	}

	:global(.poem.hide-english) .line.hebrew {
		grid-column: 2;
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

		/* Mobile Controls */
		.poem-meta-bar {
			flex-direction: column;
			align-items: stretch;
			gap: 1rem;
			padding: 1rem;
			margin: 0 -1.5rem 2rem;
			top: 0;
		}

		.meta-left {
			width: 100%;
			justify-content: space-between;
		}

		.meta-right {
			display: none;
		}

		.translation-control label {
			display: none;
		}

		.select-wrapper {
			flex-grow: 1;
			display: flex;
			justify-content: flex-end;
		}

		.select-wrapper select {
			max-width: 100%;
			width: auto;
		}

		.line-grid {
			grid-template-columns: 1.5rem 1fr; /* Force interlinear-like layout on mobile? */
			row-gap: 0.5rem;
		}

		.line-number {
			grid-column: 1;
			grid-row: 1 / span 2;
			padding-top: 0.5rem;
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

		.line.hebrew {
			grid-column: 2;
			grid-row: 1;
		}

		.line.english {
			grid-column: 2;
			grid-row: 2;
		}

		.main-title {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;
		}

		.author-meta {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;
		}

		.main-title .he,
		.main-title .en {
			justify-self: auto;
			text-align: center;
		}

		.author-meta .he {
			justify-self: auto;
			text-align: center;
		}

		.author-meta .en-group {
			justify-content: center;
		}

		.main-title .en {
			font-size: 2rem;
		}
		.main-title .he {
			font-size: 1.8rem;
		}
	}
</style>
