<script>
    import { page } from "$app/state";
</script>

<svelte:head>
    <title>404 Not Found — Eretz Shira</title>
</svelte:head>

<div class="error-container">
    <div class="content">
        <h1 class="status">404</h1>

        <div class="message-group">
            <p class="english">The stanza you seek is silent.</p>
            <p class="hebrew" dir="rtl" lang="he">הבית הזה נדם</p>
        </div>

        <a href="/" class="home-button">
            <span class="en">Return Home</span>
            <span class="divider">/</span>
            <span class="he" dir="rtl" lang="he">חזרה הביתה</span>
        </a>
    </div>
</div>

<style>
    .he {
        font-family: "Frank Ruhl Libre", serif;
    }

    .error-container {
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 2rem;
    }

    .status {
        font-size: 6rem;
        font-weight: 300;
        margin: 0 0 2rem 0;
        line-height: 1;
        color: var(--brand);
    }

    .message-group {
        margin-bottom: 3rem;
    }

    .english {
        font-size: 1.5rem;
        margin: 0 0 0.5rem 0;
        font-style: italic;
    }

    .hebrew {
        font-size: 1.5rem;
        margin: 0;
        font-family: "Frank Ruhl Libre", serif;
    }

    .home-button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border: 1px solid var(--text);
        border-radius: 4px;
        color: inherit;
        text-decoration: none;
        transition: all 0.2s;
    }

    .home-button:hover {
        background: var(--text);
        color: var(--bg);
    }

    .divider {
        opacity: 0.5;
    }
</style>
