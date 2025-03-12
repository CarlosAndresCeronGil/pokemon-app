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
import { tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiSinglePokemonResponse } from '../../../../models/Pokemon/apiSinglePokemonResponse';
import { ApiPokemonShortResponse } from '../../../../models/Pokemon/apiPokemonsResponse';
import { BasePaginationServiceV2 } from '../../../../shared/services/base-pagination-v2.service';

@Component({
  selector: 'app-pokemon-card',
  imports: [MatCardModule, MatProgressSpinnerModule, MatButtonModule],
  template: `
    @if(loadingData()) {
    <mat-spinner></mat-spinner>
    } @else {
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ fullPokemonInfo()?.name }}</mat-card-title>
      </mat-card-header>
      <img
        mat-card-image
        [src]="fullPokemonInfo()?.sprites?.front_default"
        alt="Photo of {{ fullPokemonInfo()?.name }}"
      />
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

  route = inject(Router);
  paginationService = inject(BasePaginationServiceV2);
  injector = inject(Injector);

  ngOnInit(): void {
    this.loadingData.set(true);
    this.fullPokemonInfo = toSignal(
      this.paginationService.getItemById(this.pokemon().url).pipe(tap(() => this.loadingData.set(false))),
      {
        injector: this.injector,
      }
    );
  }

  handleSeeDetails() {
    this.route.navigate([`/pokemon-detail`, this.fullPokemonInfo()!.id]);
  }
}
