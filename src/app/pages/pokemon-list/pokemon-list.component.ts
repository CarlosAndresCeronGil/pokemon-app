import { Component, DestroyRef, inject, Injector, OnInit, Signal } from '@angular/core';
import { ApiPokemonShortResponse } from '../../models/Pokemon/apiPokemonsResponse';
import { PokemonService } from '../../services/pokemons/pokemon.service';
import { map, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { apiBaseResponse } from '../../models/Base/apiBaseResponse';

@Component({
  selector: 'app-pokemon-list',
  imports: [MatButtonModule, MatProgressSpinnerModule, PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
  styles: `
  .pokemon-list-title {
      text-align: center;
      margin-bottom: 1rem;
  }

  .loader {
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .pokemon-list-container {
      padding: 5PX;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
  }
  `,
})
export class PokemonListComponent implements OnInit {
  listOfPokemons: ApiPokemonShortResponse[] = [];
  nextIsNull: boolean = false;
  previousIsNull: boolean = true;

  listOfPokemonsV2!: Signal<ApiPokemonShortResponse[] | undefined>;

  pokemonService = inject(PokemonService);
  destroyRef = inject(DestroyRef);
  injector = inject(Injector);

  ngOnInit(): void {
    this.listOfPokemonsV2 = toSignal(this.pokemonService.pokemons$.pipe(
      tap((response) => {
        if (response.previous === null) {
          this.previousIsNull = true;
        } else {
          this.previousIsNull = false;
        }

        if (response.next === null) {
          this.nextIsNull = true;
        } else {
          this.nextIsNull = false;
        }
      }),
      map((response) => response.results),
    ), {
      injector: this.injector,
    })
  }

  nextPokemons(): void {
    this.pokemonService.handlePokemonOffsetLimit(true);
  }

  previousPokemons(): void {
    this.pokemonService.handlePokemonOffsetLimit(false);
  }
}
