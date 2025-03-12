import { Inject, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiBaseResponse } from '../../models/Base/apiBaseResponse';
import { BASE_ITEM_NAME } from '../tokens/injection-tokens';
import { IBaseService } from '../../models/Base/baseService';
import { itemName } from '../../models/Base/itemName';
@Injectable()
// ASHR = API SINGLE SHORT RESPONSE
// ASIR = API SINGLE ITEM RESPONSE
export class BasePaginationServiceV2<ASHR, ASIR> implements IBaseService<ASHR, ASIR> {
  baseItemName: string

  itemListLoading = signal<boolean>(false);
  itemDetailLoading = signal<boolean>(false);

  constructor(@Inject(BASE_ITEM_NAME) baseItemName: itemName) {
    this.baseItemName = baseItemName;
  }

  private itemPaginationLimit = new BehaviorSubject<{
    offset: number;
    limit: number;
  }> ({ offset: 0, limit: environment.limitItems });
  itemPaginationLimit$ = this.itemPaginationLimit.asObservable();
  private singleItemSearched = new BehaviorSubject<string>('');
  singleItemSearched$ = this.singleItemSearched.asObservable();

  http = inject(HttpClient);

  items$ = this.itemPaginationLimit$.pipe(
    tap(() => this.itemListLoading.set(true)),
    switchMap(({ offset, limit }) => this.getItems(offset, limit))
  );

  itemSearched$ = this.singleItemSearched$.pipe(
    tap(() => this.itemListLoading.set(true)),
    switchMap((search) => this.searchItem(search))
  );

  updateItemPagination(isNext: boolean): void {
    if (!isNext && this.itemPaginationLimit.value.offset === 0) return;
    this.itemPaginationLimit.next({
      offset: isNext
        ? this.itemPaginationLimit.value.offset + environment.limitItems
        : this.itemPaginationLimit.value.offset - environment.limitItems,
      limit: environment.limitItems,
    });
  }

  updateItemSearched(search: string): void {
    this.singleItemSearched.next(search);
  }

  getItems(
    offset: number = 0,
    limit: number = environment.limitItems,
  ): Observable<apiBaseResponse<ASHR>> {
    return this.http
      .get<apiBaseResponse<ASHR>>(`${environment.baseUrlApi}/${this.baseItemName}/?offset=${offset}&limit=${limit}`)
      .pipe(tap(() => this.itemListLoading.set(false)));
  }

  searchItem(
    search: string
  ): Observable<ASIR> {
    return this.http
      .get<ASIR>(`${environment.baseUrlApi}/${this.baseItemName}/${search}`)
      .pipe(
        tap(() => this.itemListLoading.set(false)),
        catchError((error) => {
          this.itemListLoading.set(false);
          throw error;
        })
      )
  }

  getItemById(fullUrl: string): Observable<ASIR> {
    this.itemDetailLoading.set(true);
    return this.http.get<ASIR>(fullUrl).pipe(
      tap(() => this.itemDetailLoading.set(false))
    )
  }

  get itemDetailIsLoading(): boolean {
    return this.itemDetailLoading();
  }

  get itemListIsLoading(): boolean {
    return this.itemListLoading();
  }
}
