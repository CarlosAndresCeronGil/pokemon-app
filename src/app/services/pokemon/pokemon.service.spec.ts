import { TestBed } from '@angular/core/testing';

import { PokemonImageOptionsService } from './pokemonImageOptions.service';

describe('PokemonService', () => {
  let service: PokemonImageOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonImageOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
