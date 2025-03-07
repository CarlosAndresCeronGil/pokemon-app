import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, switchMap, tap } from 'rxjs';
import { ApiPokemonShortResponse } from '../../models/Pokemon/apiPokemonsResponse';
import { apiBaseResponse } from '../../models/Base/apiBaseResponse';
import { ApiSinglePokemonResponse } from '../../models/Pokemon/apiSinglePokemonResponse';
import { environment } from '../../../environments/environment';
import { PokemonDto } from '../../models/Pokemon/pokemonDTO';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemonListLoading = signal<boolean>(false);
  private pokemonDetailLoading = signal<boolean>(false);

  private pokemonPaginationLimit = new BehaviorSubject<{
    offset: number;
    limit: number;
  }>({ offset: 0, limit: environment.limitItems });
  pokemonsPaginationLimit$ = this.pokemonPaginationLimit.asObservable();
  private singlePokemonSeached = new BehaviorSubject<string>('');
  singlePokemonSeached$ = this.singlePokemonSeached.asObservable();

  http = inject(HttpClient);

  pokemons$ = this.pokemonsPaginationLimit$.pipe(
    tap(() => this.pokemonListLoading.set(true)),
    switchMap(({ offset, limit }) => this.getPokemons(offset, limit))
  );

  pokemonSeached$ = this.singlePokemonSeached$.pipe(
    tap(() => this.pokemonListLoading.set(true)),
    switchMap((search) => this.searchPokemon(search))
  );

  updatePokemonPagination(isNext: boolean): void {
    if (!isNext && this.pokemonPaginationLimit.value.offset === 0) return;
    this.pokemonPaginationLimit.next({
      offset: isNext
        ? this.pokemonPaginationLimit.value.offset + environment.limitItems
        : this.pokemonPaginationLimit.value.offset - environment.limitItems,
      limit: environment.limitItems,
    });
  }

  updatePokemonSearched(search: string): void {
    this.singlePokemonSeached.next(search);
  }

  getPokemons(
    offset: number = 0,
    limit: number = environment.limitItems
  ): Observable<apiBaseResponse<ApiPokemonShortResponse>> {
    return this.http
      .get<apiBaseResponse<ApiPokemonShortResponse>>(
        `${environment.baseUrlApi}/pokemon/?offset=${offset}&limit=${limit}`
      )
      .pipe(tap(() => this.pokemonListLoading.set(false)));
  }

  searchPokemon(search: string): Observable<ApiSinglePokemonResponse> {
    return this.http
      .get<ApiSinglePokemonResponse>(
        `${environment.baseUrlApi}/pokemon/${search}`
      )
      .pipe(
        tap(() => this.pokemonListLoading.set(false)),
        catchError((error) => {
          this.pokemonListLoading.set(false);
          throw error;
        })
      );
  }

  getById(fullUrl: string): Observable<ApiSinglePokemonResponse> {
    this.pokemonDetailLoading.set(true);
    return this.http.get<ApiSinglePokemonResponse>(fullUrl).pipe(
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
