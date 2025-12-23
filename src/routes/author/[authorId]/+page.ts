import { error } from '@sveltejs/kit';
import type { PageLoad, EntryGenerator } from './$types';

export const load: PageLoad = async ({ params }) => {
    try {
        const response = await import(`../../../lib/data/authors/${params.authorId}.json`);
        return {
            author: response.default
        };
    } catch (e) {
        throw error(404, 'Author not found');
    }
};

export const entries: EntryGenerator = () => {
    const modules = import.meta.glob('../../../lib/data/authors/*.json');
    return Object.keys(modules).map((path) => {
        const authorId = path.split('/').pop()?.replace('.json', '');
        return { authorId: authorId! };
    });
};
