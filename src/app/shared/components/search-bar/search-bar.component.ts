import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-bar',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule
  ],
  templateUrl: './search-bar.component.html',
  styles: `
  mat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    margin: 10px auto;
  }
  `
})
export class SearchBarComponent {
  title = input.required<string>();
  searchTerm = model<string>('');
  searchEvent = output<string>();

  search(): void {
    this.searchEvent.emit(this.searchTerm());
  }

}
