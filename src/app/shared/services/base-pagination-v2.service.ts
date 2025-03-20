import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiBaseResponse } from '../../models/Base/apiBaseResponse';
import { IBaseService } from '../../models/Base/baseService';
import { itemName } from '../../models/Base/itemName';
@Injectable()
// ASIR = API SINGLE ITEM RESPONSE
export class BasePaginationServiceV2<apiSingleItemResponse> implements IBaseService<apiSingleItemResponse> {
  baseItemName: itemName = 'pokemon';

  itemListLoading = signal<boolean>(false);

  changeBaseItemName(baseItemName: itemName): void {
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
    switchMap((search) => {
      return this.searchItem(search)
    })
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
  ): Observable<apiBaseResponse> {
    return this.http
      .get<apiBaseResponse>(`${environment.baseUrlApi}/${this.baseItemName}/?offset=${offset}&limit=${limit}`)
      .pipe(tap(() => this.itemListLoading.set(false)));
  }

  searchItem(
    search: string
  ): Observable<apiSingleItemResponse> {
    return this.http
      .get<apiSingleItemResponse>(`${environment.baseUrlApi}/${this.baseItemName}/${search}`)
      .pipe(
        tap(() => {
          this.itemListLoading.set(false);
        }),
        catchError((error) => {
          this.itemListLoading.set(false);
          throw error;
        })
      )
  }

  getItemById(fullUrl: string): Observable<apiSingleItemResponse> {
    return this.http.get<apiSingleItemResponse>(fullUrl)
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  get itemListIsLoading(): boolean {
    return this.itemListLoading();
  }
}
