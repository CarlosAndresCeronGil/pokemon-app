import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/pokemon/pokemon-list/pokemon-list.component').then(m => m.PokemonListComponent)
    },
    {
        path: 'pokemon-detail/:idPokemon',
        loadComponent: () => import('./pages/pokemon/pokemon-detail/pokemon-detail.component').then(m => m.PokemonDetailComponent)
    },
    {
        path: 'moves',
        loadComponent: () => import('./pages/moves/moves-list/moves-list.component').then(m => m.MovesListComponent)
    },
    {
        path: 'move-detail/:idMove',
        loadComponent: () => import('./pages/moves/move-detail/move-detail.component').then(m => m.MoveDetailComponent)
    }
];
