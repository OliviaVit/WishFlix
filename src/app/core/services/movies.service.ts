import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';  


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  // URL de base de l'API utilisée (TVmaze ici)
  private apiUrl = 'https://api.tvmaze.com/shows'; 

  // On injecte le module HttpClient pour pouvoir faire des appels HTTP
  constructor(private http: HttpClient) {}

  // on récup  toute les series via l'endpoint général
  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  // Récup une série spécifique via son identifiant
  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`https://api.tvmaze.com/shows/${id}`);
  }

  // Recherche des séries selon un mot-clé (utilisé pour la navbar)
  searchMovies(term: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`https://api.tvmaze.com/search/shows?q=${term}`);
  }

  // Récup toutes les saisons d’une série via son ID
  getMovieSeasons(id: number): Observable<any> {
    return this.http.get<any>(`https://api.tvmaze.com/shows/${id}/seasons`);
  }

  // Récup les épisodes d’une saison via l’ID de la saison
  getSeasonEpisodes(id: number): Observable<any> {
    return this.http.get<any>(`https://api.tvmaze.com/seasons/${id}/episodes`);
  }
}
