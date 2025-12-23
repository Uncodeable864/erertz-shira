<script lang="ts">
	import { onMount } from 'svelte';

	type ViewMode = 'both' | 'hebrew' | 'english';

	let viewMode: ViewMode = $state('both');
	let highlightedLine: string | null = $state(null);

	const poemLines = [
		{
			id: '1',
			hebrew: 'צִיּוֹן, הֲלֹא תִשְׁאֲלִי לִשְׁלוֹם אֲסִירַיִךְ,',
			english: '<strong>Zion, will you not ask after the welfare of your captives,</strong>'
		},
		{
			id: '2',
			hebrew: 'דּוֹרְשֵׁי שְׁלוֹמֵךְ וְהֵם יֶתֶר עֲדָרָיִךְ?',
			english: 'Those who seek your peace—who are the remnant of your flocks?'
		},
		{
			id: '3',
			hebrew: 'מִיָּם וּמִזְרָח וּמִצָּפוֹן וְתֵימָן שְׁלוֹם',
			english: 'From west and east, from north and south: peace'
		},
		{
			id: '4',
			hebrew: 'רָחוֹק וְקָרוֹב שְׂאִי מִכֹּל עֲבָרָיִךְ.',
			english: 'To far and near—take it from all your borders.'
		},
		{
			id: '5',
			hebrew: 'וּשְׁלוֹם אֲסִיר תַּאֲוָה נוֹתֵן דְּמָעָיו כְּטַל,',
			english: "And peace to the captive of longing, who pours out tears like Hermon's dew,"
		},
		{
			id: '6',
			hebrew: 'חֶרְמוֹן וְנִכְסַף לְרִדְתָּם עַל הֲרָרָיִךְ.',
			english: 'And yearns for them to fall upon your mountains.'
		}
	];

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
	<title>Zion, Will You Not Ask — Bilingual</title>
</svelte:head>

<header>
	<h1>Zion, Will You Not Ask</h1>
	<p>Yehuda Halevi (c. 1075–1141) · Hebrew & English</p>

	<div class="controls">
		<button
			id="both"
			class:active={viewMode === 'both'}
			onclick={() => setViewMode('both')}
		>
			Hebrew + English
		</button>
		<button
			id="he"
			class:active={viewMode === 'hebrew'}
			onclick={() => setViewMode('hebrew')}
		>
			Hebrew only
		</button>
		<button
			id="en"
			class:active={viewMode === 'english'}
			onclick={() => setViewMode('english')}
		>
			English only
		</button>
		<select id="translation">
			<option selected>Halevi (clarity translation)</option>
			<option disabled>More translations coming</option>
		</select>
	</div>
</header>

<main>
	<section class={getPoemClass()} id="poem">
		<!-- Line-aligned layout: each row is a paired line -->
		<div class="line-grid">
			{#each poemLines as line}
				<div class="line-row">
					<span
						class="line hebrew"
						class:highlight={highlightedLine === line.id}
						data-line={line.id}
						onmouseenter={() => handleMouseEnter(line.id)}
						onmouseleave={handleMouseLeave}
					>
						{line.hebrew}
					</span>
					<span
						class="line english"
						class:highlight={highlightedLine === line.id}
						data-line={line.id}
						onmouseenter={() => handleMouseEnter(line.id)}
						onmouseleave={handleMouseLeave}
					>
						{@html line.english}
					</span>
				</div>
			{/each}
		</div>
	</section>
</main>

<footer>
	Hebrew poem © Public Domain · English translation adapted for clarity
</footer>
