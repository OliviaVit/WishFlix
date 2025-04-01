import { Routes } from '@angular/router';
import { SeasonDetailsComponent } from './season-details/season-details.component';

export const routes: Routes = [
  {
    path: 'movies',
    loadComponent: () =>
      import('./features/movies/pages/movies-list/movies-list.component').then(
        (m) => m.MoviesListComponent
      ),
  },
  {
    path: 'movies/:id',
    loadComponent: () =>
      import('./features/movies/pages/movie-detail/movie-detail.component').then(
        (m) => m.MovieDetailComponent
      ),
  },
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },

  { path: 'season/:id', component: SeasonDetailsComponent },
];
