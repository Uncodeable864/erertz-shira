<script lang="ts">
    let { title, hebrewTitle, author } = $props<{
        title: string;
        hebrewTitle: string;
        author: { id: string; en: string; he: string };
    }>();
</script>

<div class="header-inner">
    <h1 class="main-title he-en-group">
        <span class="he l-hebrew" dir="rtl">{hebrewTitle}</span>
        <span class="en">{title}</span>
    </h1>
    <p class="author-meta">
        <a href="/author/{author.id}" class="author-link he l-hebrew" dir="rtl"
            >{author.he}</a
        >
        <span class="en-group">
            <a href="/author/{author.id}" class="author-link en">{author.en}</a>
        </span>
    </p>
</div>

<style>
    .main-title {
        max-width: 1000px;
        margin: 0 auto 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3.5rem;
        align-items: baseline;
    }

    .main-title .en {
        font-size: 3rem;
        font-weight: 700;
        font-family: var(--font-display);
        color: var(--brand-primary);
        text-shadow:
            1px 1px 0px rgba(255, 255, 255, 0.9),
            2px 2px 6px rgba(27, 75, 127, 0.08);
        letter-spacing: -0.02em;
        justify-self: start;
        text-align: left;
        line-height: 1.1;
    }

    .main-title .he {
        font-size: 2.6rem;
        font-weight: 500;
        color: var(--brand-primary);
        text-shadow:
            1px 1px 0px rgba(255, 255, 255, 0.9),
            2px 2px 6px rgba(27, 75, 127, 0.08);
        margin-top: -0.5rem;
        justify-self: end;
        text-align: right;
        line-height: 1.2;
    }

    .author-meta {
        margin: 0 auto 3.5rem;
        font-size: 1.15rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3.5rem;
        max-width: 1000px;
        align-items: center;
    }

    .author-meta .he {
        font-style: normal;
        font-size: 1.35rem;
        justify-self: end;
        text-align: right;
        color: var(--text-secondary);
        font-weight: 500;
    }

    .author-meta .en-group {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        justify-self: start;
        text-align: left;
    }

    .author-link {
        text-decoration: none;
        color: var(--text-secondary);
        transition: var(--transition-fast);
        position: relative;
    }

    .author-link::after {
        content: "";
        position: absolute;
        bottom: -2px;
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

    @media (max-width: 768px) {
        .main-title {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
        }

        .main-title .en {
            font-size: 2.5rem;
        }

        .main-title .he {
            font-size: 2.2rem;
        }

        .author-meta {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
        }

        .main-title .he,
        .main-title .en {
            justify-self: auto;
            text-align: center;
        }
    }
</style>
