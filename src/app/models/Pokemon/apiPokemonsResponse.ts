export type ApiPokemonShortResponse = {
    name: string;
    url: string;
};

export type ApiPokemonsResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: ApiPokemonShortResponse[];
};
