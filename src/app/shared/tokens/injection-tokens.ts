import { InjectionToken } from "@angular/core";
import { IBaseService } from "../../models/Base/baseService";

export const BASE_SERVICE_TOKEN = new InjectionToken<IBaseService<any>>('BASE_SERVICE_TOKEN');