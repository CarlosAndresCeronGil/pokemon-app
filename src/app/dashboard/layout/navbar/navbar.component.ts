import { Component, output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIconModule],
  template: `
    <mat-toolbar>
      <nav>
        <ul>
          <li>
            <a (click)="handleToggleSidenav()"><mat-icon>menu</mat-icon></a>
          </li>
        </ul>
      </nav>
    </mat-toolbar>
  `,
  styles: `
    mat-toolbar {
        display: flex;
        justify-content: space-between;
        background-color: #333;
        color: white;
    }

    nav {
        padding: 0;
        margin: 0;
        color: white;
        padding: 10px;
    }

    ul {
        display: flex;
        gap: 15px;
        list-style: none;
        cursor: pointer;
        padding: 0;
    }
  `,
})
export class NavbarComponent {
  toggleSidenav = output();

  handleToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
}
