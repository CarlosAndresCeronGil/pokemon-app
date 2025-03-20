import { Component, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MoveCardComponent } from './move-card/move-card.component';
import { BaseListComponent } from '../../base/base-list/base-list.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { ApiMovesShortResponse } from '../../../models/Moves/apiMovesResponse';
import { ApiSingleMoveResponse } from '../../../models/Moves/apiSingleMoveResponse';
import { apiBaseShortResponse } from '../../../models/Base/apiBaseResponse';

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
export class MovesListComponent extends BaseListComponent<ApiSingleMoveResponse> {
  override itemType = signal<string>('move');

  protected override changeBaseItemName(): void {
    this.service.changeBaseItemName('move');
  }

  nextMoves() {
    super.next();
  }

  previousMoves() {
    super.previous();
  }

}
