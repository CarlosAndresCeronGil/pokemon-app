import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { GetSinglePokemonResponse } from '../../models/Pokemon/getSinglePokemonResponse';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pokemon-detail',
  imports: [
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent implements OnInit {
  pokemonDetail!: WritableSignal<GetSinglePokemonResponse | undefined>;

  constructor(
    private pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    this.pokemonDetail = this.pokemonService.selectedPokemonDetail;
    console.log(`this.pokemonDetail`, this.pokemonDetail());
  }

}
