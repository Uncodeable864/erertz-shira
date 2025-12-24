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

/**
 * Remove Hebrew nikkudot (vowel points and cantillation marks)
 * Unicode ranges: U+0591-U+05C7
 */
export function removeNikkudot(text: string): string {
    // Remove Hebrew vowel points and cantillation marks
    return text.replace(/[\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7]/g, '');
}
