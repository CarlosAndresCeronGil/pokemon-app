import { Component, input } from '@angular/core';
import { Pokemon } from '../../models/Pokemon/getPokemonsResponse';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pokemon-card',
  imports: [
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  pokemon = input.required<Pokemon>();

  constructor() { }
}
