import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/pokemon/pokemon-list/pokemon-list.component').then(m => m.PokemonListComponent)
    },
    {
        path: 'pokemon-detail/:idPokemon',
        loadComponent: () => import('./pages/pokemon/pokemon-detail/pokemon-detail.component').then(m => m.PokemonDetailComponent)
    }
];
