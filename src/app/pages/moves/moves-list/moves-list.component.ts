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
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .move-list-container {
      padding: 5PX;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
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

  listOfMoves = toSignal(this.movesService.moves$.pipe(
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
    this.movesService.updateMoveSearched(this.searchMoves());
    this.listOfMoves = toSignal(this.movesService.moveSeached$.pipe(
      map((response) => [{ name: response.name, url: environment.baseUrlApi + '/move/' + response.id}]),
      catchError(() => of([]))
    ), {
      injector: this.injector,
    });
  }

  nextMoves() {
    this.movesService.updateMovePagination(true);
  }

  previousMoves() {
    this.movesService.updateMovePagination(false);
  }

}
