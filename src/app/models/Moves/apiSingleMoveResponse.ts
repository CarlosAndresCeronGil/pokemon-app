export interface ContestCombo {
    use_after: null | any;
    use_before: Array<{
        name: string;
        url: string;
    }>;
}

export interface ContestEffect {
    url: string;
}

export interface ContestType {
    name: string;
    url: string;
}

export interface DamageClass {
    name: string;
    url: string;
}

export interface EffectEntry {
    effect: string;
    language: {
        name: string;
        url: string;
    };
    short_effect: string;
}

export interface FlavorTextEntry {
    flavor_text: string;
    language: {
        name: string;
        url: string;
    };
    version_group: {
        name: string;
        url: string;
    };
}

export interface Generation {
    name: string;
    url: string;
}

export interface LearnedByPokemon {
    name: string;
    url: string;
}

export interface Meta {
    ailment: {
        name: string;
        url: string;
    };
    ailment_chance: number;
    category: {
        name: string;
        url: string;
    };
    crit_rate: number;
    drain: number;
    flinch_chance: number;
    healing: number;
    max_hits: null | any;
    max_turns: null | any;
    min_hits: null | any;
    min_turns: null | any;
    stat_chance: number;
}

export interface Name {
    language: {
        name: string;
        url: string;
    };
    name: string;
}

export interface SuperContestEffect {
    url: string;
}

export interface Target {
    name: string;
    url: string;
}

export interface Type {
    name: string;
    url: string;
}

export interface ApiSingleMoveResponse {
    accuracy: number;
    contest_combos: {
        normal: ContestCombo;
        super: ContestCombo;
    };
    contest_effect: ContestEffect;
    contest_type: ContestType;
    damage_class: DamageClass;
    effect_chance: null | any;
    effect_changes: Array<any>;
    effect_entries: Array<EffectEntry>;
    flavor_text_entries: Array<FlavorTextEntry>;
    generation: Generation;
    id: number;
    learned_by_pokemon: Array<LearnedByPokemon>;
    machines: Array<any>;
    meta: Meta;
    name: string;
    names: Array<Name>;
    past_values: Array<any>;
    power: number;
    pp: number;
    priority: number;
    stat_changes: Array<any>;
    super_contest_effect: SuperContestEffect;
    target: Target;
    type: Type;
}