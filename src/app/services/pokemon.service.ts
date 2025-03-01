import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, mergeMap, Observable, switchMap } from 'rxjs';
import { Pokemon } from '../models/Pokemon/getPokemonsResponse';
import { BaseResponse } from '../models/Base/baseResponse';
import { GetSinglePokemonResponse } from '../models/Pokemon/getSinglePokemonResponse';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonsOffsetLimit = new BehaviorSubject<{ offset: number, limit: number }>({ offset: 0, limit: 10 });
  pokemonsOffsetLimit$ = this.pokemonsOffsetLimit.asObservable();

  selectedPokemonDetail = signal<GetSinglePokemonResponse | undefined>(this.getPersistantPokemonDetail());

  constructor(
    private http: HttpClient
  ) { }

  pokemons$ = this.pokemonsOffsetLimit$.pipe(
    switchMap(({ offset, limit }) => this.getPokemons(offset, limit))
  );

  nextPokemonOffsetLimit(): void {
    this.pokemonsOffsetLimit.next({
      offset: this.pokemonsOffsetLimit.value.offset + 10,
      limit: 10
    });
  }

  previousPokemonOffsetLimit(): void {
    if(this.pokemonsOffsetLimit.value.offset === 0) {
      return;
    }
    this.pokemonsOffsetLimit.next({
      offset: this.pokemonsOffsetLimit.value.offset - 10,
      limit: 10
    });
  }

  getPersistantPokemonDetail(): GetSinglePokemonResponse | undefined {
    return localStorage.getItem('selectedPokemonDetail') ? JSON.parse(localStorage.getItem('selectedPokemonDetail')!) : undefined;
  }

  setPersistantPokemonDetail(pokemon: GetSinglePokemonResponse): void {
    this.selectedPokemonDetail.set(pokemon);
    localStorage.setItem('selectedPokemonDetail', JSON.stringify(pokemon));
  }

  getPokemons(
    offset: number = 0,
    limit: number = 10
  ): Observable<BaseResponse<Pokemon>> {
    return this.http.get<BaseResponse<Pokemon>>(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
  }

  getById(fullUrl: string): Observable<GetSinglePokemonResponse> {
    return this.http.get<GetSinglePokemonResponse>(fullUrl);
  }
}
