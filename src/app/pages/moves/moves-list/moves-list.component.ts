import { Component, DestroyRef, inject, Injector, signal } from '@angular/core';
import { MovesService } from '../../../services/moves/moves.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MoveCardComponent } from './move-card/move-card.component';

@Component({
  selector: 'app-moves-list',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
    MoveCardComponent
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
export class MovesListComponent {
  searchMoves = signal<string>('');
  nextIsNull = signal<boolean>(false);
  previousIsNull = signal<boolean>(true);

  movesService = inject(MovesService);
  destroyRef = inject(DestroyRef);
  injector = inject(Injector);

  listOfMoves = toSignal(this.movesService.items$.pipe(
    tap((response) => {
      if (response.previous === null) {
        this.previousIsNull.set(true);
      } else {
        this.previousIsNull.set(false);
      }
    }),
    map((response) => response.results)
  ));

  searcForhMoves() {
    this.movesService.updateItemSearched(this.searchMoves());
    this.listOfMoves = toSignal(this.movesService.itemSearched$.pipe(
      map((response) => [{ name: response.name, url: environment.baseUrlApi + '/move/' + response.id}]),
      catchError(() => of([]))
    ), {
      injector: this.injector,
    });
  }

  nextMoves() {
    this.movesService.updateItemPagination(true);
  }

  previousMoves() {
    this.movesService.updateItemPagination(false);
  }

}
