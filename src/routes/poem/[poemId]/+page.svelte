<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import PoemHeader from "$lib/components/PoemHeader.svelte";
	import InfoSection from "$lib/components/InfoSection.svelte";
	import ViewControls from "$lib/components/ViewControls.svelte";
	import TranslationSelector from "$lib/components/TranslationSelector.svelte";
	import {
		computeLineNumbers,
		getPoemClasses,
		removeNikkudot,
		type ViewMode,
	} from "$lib/utils/poem";

	let { data } = $props();
	const { poem } = data;

	type LayoutMode = "columns" | "interlinear" | "stanza";

	let scrollY = $state(0);
	let mounted = $state(false);
	let viewMode: ViewMode = $state("both");
	let layoutMode: LayoutMode = $state("columns");
	let currentTranslationId = $state("default");
	let showNikkudot = $state(true);
	let highlightedLineId = $state<string | null>(null);

	let lineNumberMap = $derived(computeLineNumbers(poem.content));
	let poemClass = $derived(getPoemClasses(viewMode, layoutMode));

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

	function handleViewModeChange(mode: ViewMode) {
		viewMode = mode;
	}

	function cycleLayoutMode() {
		if (layoutMode === "columns") {
			layoutMode = "interlinear";
		} else if (layoutMode === "interlinear") {
			layoutMode = "stanza";
		} else {
			layoutMode = "columns";
		}
	}

	function toggleNikkudot() {
		showNikkudot = !showNikkudot;
	}

	function handleTranslationChange(id: string) {
		currentTranslationId = id;
	}

	function toggleLineHighlight(lineId: string) {
		highlightedLineId = highlightedLineId === lineId ? null : lineId;
	}

	// Helper function to return Hebrew text with or without nikkudot
	function getHebrewText(text: string): string {
		return showNikkudot ? text : removeNikkudot(text);
	}
</script>

<svelte:window bind:scrollY />

<svelte:head>
	<title
		>{poem.metadata.title} by {poem.metadata.author.name} | Eretz Shira Hebrew
		Poetry</title
	>
</svelte:head>

{#if mounted}
	<div>
		<header>
			<PoemHeader
				title={poem.metadata.title}
				hebrewTitle={poem.metadata.hebrewTitle}
				author={poem.metadata.author}
			/>
		</header>

		<main>
			<div class="poem-wrapper">
				{#if poem.metadata.description || poem.metadata.author.description}
					<div class="context-info">
						{#if poem.metadata.description}
							<div class="poem-desc">
								<InfoSection
									description={poem.metadata.description}
									infoUrl={poem.metadata.infoUrl}
								/>
							</div>
						{/if}
						{#if poem.metadata.author.description}
							<div class="author-desc">
								<InfoSection
									description={poem.metadata.author
										.description}
									infoUrl={poem.metadata.author.infoUrl}
								/>
							</div>
						{/if}
					</div>
				{/if}

				<div class="poem-meta-bar" class:stuck={scrollY > 20}>
					<div class="meta-left">
						<ViewControls
							{viewMode}
							{layoutMode}
							{showNikkudot}
							onViewModeChange={handleViewModeChange}
							onCycleLayout={cycleLayoutMode}
							onToggleNikkudot={toggleNikkudot}
						/>

						<div class="meta-sep"></div>

						<TranslationSelector
							translations={poem.translations}
							{currentTranslationId}
							onTranslationChange={handleTranslationChange}
						/>
					</div>
				</div>

				<section class={poemClass} id="poem">
					{#key currentTranslationId}
						<div
							class="translation-fade-wrapper"
							in:fade={{ duration: 400 }}
						>
							{#each poem.content as stanza, stanzaIdx}
								{#if layoutMode === "stanza"}
									<!-- Stanza mode: group all Hebrew, then all English -->
									<div class="stanza-group">
										<!-- All Hebrew lines in this stanza -->
										{#each stanza as line}
											<div
												class="line-grid"
												class:highlighted={highlightedLineId ===
													line.id}
												onclick={() =>
													toggleLineHighlight(
														line.id,
													)}
											>
												<span
													class="line hebrew"
													data-line={line.id}
													role="presentation"
												>
													{getHebrewText(line.hebrew)}
												</span>
											</div>
										{/each}

										<!-- All English lines in this stanza -->
										{#each stanza as line}
											{@const currentTrans =
												line.trans[
													currentTranslationId
												]}
											{#if currentTrans}
												<div
													class="line-grid"
													class:highlighted={highlightedLineId ===
														line.id}
													onclick={() =>
														toggleLineHighlight(
															line.id,
														)}
												>
													<span
														class="line english"
														data-line={line.id}
														role="presentation"
													>
														{@html currentTrans}
													</span>
												</div>
											{/if}
										{/each}
									</div>
								{:else}
									<!-- Columns & Interlinear modes: line-by-line -->
									<div class="stanza-group">
										{#each stanza as line}
											{@const currentTrans =
												line.trans[
													currentTranslationId
												]}
											<div
												class="line-grid"
												class:centered-hebrew={!currentTrans}
												class:highlighted={highlightedLineId ===
													line.id}
												onclick={() =>
													toggleLineHighlight(
														line.id,
													)}
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
													{getHebrewText(line.hebrew)}
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
												<div
													class="intl-seperator"
												></div>
											{/if}
										{/each}
									</div>
								{/if}
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
	/* Poem Wrapper and Meta Bar */
	.poem-wrapper {
		max-width: 1200px;
		margin: 0 auto 5rem;
		padding: 3rem;
		background: rgba(253, 252, 250, 0.7);
		backdrop-filter: blur(8px);
		box-shadow: var(--shadow-lg);
		position: relative;
		border: 1px solid var(--divider-secondary);
	}

	/* Decorative corner ornaments - Middle Eastern inspired */
	.poem-wrapper::before,
	.poem-wrapper::after {
		content: "";
		position: absolute;
		width: 24px;
		height: 24px;
		border-style: solid;
		border-color: var(--accent-gold);
		opacity: 0.4;
	}

	.poem-wrapper::before {
		top: 12px;
		left: 12px;
		border-width: 2px 0 0 2px;
	}

	.poem-wrapper::after {
		bottom: 12px;
		right: 12px;
		border-width: 0 2px 2px 0;
	}

	.poem-meta-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1.5rem;
		margin: 0 -3rem 3rem;
		padding: 1.25rem 3rem;
		padding-top: calc(1.25rem + env(safe-area-inset-top, 0px));
		border-bottom: 1px solid var(--divider-primary);
		position: sticky;
		top: 4px;
		z-index: 100;
		background: rgba(248, 246, 242, 0.95);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		transition: var(--transition-base);
	}

	.poem-meta-bar.stuck {
		box-shadow: var(--shadow-md);
		border-bottom-color: var(--divider-primary);
		background: rgba(248, 246, 242, 0.98);
	}

	.meta-left {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.meta-sep {
		width: 1px;
		height: 28px;
		background: var(--divider-primary);
		margin: 0 0.5rem;
	}

	/* Context Info */
	.context-info {
		margin: 0 0 3rem 0;
		text-align: left;
		color: var(--text-secondary);
		line-height: 1.6;
		padding: 2rem;
		background: var(--bg-secondary);
		border-radius: 4px;
	}

	.poem-desc {
		font-size: 1.05rem;
		margin-bottom: 1.5rem;
	}

	.author-desc {
		font-size: 1.05rem;
	}

	/* Poem Section */
	.poem {
		position: relative;
		z-index: 1;
		transition: var(--transition-base);
	}

	.line-grid {
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 2.5rem 1fr;
		justify-content: center;
		column-gap: 2rem;
		row-gap: 0.75rem;
		max-width: 1000px;
		padding: 0.5rem 1rem;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		border-radius: 6px;
	}

	.line-grid:hover {
		background: var(--highlight);
		transform: translateY(-1px);
	}

	.line-grid.highlighted {
		background: var(--highlight-warm);
		transform: scale(1.01);
		box-shadow: var(--shadow-sm);
		border-left: 3px solid var(--accent-terracotta);
		padding-left: calc(1rem - 3px);
	}

	.line-grid.centered-hebrew {
		grid-template-columns: 2.5rem 1fr 2.5rem;
	}

	.line-grid.centered-hebrew .line.hebrew {
		grid-column: 2;
		justify-self: center;
		text-align: center;
	}

	.line-grid.centered-hebrew .line-number {
		grid-column: 1;
	}

	.line {
		width: fit-content;
		padding: 0.5rem 0.75rem;
		border-radius: 4px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		cursor: default;
		position: relative;
		align-self: start;
	}

	.line-number {
		grid-column: 2;
		grid-row: 1;
		color: var(--text-light);
		font-size: 0.8rem;
		align-self: center;
		justify-self: center;
		user-select: none;
		font-variant-numeric: tabular-nums;
		font-family: var(--font-serif);
		opacity: 0.5;
	}

	.line.hebrew {
		grid-column: 1;
		font-family: var(--font-hebrew);
		direction: rtl;
		font-size: 1.4rem;
		line-height: 1.6;
		justify-self: end;
		text-align: right;
		color: var(--text-primary);
		font-weight: 500;
	}

	.line.english {
		grid-column: 3;
		font-size: 1.2rem;
		line-height: 1.6;
		justify-self: start;
		color: var(--text-secondary);
		font-family: var(--font-serif);
	}

	.stanza-group {
		display: contents;
	}

	.stanza-sep {
		grid-column: 1 / -1;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2rem 0;
		color: var(--accent-gold);
		pointer-events: none;
		text-align: center;
		gap: 1.5rem;
	}

	.stanza-sep::before,
	.stanza-sep::after {
		content: "";
		flex: 1;
		height: 1px;
		background: linear-gradient(
			to right,
			transparent,
			var(--divider-primary),
			transparent
		);
		max-width: 120px;
	}

	.sep-ornament {
		font-size: 1rem;
		opacity: 0.6;
		transition: var(--transition-base);
		color: var(--accent-gold);
	}

	:global(.mode-interlinear) .intl-seperator {
		height: 0.5rem;
	}

	:global(.mode-interlinear) .line-grid {
		grid-template-columns: 2.5rem 1fr;
		row-gap: 0.25rem;
		column-gap: 0;
	}

	:global(.mode-interlinear) .line-grid.centered-hebrew {
		grid-template-columns: 2.5rem 1fr;
	}

	:global(.mode-interlinear) .line-number {
		grid-column: 1;
		grid-row: 1 / span 2;
		justify-self: center;
	}

	:global(.mode-interlinear) .line-grid.centered-hebrew .line-number {
		grid-row: 1;
	}

	:global(.mode-interlinear) .line.hebrew {
		grid-column: 2;
		grid-row: 1;
		justify-self: center;
		text-align: center;
		padding-bottom: 0.25rem;
	}

	:global(.mode-interlinear) .line.english {
		grid-column: 2;
		grid-row: 2;
		justify-self: center;
		text-align: center;
		opacity: 0.85;
		padding-top: 0.25rem;
		font-size: 1.1rem;
	}

	/* Stanza Mode - Group all Hebrew lines, then all English lines */
	:global(.mode-stanza) .line-grid {
		grid-template-columns: 1fr;
		max-width: 700px;
	}

	:global(.mode-stanza) .line-number {
		display: none;
	}

	:global(.mode-stanza) .stanza-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 1.5rem;
	}

	:global(.mode-stanza) .line.hebrew,
	:global(.mode-stanza) .line.english {
		grid-column: 1;
		justify-self: center;
		text-align: center;
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
	}

	:global(.mode-stanza) .line.hebrew {
		font-size: 1.5rem;
	}

	:global(.mode-stanza) .line.english {
		font-size: 1.2rem;
		opacity: 0.9;
	}

	:global(.mode-stanza) .intl-seperator {
		display: none;
	}

	:global(.poem.hide-hebrew) .line-grid,
	:global(.poem.hide-english) .line-grid {
		grid-template-columns: 2.5rem 1fr;
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

	@media (max-width: 768px) {
		.poem-wrapper {
			padding: 1.5rem 1rem;
			border-radius: 0;
			border-left: none;
			border-right: none;
			margin-bottom: 3rem;
		}

		.poem-wrapper::before,
		.poem-wrapper::after {
			display: none;
		}

		.context-info {
			padding: 1.25rem;
			margin-bottom: 2rem;
		}

		.poem-meta-bar {
			flex-direction: column;
			align-items: stretch;
			gap: 0.75rem;
			padding: 0.75rem 1rem;
			margin: 0 -1rem 1.5rem;
			top: 4px;
		}

		.meta-left {
			width: 100%;
			justify-content: center;
			flex-wrap: wrap;
			gap: 0.75rem;
		}

		.meta-sep {
			display: none;
		}

		.line-grid {
			grid-template-columns: 1.75rem 1fr;
			row-gap: 0.25rem;
			column-gap: 0.5rem;
			padding: 0.5rem 0.5rem;
		}

		.line-number {
			grid-column: 1;
			grid-row: 1 / span 2;
			padding-top: 0.5rem;
			font-size: 0.7rem;
		}

		.line {
			width: 100%;
			text-align: center !important;
			justify-self: center !important;
			padding: 0.375rem 0.5rem;
		}

		.line.hebrew {
			grid-column: 2;
			grid-row: 1;
			font-size: 1.2rem;
		}

		.line.english {
			grid-column: 2;
			grid-row: 2;
			font-size: 1rem;
		}

		.stanza-sep {
			padding: 1.5rem 0;
		}
	}

	@media (max-width: 480px) {
		.poem-wrapper {
			padding: 1rem 0.75rem;
		}

		.poem-meta-bar {
			padding: 0.5rem 0.75rem;
			margin: 0 -0.75rem 1.25rem;
		}

		.line-grid {
			grid-template-columns: 1.5rem 1fr;
			padding: 0.375rem;
		}

		.line.hebrew {
			font-size: 1.1rem;
		}

		.line.english {
			font-size: 0.95rem;
		}

		.context-info {
			padding: 1rem;
			font-size: 0.95rem;
		}
	}
</style>
