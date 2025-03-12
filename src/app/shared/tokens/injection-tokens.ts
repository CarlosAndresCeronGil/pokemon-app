import { InjectionToken } from "@angular/core";
import { itemName } from "../../models/Base/itemName";
import { IBaseService } from "../../models/Base/baseService";

export const BASE_SERVICE_TOKEN = new InjectionToken<IBaseService<any, any>>('BASE_SERVICE_TOKEN');

export const BASE_ITEM_NAME = new InjectionToken<itemName>('BASE_ITEM_NAME');