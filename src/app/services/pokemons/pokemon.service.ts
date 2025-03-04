import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { ApiPokemonShortResponse } from '../../models/Pokemon/apiPokemonsResponse';
import { apiBaseResponse } from '../../models/Base/apiBaseResponse';
import { ApiSinglePokemonResponse } from '../../models/Pokemon/apiSinglePokemonResponse';
import { environment } from '../../../environments/environment';
import { PokemonDto } from '../../models/Pokemon/pokemonDTO';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonListLoading = signal<boolean>(false);
  private pokemonDetailLoading = signal<boolean>(false);

  private pokemonsOffsetLimit = new BehaviorSubject<{ offset: number, limit: number }>({ offset: 0, limit: environment.limitItems });
  pokemonsOffsetLimit$ = this.pokemonsOffsetLimit.asObservable();

  http = inject(HttpClient);

  pokemons$ = this.pokemonsOffsetLimit$.pipe(
    tap(() => this.pokemonListLoading.set(true)),
    switchMap(({ offset, limit }) => this.getPokemons(offset, limit))
  );

  handlePokemonOffsetLimit(isNext: boolean): void {
    if(!isNext && this.pokemonsOffsetLimit.value.offset === 0) return;
    this.pokemonsOffsetLimit.next({
      offset: isNext ? this.pokemonsOffsetLimit.value.offset + environment.limitItems : this.pokemonsOffsetLimit.value.offset - environment.limitItems,
      limit: environment.limitItems
    });
  }

  getPokemons(
    offset: number = 0,
    limit: number = environment.limitItems
  ): Observable<apiBaseResponse<ApiPokemonShortResponse>> {
    return this.http.get<apiBaseResponse<ApiPokemonShortResponse>>(`${environment.baseUrlApi}/pokemon/?offset=${offset}&limit=${limit}`)
      .pipe(
        tap(() => this.pokemonListLoading.set(false))
      )
  }

  getById(fullUrl: string): Observable<ApiSinglePokemonResponse> {
    this.pokemonDetailLoading.set(true);
    return this.http.get<ApiSinglePokemonResponse>(fullUrl)
      .pipe(
        tap(() => this.pokemonDetailLoading.set(false)),
        map((response) => new PokemonDto(response))
      );
  }

  get pokemonListIsLoading(): boolean {
    return this.pokemonListLoading();
  }

  get pokemonDetailIsLoading(): boolean {
    return this.pokemonDetailLoading();
  }
}
