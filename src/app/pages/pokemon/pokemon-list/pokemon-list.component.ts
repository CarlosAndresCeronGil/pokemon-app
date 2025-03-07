import { Component, DestroyRef, inject, Injector, signal } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { PokemonService } from '../../../services/pokemons/pokemon.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
    PokemonCardComponent
  ],
  templateUrl: './pokemon-list.component.html',
  styles: `
  @import '../../../../styles.scss';
  mat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    margin: 0 auto;
  }

  .pokemon-list-title {
      text-align: center;
      margin-bottom: 1rem;
  }

  .loader {
      @include centered-content;
  }

  .pokemon-list-container {
      @include list-container;
  }
  `,
})
export class PokemonListComponent {
  searchPokemon = signal<string>('');
  nextIsNull = signal<boolean>(false);
  previousIsNull = signal<boolean>(true);

  pokemonService = inject(PokemonService);
  destroyRef = inject(DestroyRef);
  injector = inject(Injector);

  listOfPokemons = toSignal(this.pokemonService.items$.pipe(
    tap((response) => {
      if (response.previous === null) {
        this.previousIsNull.set(true);
      } else {
        this.previousIsNull.set(false);
      }

      if (response.next === null) {
        this.nextIsNull.set(true);
      } else {
        this.nextIsNull.set(false);
      }
    }),
    map((response) => response.results),
  ));

  searchForAPokemon(): void {
    this.pokemonService.updateItemSearched(this.searchPokemon());
    this.listOfPokemons = toSignal(this.pokemonService.itemSearched$.pipe(
      map((response) => [{ name: response.name, url: environment.baseUrlApi + '/pokemon/' + response.id }]),
      catchError(() => of([]))
    ), {
      injector: this.injector
    });;
  }

  nextPokemons(): void {
    this.pokemonService.updateItemPagination(true);
  }

  previousPokemons(): void {
    this.pokemonService.updateItemPagination(false);
  }
}
