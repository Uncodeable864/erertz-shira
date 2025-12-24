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

	function handleTranslationChange(id: string) {
		currentTranslationId = id;
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
							onViewModeChange={handleViewModeChange}
							onCycleLayout={cycleLayoutMode}
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
											<div class="line-grid">
												<span
													class="line hebrew"
													data-line={line.id}
													role="presentation"
												>
													{line.hebrew}
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
												<div class="line-grid">
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

	.meta-left {
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

	/* Context Info */
	.context-info {
		margin: 0 0 3rem 0;
		text-align: left;
		color: var(--text);
		line-height: 1.6;
	}

	.poem-desc {
		font-size: 1rem;
		margin-bottom: 1.5rem;
	}

	.author-desc {
		font-size: 1rem;
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
		grid-template-columns: 1fr 2rem 1fr;
		justify-content: center;
		column-gap: 1.5rem;
		row-gap: 0.5rem;
		max-width: 1000px;
		padding: 0.1rem 0.6rem;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.line-grid:hover {
		background: var(--highlight);
		transform: scale(1.02);
		box-shadow: 0 0 15px rgba(44, 82, 130, 0.1);
		color: var(--brand);
	}

	.line-grid.centered-hebrew {
		grid-template-columns: 2rem 1fr 2rem;
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
		padding: 0.4rem 0.6rem;
		border-radius: 6px;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
		cursor: default;
		position: relative;
		align-self: start;
	}

	.line-number {
		grid-column: 2;
		grid-row: 1;
		color: var(--divider-2);
		font-size: 0.75rem;
		align-self: center;
		justify-self: center;
		user-select: none;
		font-variant-numeric: tabular-nums;
	}

	.line.hebrew {
		grid-column: 1;
		font-family: "Frank Ruhl Libre", serif;
		direction: rtl;
		font-size: 1.35rem;
		line-height: 1.5;
		justify-self: end;
		text-align: right;
	}

	.line.english {
		grid-column: 3;
		font-size: 1.2rem;
		line-height: 1.5;
		justify-self: start;
	}

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
	}

	:global(.mode-interlinear) .intl-seperator {
		height: 0.5rem;
	}

	:global(.mode-interlinear) .line-grid {
		grid-template-columns: 2rem 1fr;
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

	/* Stanza Mode - Group all Hebrew lines, then all English lines */
	:global(.mode-stanza) .line-grid {
		grid-template-columns: 1fr;
		max-width: 700px;
	}

	:global(.mode-stanza) .line-number {
		display: none; /* Hide line numbers in stanza mode for cleaner look */
	}

	:global(.mode-stanza) .stanza-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
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
		font-size: 1.4rem;
	}

	:global(.mode-stanza) .line.english {
		font-size: 1.15rem;
		opacity: 0.85;
	}

	:global(.mode-stanza) .intl-seperator {
		display: none;
	}

	:global(.poem.hide-hebrew) .line-grid,
	:global(.poem.hide-english) .line-grid {
		grid-template-columns: 2rem 1fr;
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
			padding: 1.5rem;
			border-radius: 0;
			border-left: none;
			border-right: none;
		}

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

		.line-grid {
			grid-template-columns: 1.5rem 1fr;
			row-gap: 0.5rem;
		}

		.line-number {
			grid-column: 1;
			grid-row: 1 / span 2;
			padding-top: 0.5rem;
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
	}
</style>
