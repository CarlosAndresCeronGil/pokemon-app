import { WritableSignal } from "@angular/core";
import { Observable } from "rxjs";
import { apiBaseResponse } from "./apiBaseResponse";

export interface IBaseService<T, D> {
    baseItemName: string;
    itemListLoading: WritableSignal<boolean>;
    itemDetailLoading: WritableSignal<boolean>;
    itemPaginationLimit$: Observable<{offset: number, limit: number}>;
    singleItemSearched$: Observable<string>;
    items$: Observable<apiBaseResponse<T>>;
    itemSearched$: Observable<D>;
    updateItemPagination(isNext: boolean): void;
    updateItemSearched(search: string): void;
    getItems(offset?: number, limit?: number): Observable<apiBaseResponse<T>>;
    searchItem(search: string): Observable<D>;
    getItemById(fullUrl: string): Observable<D>;
}