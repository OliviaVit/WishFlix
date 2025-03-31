import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';  

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl = 'https://api.tvmaze.com/shows'; 

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`https://api.tvmaze.com/shows/${id}`);
  }

  searchMovies(term: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}?q=${term}`);
  }
}
