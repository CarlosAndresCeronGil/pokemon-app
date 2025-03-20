import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BaseListComponent } from '../../base/base-list/base-list.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiSinglePokemonResponse, Sprites } from '../../../models/Pokemon/apiSinglePokemonResponse';
import { PokemonService } from '../../../services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FormsModule,
    PokemonCardComponent,
    SearchBarComponent
  ],
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

  .loader, .pokemon-list-filter {
      @include centered-content;
  }

  .pokemon-list-container {
      @include list-container;
  }
  `,
})
export class PokemonListComponent extends BaseListComponent<ApiSinglePokemonResponse> {
  public pokemonService = inject(PokemonService);
  typeOfImagesOptions: any[] = this.pokemonService.POKEMON_IMAGES_OPTIONS;

  override itemType = signal<string>('pokemon');

  protected override changeBaseItemName(): void {
    this.service.changeBaseItemName('move');
  }

  changeTypeOfImage(event: any): void {
    this.pokemonService.currentPokemonImageOption.set(event);
  }

  nextPokemons(): void {
    super.next();
  }

  previousPokemons(): void {
    super.previous();
  }
}
