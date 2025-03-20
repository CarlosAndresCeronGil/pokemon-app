import { Component, DestroyRef, inject, Injector, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, tap } from 'rxjs';
import { BasePaginationServiceV2 } from '../../../shared/services/base-pagination-v2.service';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { apiBaseShortResponse, apiSingleItemResponse } from '../../../models/Base/apiBaseResponse';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-base-list',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  template: ``,
  styleUrl: './base-list.component.scss',
})
export abstract class BaseListComponent <ASIR extends apiSingleItemResponse> {
  searchTerm = signal<string>('');
  nextIsNull = signal<boolean>(false);
  previousIsNull = signal<boolean>(true);

  protected service = inject(BasePaginationServiceV2<ASIR>) as BasePaginationServiceV2<ASIR>;
  protected destroyRef = inject(DestroyRef);
  protected injector = inject(Injector);

  abstract itemType: WritableSignal<string>;
  protected abstract changeBaseItemName(): void;

  items = toSignal(
    this.service.items$.pipe(
      tap((response) => {
        if (response.previous === null) {
          this.previousIsNull.set(true);
        } else {
          this.previousIsNull.set(false);
        }
      }),
      map((response) => response.results)
    )
  );

  search(): void {
    this.service.updateItemSearched(this.searchTerm());
    this.items = toSignal(
      this.service.itemSearched$.pipe(
        map((response) => {
          return [{
            name: response.name,
            url: `${environment.baseUrlApi}/${this.itemType()}/${response.id}`,
          }];
        }),
        catchError(() => of([]))
      ),
      {
        injector: this.injector,
      }
    );
  }

  next(): void {
    this.service.updateItemPagination(true);
  }

  previous(): void {
    this.service.updateItemPagination(false);
  }
}
