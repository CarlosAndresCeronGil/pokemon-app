export type Pokemon = {
    name: string;
    url: string;
};

export type GetPokemonsResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
};
