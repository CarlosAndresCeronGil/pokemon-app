import { Component, inject, Injector, input, signal, Signal } from '@angular/core';
import { ApiMovesShortResponse } from '../../../../models/Moves/apiMovesResponse';
import { ApiSingleMoveResponse } from '../../../../models/Moves/apiSingleMoveResponse';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { BasePaginationServiceV2 } from '../../../../shared/services/base-pagination-v2.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-move-card',
  imports: [MatCardModule, MatProgressSpinnerModule, MatButtonModule],
  template: `
    @if(loadingData()) {
    <mat-spinner></mat-spinner>
    } @else {
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ fullMoveResponse()?.name }}</mat-card-title>
      </mat-card-header>
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
export class MoveCardComponent {
  move = input.required<ApiMovesShortResponse>();
  fullMoveResponse!: Signal<ApiSingleMoveResponse | undefined>;
  loadingData = signal<boolean>(false);

  route = inject(Router);
  paginationService = inject(BasePaginationServiceV2);
  injector = inject(Injector);

  ngOnInit(): void {
    this.loadingData.set(true);
    this.fullMoveResponse = toSignal(
      this.paginationService.getItemById(this.move().url).pipe(tap(() => this.loadingData.set(false))),
      {
        injector: this.injector,
      }
    );
  }

  handleSeeDetails() {
    this.route.navigate([`/move-detail`, this.fullMoveResponse()!.id]);
  }
}
