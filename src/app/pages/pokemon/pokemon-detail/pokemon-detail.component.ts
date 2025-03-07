import {
  Component,
  inject,
  Injector,
  input,
  OnInit,
  Signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonService } from '../../../services/pokemons/pokemon.service';
import { ApiSinglePokemonResponse } from '../../../models/Pokemon/apiSinglePokemonResponse';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-pokemon-detail',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './pokemon-detail.component.html',
  styles: `
    .card-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100vh - 56px);
    }

    mat-card {
        background-color: #FFCC66;
        color: white;
        margin: 10px;
        width: 400px;
        display: flex;
        flex-direction: column;
    }
  `,
})
export class PokemonDetailComponent implements OnInit {
  idPokemon = input.required<number>();
  fullUrl!: string;

  pokemonService = inject(PokemonService);
  injector = inject(Injector);

  pokemonDetail!: Signal<ApiSinglePokemonResponse | undefined>;

  ngOnInit(): void {
    this.fullUrl = `${environment.baseUrlApi}/pokemon/${this.idPokemon()}`;
    this.pokemonDetail = toSignal(this.pokemonService.getById(this.fullUrl), {
      injector: this.injector,
    });
  }
}
