import { Provider } from "@angular/core";
import { itemName } from "../../models/Base/itemName";
import { BASE_ITEM_NAME, BASE_SERVICE_TOKEN } from "../tokens/injection-tokens";
import { BasePaginationServiceV2 } from "../services/base-pagination-v2.service";


export function createBasePaginationProvider(baseItemName: itemName): Provider[] {
    return [
        { provide: BASE_ITEM_NAME, useValue: baseItemName },
        BasePaginationServiceV2,
        { provide: BASE_SERVICE_TOKEN, useExisting: BasePaginationServiceV2 },
    ]
}