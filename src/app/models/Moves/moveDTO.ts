import { ApiSingleMoveResponse, ContestCombo, ContestEffect, ContestType, DamageClass, EffectEntry, FlavorTextEntry, Generation, LearnedByPokemon, Meta, Name, SuperContestEffect, Target, Type } from "./apiSingleMoveResponse";

export class movesDto implements ApiSingleMoveResponse {
    accuracy: number;
    contest_combos: { normal: ContestCombo; super: ContestCombo; };
    contest_effect: ContestEffect;
    contest_type: ContestType;
    damage_class: DamageClass;
    effect_chance: any;
    effect_changes: any[];
    effect_entries: EffectEntry[];
    flavor_text_entries: FlavorTextEntry[];
    generation: Generation;
    id: number;
    learned_by_pokemon: LearnedByPokemon[];
    machines: any[];
    meta: Meta;
    name: string;
    names: Name[];
    past_values: any[];
    power: number;
    pp: number;
    priority: number;
    stat_changes: any[];
    super_contest_effect: SuperContestEffect;
    target: Target;
    type: Type;

    constructor(params: ApiSingleMoveResponse) {
        this.accuracy = params.accuracy;
        this.contest_combos = params.contest_combos;
        this.contest_effect = params.contest_effect;
        this.contest_type = params.contest_type;
        this.damage_class = params.damage_class;
        this.effect_chance = params.effect_chance;
        this.effect_changes = params.effect_changes;
        this.effect_entries = params.effect_entries;
        this.flavor_text_entries = params.flavor_text_entries;
        this.generation = params.generation;
        this.id = params.id;
        this.learned_by_pokemon = params.learned_by_pokemon;
        this.machines = params.machines;
        this.meta = params.meta;
        this.name = params.name;
        this.names = params.names;
        this.past_values = params.past_values;
        this.power = params.power;
        this.pp = params.pp;
        this.priority = params.priority;
        this.stat_changes = params.stat_changes;
        this.super_contest_effect = params.super_contest_effect;
        this.target = params.target;
        this.type = params.type;
    }
}