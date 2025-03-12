import { Component, DestroyRef, inject, Injector, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MoveCardComponent } from './move-card/move-card.component';
import { BasePaginationServiceV2 } from '../../../shared/services/base-pagination-v2.service';
import { BASE_ITEM_NAME, BASE_SERVICE_TOKEN } from '../../../shared/tokens/injection-tokens';
import { createBasePaginationProvider } from '../../../shared/factories/providers.factory';
import { BaseListComponent } from '../../base/base-list/base-list.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-moves-list',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
    MoveCardComponent,
    SearchBarComponent
  ],
  providers: createBasePaginationProvider('move'),
  templateUrl: './moves-list.component.html',
  styles: `
  @import '../../../../styles.scss';
  mat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    margin: 0 auto;
  }


  .moves-list-title {
      text-align: center;
      margin-bottom: 1rem;
  }

  .loader {
      @include centered-content;
  }

  .move-list-container {
      @include list-container;
  }
  `
})
export class MovesListComponent extends BaseListComponent {
  override itemType = signal<string>('move');

  nextMoves() {
    super.next();
  }

  previousMoves() {
    super.previous();
  }

}
