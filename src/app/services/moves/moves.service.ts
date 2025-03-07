import { Injectable } from '@angular/core';
import { ApiMovesShortResponse } from '../../models/Moves/apiMovesResponse';
import { ApiSingleMoveResponse } from '../../models/Moves/apiSingleMoveResponse';
import { BasePaginationService } from '../../shared/services/base-pagination.service';

@Injectable({
  providedIn: 'root'
})
export class MovesService extends BasePaginationService<ApiMovesShortResponse, ApiSingleMoveResponse> {
  protected override baseItemName: string = 'move';
}
