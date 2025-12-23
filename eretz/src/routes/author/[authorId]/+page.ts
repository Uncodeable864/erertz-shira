import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    try {
        const response = await import(`../../../lib/data/authors/${params.authorId}.json`);
        return {
            author: response.default
        };
    } catch (e) {
        throw error(404, 'Author not found');
    }
};
