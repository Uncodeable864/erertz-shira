<script lang="ts">
    let { title, hebrewTitle, author } = $props<{
        title: string;
        hebrewTitle: string;
        author: { id: string; en: string; he: string };
    }>();
</script>

<div class="header-inner">
    <div class="ornament-top">✦</div>

    <div class="title-section">
        <h1 class="title-he" dir="rtl">{hebrewTitle}</h1>
        <div class="title-divider"></div>
        <h1 class="title-en">{title}</h1>
    </div>

    <div class="author-section">
        <div class="author-label">by</div>
        <div class="author-names">
            <a href="/author/{author.id}" class="author-link author-en"
                >{author.en}</a
            >
            <span class="author-separator">·</span>
            <a
                href="/author/{author.id}"
                class="author-link author-he"
                dir="rtl">{author.he}</a
            >
        </div>
    </div>

    <div class="ornament-bottom">✦</div>
</div>

<style>
    .header-inner {
        max-width: 800px;
        margin: 0 auto;
        padding: 3rem 2rem;
        text-align: center;
        position: relative;
    }

    .ornament-top,
    .ornament-bottom {
        color: var(--accent-gold);
        font-size: 1.25rem;
        opacity: 0.5;
        margin: 1rem 0;
    }

    .title-section {
        margin: 2rem 0 2.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.25rem;
    }

    .title-he {
        font-family: var(--font-hebrew);
        font-size: clamp(2.25rem, 5vw, 3.25rem);
        font-weight: 500;
        color: var(--brand-primary);
        margin: 0;
        line-height: 1.2;
        letter-spacing: 0.01em;
    }

    .title-divider {
        width: 100px;
        height: 2px;
        background: linear-gradient(
            90deg,
            transparent,
            var(--accent-gold) 20%,
            var(--accent-gold) 80%,
            transparent
        );
        opacity: 0.6;
    }

    .title-en {
        font-family: var(--font-display);
        font-size: clamp(2rem, 4.5vw, 2.75rem);
        font-weight: 400;
        font-style: italic;
        color: var(--brand-secondary);
        margin: 0;
        line-height: 1.3;
        letter-spacing: 0.01em;
    }

    .author-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        margin: 2rem 0 1rem;
    }

    .author-label {
        font-family: var(--font-serif);
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: var(--text-light);
        font-weight: 500;
    }

    .author-names {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .author-link {
        font-size: 1.25rem;
        text-decoration: none;
        color: var(--text-secondary);
        transition: var(--transition-fast);
        position: relative;
        padding-bottom: 2px;
    }

    .author-link::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--accent-gold);
        transition: var(--transition-base);
    }

    .author-link:hover {
        color: var(--brand-primary);
    }

    .author-link:hover::after {
        width: 100%;
    }

    .author-en {
        font-family: var(--font-serif);
        font-weight: 500;
    }

    .author-he {
        font-family: var(--font-hebrew);
        font-size: 1.35rem;
        font-weight: 500;
    }

    .author-separator {
        color: var(--text-light);
        opacity: 0.5;
    }

    @media (max-width: 768px) {
        .header-inner {
            padding: 2rem 1.5rem;
        }

        .title-he {
            font-size: 2rem;
        }

        .title-en {
            font-size: 1.75rem;
        }

        .author-link {
            font-size: 1.1rem;
        }

        .author-he {
            font-size: 1.2rem;
        }

        .author-names {
            flex-direction: column;
            gap: 0.5rem;
        }

        .author-separator {
            display: none;
        }
    }
</style>
