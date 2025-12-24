<script lang="ts">
    import { Fa } from "svelte-fa";
    import { faWikipediaW } from "@fortawesome/free-brands-svg-icons";

    let { description, infoUrl } = $props<{
        description?: string;
        infoUrl?: string;
    }>();
</script>

{#if description}
    <p>
        {description}
        {#if infoUrl}
            <span class="info-sep" />
            <a
                href={infoUrl}
                target="_blank"
                rel="noreferrer"
                class="about-link"
                aria-label="Wikipedia Link"
            >
                <Fa icon={faWikipediaW} />
            </a>
        {/if}
    </p>
{/if}

<style>
    p {
        margin: 0;
    }

    .info-sep {
        opacity: 0.5;
        margin: 0 0.25rem;
    }

    .info-sep::before {
        content: "·";
    }

    .about-link {
        color: var(--brand);
        text-decoration: none;
        font-size: 0.75rem;
        border-bottom: 1px solid transparent;
        transition: var(--transition);
        font-style: normal;
        vertical-align: middle;
    }

    .about-link:hover {
        border-bottom-color: var(--brand);
        opacity: 0.8;
    }
</style>
