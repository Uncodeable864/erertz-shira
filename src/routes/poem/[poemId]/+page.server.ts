import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
    const { poemId } = params;

    try {
        // Dynamic import of the poem JSON file
        // Note: Vite supports dynamic imports of JSON files with variables if they are in a known directory structure
        const poem = await import(`../../../lib/data/poems/${poemId}.json`);

        return {
            poem: poem.default // JSON imports return the object as 'default'
        };
    } catch (e) {
        throw error(404, 'Poem not found');
    }
};

/** @type {import('./$types').EntryGenerator} */
export const entries = () => {
    const modules = import.meta.glob('../../../lib/data/poems/*.json');
    return Object.keys(modules).map((path) => {
        const poemId = path.split('/').pop()?.replace('.json', '');
        return { poemId: poemId! };
    });
};
