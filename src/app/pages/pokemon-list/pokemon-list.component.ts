import { Component, DestroyRef, OnInit } from '@angular/core';
import { Pokemon } from '../../models/Pokemon/getPokemonsResponse';
import { PokemonService } from '../../services/pokemon.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    MatButtonModule,
    PokemonCardComponent
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {

  list_of_pokemons: Pokemon[] = [];
  next_is_null: boolean = false;
  previous_is_null: boolean = true;

  constructor(
    private pokemonService: PokemonService,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.pokemonService.pokemons$
    .pipe(
      tap((response) => {
        this.list_of_pokemons = response.results;
        if(response.previous === null) {
          this.previous_is_null = true;
        } else {
          this.previous_is_null = false;
        }

        if(response.next === null) {
          this.next_is_null = true;
        } else {
          this.next_is_null = false;
        }
      }),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe();
  }

  nextPokemons(): void {
    this.pokemonService.nextPokemonOffsetLimit();
  }

  previousPokemons(): void {
    this.pokemonService.previousPokemonOffsetLimit();
  }

}
