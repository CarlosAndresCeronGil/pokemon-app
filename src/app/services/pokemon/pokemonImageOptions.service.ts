import { Injectable, signal } from '@angular/core';
import { Sprites } from '../../models/Pokemon/apiSinglePokemonResponse';

type PokemonImageOption = {
    key: keyof Sprites;
    value: string;
}

@Injectable()
export class PokemonImageOptionsService {

    POKEMON_IMAGES_OPTIONS: PokemonImageOption[] = [
        { key: 'front_default', value: 'Front Default' },
        { key: 'back_default', value: 'Back Default' },
        { key: 'front_shiny', value: 'Front Shiny' },
        { key: 'back_shiny', value: 'Back Shiny' },
        { key: 'front_female', value: 'Front Female' },
        { key: 'back_female', value: 'Back Female' },
        { key: 'front_shiny_female', value: 'Front Shiny Female' },
        { key: 'back_shiny_female', value: 'Back Shiny Female' },
    ];

    private _currentPokemonImageOption = signal<keyof Sprites>(this.POKEMON_IMAGES_OPTIONS[0].key);

    getCurrentPokemonImageOption(): keyof Sprites {
        return this._currentPokemonImageOption();
    }

    setCurrentPokemonImageOption(option: keyof Sprites): void {
        if (this.POKEMON_IMAGES_OPTIONS.some(opt => opt.key === option)) {
            this._currentPokemonImageOption.set(option);
        } else {
            console.error(`Invalid Pokemon image option: ${option}`);
        }
    }

}
