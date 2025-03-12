import { apiBaseShortResponse } from "../Base/apiBaseResponse";

export type ApiPokemonShortResponse = apiBaseShortResponse;

export type ApiPokemonsResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: ApiPokemonShortResponse[];
};
