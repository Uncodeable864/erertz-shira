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
        padding: 0.15rem;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 8px;
        border: 1px solid var(--divider);
    }

    .view-controls:hover {
        background: rgba(255, 255, 255, 0.8);
        border-color: var(--brand);
    }

    .view-controls button {
        height: 32px;
        border: none;
        background: transparent;
        color: var(--muted);
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.95rem;
        font-weight: 600;
        transition: var(--transition);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.5rem;
    }

    .view-controls button.lang-toggle {
        min-width: 32px;
    }

    .view-controls button.lang-toggle.both {
        min-width: 48px;
        font-size: 0.85rem;
        letter-spacing: 0.05em;
    }

    .view-controls button.nikkudot-toggle {
        min-width: 32px;
    }

    .nikkud-indicator {
        font-family: "Frank Ruhl Libre", serif;
        font-size: 1.2rem;
        line-height: 1;
    }

    .view-controls button:hover {
        background: rgba(255, 255, 255, 0.8);
        color: var(--brand);
        transform: scale(1.05);
    }

    .view-controls button.active {
        background: var(--brand);
        color: white;
        box-shadow: var(--shadow-sm);
    }

    .divider {
        width: 1px;
        height: 20px;
        background: var(--divider);
        margin: 0 0.25rem;
    }
</style>
