import { WritableSignal } from "@angular/core";
import { Observable } from "rxjs";
import { apiBaseResponse } from "./apiBaseResponse";

export interface IBaseService<D> {
    baseItemName: string;
    itemListLoading: WritableSignal<boolean>;
    itemPaginationLimit$: Observable<{offset: number, limit: number}>;
    singleItemSearched$: Observable<string>;
    items$: Observable<apiBaseResponse>;
    itemSearched$: Observable<D>;
    updateItemPagination(isNext: boolean): void;
    updateItemSearched(search: string): void;
    getItems(offset?: number, limit?: number): Observable<apiBaseResponse>;
    searchItem(search: string): Observable<D>;
    getItemById(fullUrl: string): Observable<D>;
}