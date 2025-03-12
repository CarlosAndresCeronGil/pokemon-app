import { Component, signal } from '@angular/core';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { createBasePaginationProvider } from '../../../shared/factories/providers.factory';
import { BaseListComponent } from '../../base/base-list/base-list.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
    PokemonCardComponent,
    SearchBarComponent
  ],
  providers: createBasePaginationProvider('pokemon'),
  templateUrl: './pokemon-list.component.html',
  styles: `
  @import '../../../../styles.scss';
  mat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    margin: 0 auto;
  }

  .pokemon-list-title {
      text-align: center;
      margin-bottom: 1rem;
  }

  .loader {
      @include centered-content;
  }

  .pokemon-list-container {
      @include list-container;
  }
  `,
})
export class PokemonListComponent extends BaseListComponent {
  override itemType = signal<string>('pokemon');

  // constructor() {
  //   console.log('instance of service are the same', this.paginationService === this.injector.get(BASE_SERVICE_TOKEN));
  // }

  nextPokemons(): void {
    super.next();
  }

  previousPokemons(): void {
    super.previous();
  }
}
