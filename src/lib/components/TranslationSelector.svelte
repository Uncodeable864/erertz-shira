<script lang="ts">
    interface Translation {
        id: string;
        name: string;
        copyright: string;
        infoUrl: string;
    }

    let { translations, currentTranslationId, onTranslationChange } = $props<{
        translations: Translation[];
        currentTranslationId: string;
        onTranslationChange: (id: string) => void;
    }>();

    let currentTranslation = $derived(
        translations.find((t) => t.id === currentTranslationId) ||
            translations[0],
    );
</script>

<div class="translation-control">
    <label for="translation">Translation:</label>
    <div class="select-wrapper">
        <select
            bind:value={currentTranslationId}
            id="translation"
            onchange={() => onTranslationChange(currentTranslationId)}
        >
            {#each translations as trans}
                <option value={trans.id}>{trans.name}</option>
            {/each}
        </select>
    </div>
</div>

<div class="copyright-info-wrapper">
    <small class="copyright-info">
        Translation &copy;: {currentTranslation.copyright}
        (<a href={currentTranslation.infoUrl} target="_blank" rel="noreferrer"
            >View</a
        >)
    </small>
</div>

<style>
    .translation-control {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: var(--text-muted);
        font-weight: 500;
    }

    .select-wrapper select {
        font-family: var(--font-serif);
        padding: 0.5rem 2.5rem 0.5rem 1rem;
        border: 1px solid var(--divider-primary);
        border-radius: 6px;
        background: white;
        color: var(--text-primary);
        cursor: pointer;
        font-size: 0.95rem;
        box-shadow: var(--shadow-sm);
        transition: var(--transition-base);
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%231B4B7F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 0.75rem center;
        background-size: 1rem;
    }

    .select-wrapper select:hover {
        border-color: var(--brand-secondary);
        box-shadow: var(--shadow-md);
        background-color: var(--bg-secondary);
    }

    .select-wrapper select:focus {
        outline: none;
        border-color: var(--brand-primary);
        box-shadow: 0 0 0 3px rgba(27, 75, 127, 0.1);
    }

    .copyright-info {
        color: var(--text-muted);
        font-size: 0.9rem;
    }

    .copyright-info a {
        color: var(--brand-primary);
        text-decoration: none;
        font-weight: 600;
        transition: var(--transition-fast);
        border-bottom: 1px solid transparent;
    }

    .copyright-info a:hover {
        color: var(--brand-secondary);
        border-bottom-color: var(--accent-gold);
    }

    @media (max-width: 768px) {
        .translation-control label {
            display: none;
        }

        .copyright-info-wrapper {
            display: none;
        }
    }
</style>
