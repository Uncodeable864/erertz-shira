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

    .author-link {
        text-decoration: none;
        color: inherit;
        transition: opacity 0.2s;
    }

    .author-link:hover {
        opacity: 0.7;
    }

    @media (max-width: 768px) {
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
    }
</style>
