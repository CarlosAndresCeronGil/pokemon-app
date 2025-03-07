import {
  Component,
  DestroyRef,
  inject,
  Injector,
  input,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PokemonService } from '../../../../services/pokemons/pokemon.service';
import { ApiSinglePokemonResponse } from '../../../../models/Pokemon/apiSinglePokemonResponse';
import { ApiPokemonShortResponse } from '../../../../models/Pokemon/apiPokemonsResponse';

@Component({
  selector: 'app-pokemon-card',
  imports: [MatCardModule, MatProgressSpinnerModule, MatButtonModule],
  providers: [PokemonService],
  template: `
    @if(pokemonService.itemDetailIsLoading) {
    <mat-spinner></mat-spinner>
    } @else {
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ fullPokemonInfo()?.name }}</mat-card-title>
      </mat-card-header>
      <img
        mat-card-image
        [src]="fullPokemonInfo()?.sprites?.front_default"
        alt="Photo of {{ fullPokemonInfo()?.name }}"
      />
      <mat-card-actions>
        <button mat-button (click)="handleSeeDetails()">DETAILS</button>
      </mat-card-actions>
    </mat-card>
    }
  `,
  styles: `
      mat-card {
      background-color: #FFCC66;
      color: white;
      margin: 10px;
      width: 200px;
      display: flex;
      flex-direction: column;
      }

      mat-card-content {
        overflow-x: scroll;
      }
  `,
})
export class PokemonCardComponent implements OnInit {
  pokemon = input.required<ApiPokemonShortResponse>();
  fullPokemonInfo!: Signal<ApiSinglePokemonResponse | undefined>;

  route = inject(Router);
  pokemonService = inject(PokemonService);
  injector = inject(Injector);

  ngOnInit(): void {
    this.fullPokemonInfo = toSignal(
      this.pokemonService.getItemById(this.pokemon().url),
      {
        injector: this.injector,
      }
    );
  }

  handleSeeDetails() {
    this.route.navigate([`/pokemon-detail`, this.fullPokemonInfo()!.id]);
  }
}
