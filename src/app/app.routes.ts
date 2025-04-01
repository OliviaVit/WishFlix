import { Routes } from '@angular/router';
import { SeasonDetailsComponent } from './season-details/season-details.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [

  { path: 'home', component: HomeComponent },
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
    redirectTo: 'home',
    pathMatch: 'full',
  },

  { path: 'suggestions', component: SuggestionsComponent },
];
