<script lang="ts">
    type LayoutMode = "columns" | "interlinear" | "stanza";
    type ViewMode = "hebrew" | "both" | "english";

    let {
        viewMode,
        layoutMode,
        showNikkudot,
        onViewModeChange,
        onCycleLayout,
        onToggleNikkudot,
    } = $props<{
        viewMode: ViewMode;
        layoutMode: LayoutMode;
        showNikkudot: boolean;
        onViewModeChange: (mode: ViewMode) => void;
        onCycleLayout: () => void;
        onToggleNikkudot: () => void;
    }>();
</script>

<div class="view-controls">
    <button
        class:active={viewMode === "hebrew"}
        onclick={() => onViewModeChange("hebrew")}
        title="Hebrew Only"
        aria-label="Hebrew Only"
        class="lang-toggle"
    >
        א
    </button>
    <button
        class:active={viewMode === "both"}
        onclick={() => onViewModeChange("both")}
        title="Bilingual"
        aria-label="Bilingual"
        class="lang-toggle both"
    >
        א·A
    </button>
    <button
        class:active={viewMode === "english"}
        onclick={() => onViewModeChange("english")}
        title="English Only"
        aria-label="English Only"
        class="lang-toggle"
    >
        A
    </button>
    <div class="divider"></div>
    <button
        onclick={onCycleLayout}
        title="Change Layout ({layoutMode})"
        aria-label="Change Layout"
        class="layout-toggle"
    >
        {#if layoutMode === "columns"}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <rect x="2" y="3" width="9" height="18" rx="2" /><rect
                    x="13"
                    y="3"
                    width="9"
                    height="18"
                    rx="2"
                />
            </svg>
        {:else if layoutMode === "interlinear"}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <line x1="8" y1="6" x2="21" y2="6" /><line
                    x1="8"
                    y1="12"
                    x2="21"
                    y2="12"
                /><line x1="8" y1="18" x2="21" y2="18" /><line
                    x1="3"
                    y1="6"
                    x2="3.01"
                    y2="6"
                /><line x1="3" y1="12" x2="3.01" y2="12" /><line
                    x1="3"
                    y1="18"
                    x2="3.01"
                    y2="18"
                />
            </svg>
        {:else}
            <!-- Stanza mode icon: stacked paragraphs -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <rect x="3" y="3" width="18" height="7" rx="1" />
                <rect x="3" y="14" width="18" height="7" rx="1" />
            </svg>
        {/if}
    </button>
    <div class="divider"></div>
    <button
        class:active={showNikkudot}
        onclick={onToggleNikkudot}
        title="Toggle Nikkudot (Vowel Points)"
        aria-label="Toggle Nikkudot"
        class="nikkudot-toggle"
    >
        <span class="nikkud-indicator">ָא</span>
    </button>
</div>

<style>
    .view-controls {
        display: flex;
        align-items: center;
        padding: 0.25rem;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 6px;
        border: 1px solid var(--divider-primary);
        box-shadow: var(--shadow-sm);
        transition: var(--transition-base);
    }

    .view-controls:hover {
        background: rgba(255, 255, 255, 0.9);
        border-color: var(--brand-secondary);
        box-shadow: var(--shadow-md);
    }

    .view-controls button {
        height: 36px;
        border: none;
        background: transparent;
        color: var(--text-muted);
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        transition: var(--transition-base);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.75rem;
        font-family: var(--font-serif);
    }

    .view-controls button:hover {
        background: var(--bg-tertiary);
        color: var(--brand-primary);
        transform: translateY(-1px);
    }

    .view-controls button.lang-toggle {
        min-width: 36px;
    }

    .view-controls button.lang-toggle.both {
        min-width: 52px;
        font-size: 0.9rem;
        letter-spacing: 0.05em;
    }

    .view-controls button.nikkudot-toggle {
        min-width: 36px;
    }

    .nikkud-indicator {
        font-family: var(--font-hebrew);
        font-size: 1.3rem;
        line-height: 1;
    }

    .view-controls button.active {
        background: var(--brand-primary);
        color: white;
        box-shadow: var(--shadow-sm);
        position: relative;
    }

    /* Subtle accent indicator for active state */
    .view-controls button.active::after {
        content: "";
        position: absolute;
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 2px;
        background: var(--accent-gold);
        border-radius: 1px;
    }

    .divider {
        width: 1px;
        height: 24px;
        background: var(--divider-primary);
        margin: 0 0.5rem;
    }
</style>
