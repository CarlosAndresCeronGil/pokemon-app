import { Provider } from "@angular/core";
import { itemName } from "../../models/Base/itemName";
import { BasePaginationServiceV2 } from "../services/base-pagination-v2.service";
import { BASE_SERVICE_TOKEN } from "../tokens/injection-tokens";


export function createBasePaginationProvider(): Provider[] {
    return [
        BasePaginationServiceV2,
        { provide: BASE_SERVICE_TOKEN, useExisting: BasePaginationServiceV2 },
    ]
}