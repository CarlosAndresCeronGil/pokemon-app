import { Ability, ApiSinglePokemonResponse, Cries, Form, GameIndex, HeldItem, Move, PastType, Species, Sprites, Stat, Type } from "./apiSinglePokemonResponse";

export class PokemonDto implements ApiSinglePokemonResponse {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Ability[];
    forms: Form[];
    game_indices: GameIndex[];
    held_items: HeldItem[];
    location_area_encounters: string;
    moves: Move[];
    species: Species;
    sprites: Sprites;
    cries: Cries;
    stats: Stat[];
    types: Type[];
    past_types: PastType[];

    constructor(params: ApiSinglePokemonResponse) {
        this.id = params.id;
        this.name = params.name;
        this.base_experience = params.base_experience;
        this.height = params.height;
        this.is_default = params.is_default;
        this.order = params.order;
        this.weight = params.weight;
        this.abilities = params.abilities;
        this.forms = params.forms;
        this.game_indices = params.game_indices;
        this.held_items = params.held_items;
        this.location_area_encounters = params.location_area_encounters;
        this.moves = params.moves;
        this.species = params.species;
        this.sprites = params.sprites;
        this.cries = params.cries;
        this.stats = params.stats;
        this.types = params.types;
        this.past_types = params.past_types;
    }
}