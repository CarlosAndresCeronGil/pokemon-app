import { AfterViewInit, Component, DestroyRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    MatButtonModule,
    MatSidenavModule,
    NavbarComponent,
    RouterOutlet,
    SidenavComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  title = 'pokemon-app';

  constructor(
    private observer: BreakpointObserver,
    private destroyRef: DestroyRef
  ) {}

  ngAfterViewInit(): void {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(
        tap((result) => {
          if (result.matches) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          } else {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
