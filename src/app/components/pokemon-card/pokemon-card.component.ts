import { Component, DestroyRef, input, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../models/Pokemon/getPokemonsResponse';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PokemonService } from '../../services/pokemons/pokemon.service';
import { GetSinglePokemonResponse } from '../../models/Pokemon/getSinglePokemonResponse';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pokemon-card',
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  providers: [PokemonService],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent implements OnInit {
  pokemon = input.required<Pokemon>();
  fullPokemonInfo = signal<GetSinglePokemonResponse | undefined>(undefined);

  constructor(
    private route: Router,
    public pokemonService: PokemonService,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.pokemonService.getById(this.pokemon().url)
    .pipe(
      tap((pokemon) => {
        this.fullPokemonInfo.set(pokemon);
      }),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe();
  }

  handleSeeDetails() {
    this.pokemonService.setPersistantPokemonDetail(this.fullPokemonInfo()!);
    this.route.navigate([`/pokemon-detail`]);
  }

}