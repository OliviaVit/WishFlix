import { Routes } from '@angular/router';
import { SeasonDetailsComponent } from './season-details/season-details.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [

  // Route vers la page d’accueil
  { path: 'home', component: HomeComponent },

  // Route vers la liste des séries (chargement dynamique du composant)
  {
    path: 'movies',
    loadComponent: () =>
      import('./features/movies/pages/movies-list/movies-list.component').then(
        (m) => m.MoviesListComponent
      ),
  },

  // Détail d’une série, identifiée par son ID (chargement dynamique aussi)
  {
    path: 'movies/:id',
    loadComponent: () =>
      import('./features/movies/pages/movie-detail/movie-detail.component').then(
        (m) => m.MovieDetailComponent
      ),
  },

  // Redirection de la racine vers /home
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  // Route vers la page de suggestions personnalisées
  { path: 'suggestions', component: SuggestionsComponent },

  //Route vers la page about
  { path: 'about', component: AboutComponent },

];
