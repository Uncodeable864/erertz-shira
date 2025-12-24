export type ViewMode = 'hebrew' | 'both' | 'english';

export function computeLineNumbers(content: any[]): Map<string, number> {
    const map = new Map<string, number>();
    let count = 1;
    for (const stanza of content) {
        for (const line of stanza) {
            map.set(line.id, count++);
        }
    }
    return map;
}

export function getPoemClasses(
    viewMode: ViewMode,
    layoutMode: 'columns' | 'interlinear' | 'stanza'
): string {
    const classes = ['poem'];
    if (viewMode === 'hebrew') classes.push('hide-english');
    if (viewMode === 'english') classes.push('hide-hebrew');
    if (layoutMode === 'interlinear') classes.push('mode-interlinear');
    if (layoutMode === 'stanza') classes.push('mode-stanza');
    return classes.join(' ');
}
