<script lang="ts">
	import { onMount } from "svelte";

	let { data } = $props();
	const { poems } = data;

	let mounted = $state(false);
	let heroVisible = $state(false);

	onMount(() => {
		mounted = true;
		setTimeout(() => {
			heroVisible = true;
		}, 100);
	});
</script>

<svelte:head>
	<title>Eretz Shira — Hebrew Poetry</title>
	<meta
		name="description"
		content="Explore the beauty of Hebrew poetry with bilingual translations"
	/>
</svelte:head>

{#if mounted}
	<div class="home-page">
		<!-- Hero Section -->
		<section class="hero" class:visible={heroVisible}>
			<div class="hero-pattern"></div>
			<div class="hero-content">
				<div class="hero-ornament top">✦</div>
				<div class="title-group">
					<h1 class="title-en">Eretz Shira</h1>
					<div class="title-divider"></div>
					<h1 class="title-he" dir="rtl">ארץ שירה</h1>
				</div>
				<p class="subtitle">
					A Collection of Hebrew Poetry in Translation
				</p>
				<div class="hero-ornament bottom">✦</div>
			</div>
			<div class="hero-gradient"></div>
		</section>

		<!-- Featured Poems Section -->
		<section class="poems-section">
			<div class="section-header">
				<h2 class="section-title">Featured Poems</h2>
				<div class="section-ornament">
					<span class="ornament-line"></span>
					<span class="ornament-symbol">❖</span>
					<span class="ornament-line"></span>
				</div>
			</div>

			<div class="poems-grid">
				{#each poems as poem, index}
					<a
						href="/poem/{poem.id}"
						class="poem-card"
						style="animation-delay: {index * 0.1}s"
					>
						<div class="card-corner"></div>
						<div class="card-content">
							<div class="poem-titles">
								<h3 class="poem-title-en">{poem.title}</h3>
								<h3 class="poem-title-he" dir="rtl">
									{poem.hebrewTitle}
								</h3>
							</div>
							<div class="poem-meta">
								<span class="author-en">{poem.author.en}</span>
								<span class="meta-separator">·</span>
								<span class="author-he" dir="rtl"
									>{poem.author.he}</span
								>
							</div>
						</div>
						<div class="card-accent"></div>
					</a>
				{/each}
			</div>
		</section>

		<!-- Footer -->
		<footer class="home-footer">
			<div class="footer-ornament">✦ ✦ ✦</div>
			<p>Preserving the beauty of Hebrew verse across languages</p>
		</footer>
	</div>
{/if}

<style>
	.home-page {
		min-height: 100vh;
		position: relative;
	}

	/* Hero Section */
	.hero {
		position: relative;
		min-height: 75vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: linear-gradient(
			135deg,
			var(--bg-primary) 0%,
			var(--bg-secondary) 50%,
			var(--bg-tertiary) 100%
		);
		border-bottom: 2px solid var(--divider-primary);
		opacity: 0;
		transform: translateY(20px);
		transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero.visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* Animated geometric pattern background */
	.hero-pattern {
		position: absolute;
		inset: 0;
		opacity: 0.04;
		background-image:
			repeating-linear-gradient(
				0deg,
				transparent,
				transparent 35px,
				var(--brand-primary) 35px,
				var(--brand-primary) 36px
			),
			repeating-linear-gradient(
				90deg,
				transparent,
				transparent 35px,
				var(--brand-primary) 35px,
				var(--brand-primary) 36px
			),
			repeating-linear-gradient(
				45deg,
				transparent,
				transparent 50px,
				var(--accent-gold) 50px,
				var(--accent-gold) 51px
			),
			repeating-linear-gradient(
				-45deg,
				transparent,
				transparent 50px,
				var(--accent-terracotta) 50px,
				var(--accent-terracotta) 51px
			);
		animation: patternShift 60s linear infinite;
	}

	@keyframes patternShift {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(35px, 35px);
		}
	}

	.hero-gradient {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle at 50% 50%,
			transparent 0%,
			rgba(253, 252, 250, 0.3) 100%
		);
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		z-index: 2;
		text-align: center;
		padding: 3rem 2rem;
		max-width: 900px;
	}

	.hero-ornament {
		font-size: 1.5rem;
		color: var(--accent-gold);
		opacity: 0;
		animation: ornamentFade 1s ease-out 0.5s forwards;
	}

	.hero-ornament.top {
		margin-bottom: 2rem;
	}

	.hero-ornament.bottom {
		margin-top: 2rem;
	}

	@keyframes ornamentFade {
		to {
			opacity: 0.6;
		}
	}

	.title-group {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		align-items: center;
	}

	.title-en {
		font-family: var(--font-display);
		font-size: clamp(3rem, 8vw, 5.5rem);
		font-weight: 300;
		letter-spacing: 0.05em;
		color: var(--brand-primary);
		margin: 0;
		line-height: 1;
		opacity: 0;
		transform: translateY(30px);
		animation: titleReveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
	}

	.title-he {
		font-family: var(--font-hebrew);
		font-size: clamp(2.5rem, 7vw, 4.5rem);
		font-weight: 400;
		color: var(--brand-secondary);
		margin: 0;
		line-height: 1.2;
		opacity: 0;
		transform: translateY(30px);
		animation: titleReveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
	}

	.title-divider {
		width: 120px;
		height: 2px;
		background: linear-gradient(
			90deg,
			transparent,
			var(--accent-gold),
			transparent
		);
		opacity: 0;
		animation: dividerExpand 1s ease-out 0.7s forwards;
	}

	@keyframes titleReveal {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes dividerExpand {
		from {
			width: 0;
			opacity: 0;
		}
		to {
			width: 120px;
			opacity: 0.6;
		}
	}

	.subtitle {
		font-family: var(--font-serif);
		font-size: 1.25rem;
		font-weight: 400;
		font-style: italic;
		color: var(--text-secondary);
		margin: 2rem 0 0;
		opacity: 0;
		animation: subtitleFade 1s ease-out 0.9s forwards;
		letter-spacing: 0.02em;
	}

	@keyframes subtitleFade {
		to {
			opacity: 0.85;
		}
	}

	/* Poems Section */
	.poems-section {
		max-width: 1200px;
		margin: 0 auto;
		padding: 5rem 2rem;
	}

	.section-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.section-title {
		font-family: var(--font-display);
		font-size: 2.5rem;
		font-weight: 500;
		color: var(--brand-primary);
		margin: 0 0 1.5rem;
		letter-spacing: 0.02em;
	}

	.section-ornament {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.ornament-line {
		width: 60px;
		height: 1px;
		background: var(--divider-primary);
	}

	.ornament-symbol {
		color: var(--accent-gold);
		font-size: 0.875rem;
		opacity: 0.6;
	}

	/* Poems Grid */
	.poems-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: 2.5rem;
	}

	.poem-card {
		position: relative;
		display: block;
		padding: 2.5rem 2rem;
		background: rgba(255, 255, 255, 0.6);
		border: 1px solid var(--divider-primary);
		border-radius: 2px;
		text-decoration: none;
		color: inherit;
		transition: var(--transition-base);
		overflow: hidden;
		opacity: 0;
		transform: translateY(30px);
		animation: cardReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	@keyframes cardReveal {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Decorative corner element */
	.card-corner {
		position: absolute;
		top: 0;
		right: 0;
		width: 60px;
		height: 60px;
		opacity: 0;
		transition: var(--transition-base);
	}

	.card-corner::before,
	.card-corner::after {
		content: "";
		position: absolute;
		background: var(--accent-gold);
	}

	.card-corner::before {
		top: 0;
		right: 0;
		width: 2px;
		height: 30px;
	}

	.card-corner::after {
		top: 0;
		right: 0;
		width: 30px;
		height: 2px;
	}

	/* Accent bar that grows on hover */
	.card-accent {
		position: absolute;
		left: 0;
		top: 0;
		width: 3px;
		height: 0;
		background: linear-gradient(
			to bottom,
			var(--accent-gold),
			var(--accent-terracotta)
		);
		transition: height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.poem-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-xl);
		border-color: var(--brand-secondary);
		background: rgba(255, 255, 255, 0.95);
	}

	.poem-card:hover .card-corner {
		opacity: 0.3;
	}

	.poem-card:hover .card-accent {
		height: 100%;
	}

	.card-content {
		position: relative;
		z-index: 1;
	}

	.poem-titles {
		margin-bottom: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.poem-title-en {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 500;
		font-style: italic;
		color: var(--brand-primary);
		margin: 0;
		line-height: 1.3;
		transition: var(--transition-fast);
	}

	.poem-card:hover .poem-title-en {
		color: var(--brand-secondary);
	}

	.poem-title-he {
		font-family: var(--font-hebrew);
		font-size: 1.6rem;
		font-weight: 400;
		color: var(--text-primary);
		margin: 0;
		line-height: 1.4;
	}

	.poem-meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 1rem;
		color: var(--text-muted);
		flex-wrap: wrap;
	}

	.author-en {
		font-family: var(--font-serif);
		font-weight: 500;
	}

	.author-he {
		font-family: var(--font-hebrew);
		font-size: 1.1rem;
	}

	.meta-separator {
		opacity: 0.4;
		color: var(--text-light);
	}

	/* Footer */
	.home-footer {
		text-align: center;
		padding: 3rem 2rem 4rem;
		background: var(--bg-secondary);
		border-top: 1px solid var(--divider-secondary);
	}

	.footer-ornament {
		color: var(--accent-gold);
		font-size: 1rem;
		margin-bottom: 1rem;
		opacity: 0.5;
		letter-spacing: 1rem;
	}

	.home-footer p {
		margin: 0;
		font-family: var(--font-serif);
		font-size: 1rem;
		font-style: italic;
		color: var(--text-muted);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.hero {
			min-height: 60vh;
		}

		.hero-content {
			padding: 2rem 1.5rem;
		}

		.title-en {
			font-size: 2.5rem;
		}

		.title-he {
			font-size: 2rem;
		}

		.subtitle {
			font-size: 1.1rem;
		}

		.poems-section {
			padding: 3rem 1.5rem;
		}

		.section-title {
			font-size: 2rem;
		}

		.poems-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.poem-card {
			padding: 2rem 1.5rem;
		}

		.poem-title-en {
			font-size: 1.3rem;
		}

		.poem-title-he {
			font-size: 1.4rem;
		}
	}

	@media (max-width: 480px) {
		.poem-meta {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.meta-separator {
			display: none;
		}
	}
</style>
