import { Component, inject, Injector, input, OnInit, Signal } from '@angular/core';
import { ApiSingleMoveResponse } from '../../../models/Moves/apiSingleMoveResponse';
import { environment } from '../../../../environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BasePaginationServiceV2 } from '../../../shared/services/base-pagination-v2.service';

@Component({
  selector: 'app-move-detail',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './move-detail.component.html',
  styles: `
    .card-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100vh - 56px);
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
export class MoveDetailComponent implements OnInit {
  idMove = input.required<number>();
  fullUrl!: string;

  paginationService = inject(BasePaginationServiceV2);
  injector = inject(Injector);

  moveDetail!: Signal<ApiSingleMoveResponse | undefined>;

  ngOnInit(): void {
    this.fullUrl = `${environment.baseUrlApi}/move/${this.idMove()}`;
    this.moveDetail = toSignal(this.paginationService.getItemById(this.fullUrl), {
      injector: this.injector,
    });
  }
}
