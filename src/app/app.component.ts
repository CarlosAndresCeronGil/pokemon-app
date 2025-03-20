import { AfterViewInit, ChangeDetectorRef, Component, DestroyRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./dashboard/layout/navbar/navbar.component";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { SidenavComponent } from './dashboard/layout/sidenav/sidenav.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { createBasePaginationProvider } from './shared/factories/providers.factory';
import { PokemonService } from './services/pokemon/pokemon.service';

@Component({
  selector: 'app-root',
  imports: [
    MatButtonModule,
    MatSidenavModule,
    NavbarComponent,
    RouterOutlet,
    SidenavComponent
  ],
  providers: [
    createBasePaginationProvider(),
    PokemonService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  title = 'pokemon-app';

  constructor(
    private observer: BreakpointObserver,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef
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
          this.cdr.detectChanges();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
