import { Routes } from '@angular/router';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';

export const routes: Routes = [
    {
        path: '',
        component: PokemonListComponent
    },
    {
        path: 'pokemon-detail',
        loadComponent: () => import('./pages/pokemon-detail/pokemon-detail.component').then(m => m.PokemonDetailComponent)
    }
];
