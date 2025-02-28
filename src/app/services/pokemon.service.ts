import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { GetPokemonsResponse } from '../models/Pokemon/getPokemonsResponse';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonsOffsetLimit = new BehaviorSubject<{ offset: number, limit: number }>({ offset: 0, limit: 20 });
  pokemonsOffsetLimit$ = this.pokemonsOffsetLimit.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  pokemons$ = this.pokemonsOffsetLimit$.pipe(
    switchMap(({ offset, limit }) => this.getPokemons(offset, limit))
  );

  nextPokemonOffsetLimit(): void {
    this.pokemonsOffsetLimit.next({
      offset: this.pokemonsOffsetLimit.value.offset + 20,
      limit: 20
    });
  }

  previousPokemonOffsetLimit(): void {
    if(this.pokemonsOffsetLimit.value.offset === 0) {
      return;
    }
    this.pokemonsOffsetLimit.next({
      offset: this.pokemonsOffsetLimit.value.offset - 20,
      limit: 20
    });
  }

  getPokemons(
    offset: number = 0,
    limit: number = 20
  ): Observable<GetPokemonsResponse> {
    return this.http.get<GetPokemonsResponse>(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
  }
}
