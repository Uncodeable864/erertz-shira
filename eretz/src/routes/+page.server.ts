import allPoems from '$lib/data/all-poems.json';

export const load = async () => {
    return {
        poems: allPoems
    };
};
