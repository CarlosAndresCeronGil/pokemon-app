import { Injectable } from '@angular/core';
import { ApiPokemonShortResponse } from '../../models/Pokemon/apiPokemonsResponse';
import { ApiSinglePokemonResponse } from '../../models/Pokemon/apiSinglePokemonResponse';
import { BasePaginationService } from '../../shared/services/base-pagination.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService extends BasePaginationService<ApiPokemonShortResponse, ApiSinglePokemonResponse> {
  protected override baseItemName: string = 'pokemon';
}
