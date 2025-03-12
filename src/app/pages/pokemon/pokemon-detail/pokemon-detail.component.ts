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
import { ApiSinglePokemonResponse } from '../../../models/Pokemon/apiSinglePokemonResponse';
import { environment } from '../../../../environments/environment';
import { BasePaginationServiceV2 } from '../../../shared/services/base-pagination-v2.service';
import { createBasePaginationProvider } from '../../../shared/factories/providers.factory';

@Component({
  selector: 'app-pokemon-detail',
  imports: [MatButtonModule, MatCardModule],
  providers: createBasePaginationProvider('pokemon'),
  templateUrl: './pokemon-detail.component.html',
  styles: `
    .card-container {
      display: flex;
      justify-content: center;
      align-items: center;
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

  basePaginationService = inject(BasePaginationServiceV2);
  injector = inject(Injector);

  pokemonDetail!: Signal<ApiSinglePokemonResponse | undefined>;

  ngOnInit(): void {
    this.fullUrl = `${environment.baseUrlApi}/pokemon/${this.idPokemon()}`;
    this.pokemonDetail = toSignal(this.basePaginationService.getItemById(this.fullUrl), {
      injector: this.injector,
    });
  }
}
