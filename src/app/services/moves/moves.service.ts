import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, map, Observable, switchMap, tap } from 'rxjs';
import { apiBaseResponse } from '../../models/Base/apiBaseResponse';
import { ApiMovesShortResponse } from '../../models/Moves/apiMovesResponse';
import { ApiSingleMoveResponse } from '../../models/Moves/apiSingleMoveResponse';
import { movesDto } from '../../models/Moves/moveDTO';

@Injectable({
  providedIn: 'root'
})
export class MovesService {
  private movesListLoading = signal<boolean>(false);
  private movesDetailLoading = signal<boolean>(false);

  private movesPaginationLimit = new BehaviorSubject<{
    offset: number;
    limit: number;
  }>({ offset: 0, limit: environment.limitItems });
  movesPaginationLimit$ = this.movesPaginationLimit.asObservable();
  private singleMoveSearched = new BehaviorSubject<string>('');
  singleMoveSearched$ = this.singleMoveSearched.asObservable();

  http = inject(HttpClient);

  moves$ = this.movesPaginationLimit$.pipe(
    tap(() => this.movesListLoading.set(true)),
    switchMap(({ offset, limit }) => this.getMoves(offset, limit))
  );

  moveSeached$ = this.singleMoveSearched$.pipe(
    tap(() => this.movesListLoading.set(true)),
    switchMap((search) => this.searchMove(search))
  );

  updateMovePagination(isNext: boolean): void {
    if (!isNext && this.movesPaginationLimit.value.offset === 0) return;
    this.movesPaginationLimit.next({
      offset: isNext
        ? this.movesPaginationLimit.value.offset + environment.limitItems
        : this.movesPaginationLimit.value.offset - environment.limitItems,
      limit: environment.limitItems,
    });
  }

  updateMoveSearched(search: string): void {
    this.singleMoveSearched.next(search);
  }

  getMoves(
    offset: number = 0,
    limit: number = environment.limitItems
  ): Observable<apiBaseResponse<ApiMovesShortResponse>> {
    return this.http
      .get<apiBaseResponse<ApiMovesShortResponse>>(`${environment.baseUrlApi}/move/?offset=${offset}&limit=${limit}`)
      .pipe(tap(() => this.movesListLoading.set(false)));
  }

  searchMove(
    search: string
  ): Observable<ApiSingleMoveResponse> {
    return this.http
      .get<ApiSingleMoveResponse>(`${environment.baseUrlApi}/move/${search}`)
      .pipe(
        tap(() => this.movesListLoading.set(false)),
        catchError((error) => {
          this.movesListLoading.set(false);
          throw error;
        })
      );
  }

  getMovieById(fullUrl: string): Observable<ApiSingleMoveResponse> {
    this.movesDetailLoading.set(true);
    return this.http.get<ApiSingleMoveResponse>(fullUrl).pipe(
      tap(() => this.movesDetailLoading.set(false)),
      map((response) => new movesDto(response)),
      catchError((error) => {
        this.movesDetailLoading.set(false);
        throw error;
      })
    );
  }

  get movesListIsLoading(): boolean {
    return this.movesListLoading();
  }

  get movesDetailIsLoading(): boolean {
    return this.movesDetailLoading();
  }
}
