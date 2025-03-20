import {
  Component,
  inject,
  Injector,
  input,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { catchError, of, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiSinglePokemonResponse } from '../../../../models/Pokemon/apiSinglePokemonResponse';
import { ApiPokemonShortResponse } from '../../../../models/Pokemon/apiPokemonsResponse';
import { BasePaginationServiceV2 } from '../../../../shared/services/base-pagination-v2.service';
import { NgOptimizedImage } from '@angular/common';
import { PokemonService } from '../../../../services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  imports: [MatCardModule, MatProgressSpinnerModule, MatButtonModule, NgOptimizedImage],
  template: `
    @if(loadingData()) {
    <mat-spinner></mat-spinner>
    } @else {
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ fullPokemonInfo()?.name }}</mat-card-title>
      </mat-card-header>
      <!-- @if(fullPokemonInfo()?.sprites?.front_default) { -->
      @if(hasCurrentSprite()) {
      <img
        mat-card-image
        [ngSrc]="getCurrentSprite()"
        priority
        width="200"
        height="200"
        alt="Photo of {{ fullPokemonInfo()?.name }}"
      />
      } @else {
      <img
        ngSrc="assets/images/pokeball.png"
        priority
        width="200"
        height="200"
        alt="Photo of {{ fullPokemonInfo()?.name }}"
      />
      }
      <mat-card-actions>
        <button mat-button (click)="handleSeeDetails()">DETAILS</button>
      </mat-card-actions>
    </mat-card>
    }
  `,
  styles: `
      mat-card {
      background-color: #FFCC66;
      color: white;
      margin: 10px;
      width: 200px;
      display: flex;
      flex-direction: column;
      }

      mat-card-content {
        overflow-x: scroll;
      }
  `,
})
export class PokemonCardComponent implements OnInit {
  pokemon = input.required<ApiPokemonShortResponse>();
  fullPokemonInfo!: Signal<ApiSinglePokemonResponse | undefined>;
  loadingData = signal<boolean>(false);

  private paginationService = inject(BasePaginationServiceV2) as BasePaginationServiceV2<ApiSinglePokemonResponse>;
  public pokemonService = inject(PokemonService);
  route = inject(Router);
  injector = inject(Injector);

  ngOnInit(): void {
    this.loadingData.set(true);
    this.fullPokemonInfo = toSignal(
      this.paginationService.getItemById(this.pokemon().url).pipe(
        tap(() => this.loadingData.set(false)),
        catchError(() => {
          this.loadingData.set(false);
          return of(undefined);
        })
      ),
      {
        injector: this.injector,
      }
    );
  }

  hasCurrentSprite(): boolean {
    const option = this.pokemonService.currentPokemonImageOption();
    return !!(this.fullPokemonInfo()?.sprites)?.[option];
  }

  getCurrentSprite(): string {
    const option = this.pokemonService.currentPokemonImageOption();
    return (this.fullPokemonInfo()?.sprites)?.[option] || 'assets/images/pokeball.png';
  }

  handleSeeDetails() {
    this.route.navigate([`/pokemon-detail`, this.fullPokemonInfo()!.id]);
  }
}
