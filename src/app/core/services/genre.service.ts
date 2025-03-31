import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private genresSubject = new BehaviorSubject<string[]>([]); 
  genres$ = this.genresSubject.asObservable(); 

  private selectedGenreSubject = new BehaviorSubject<string>('');
  selectedGenre$ = this.selectedGenreSubject.asObservable();


  emitGenres(genres: string[]): void {
    console.log('Genres émis :', genres);

    this.genresSubject.next(genres); 
  }

  setSelectedGenre(genre: string): void {
    this.selectedGenreSubject.next(genre);
  }
}