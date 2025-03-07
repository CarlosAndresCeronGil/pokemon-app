import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule],
  template: `
    <nav>
      <ul>
        <li><a routerLink="/">Pokemon list</a></li>
        <li><a routerLink="/moves">Moves</a></li>
      </ul>
    </nav>
  `,
  styles: `
    nav {
    display: flex;
    justify-content: center;
    height: calc(100vh - 56px);
    background-color: #303030;
    }

    li {
        list-style-type: none;
        padding: 10px;
        cursor: pointer;
        a {
            text-decoration: none;
            color: white;
            font-weight: 600;
        }
    }
  `,
})
export class SidenavComponent {}
