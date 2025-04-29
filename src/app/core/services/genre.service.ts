import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Ce décorateur rend le service injectable partout dans l'app (grâce à 'providedIn: root')
@Injectable({
  providedIn: 'root',
})
export class GenreService {
  // Subject pour stocker tous les genres dispo (genre une liste de tous les styles musicaux par ex)
  private genresSubject = new BehaviorSubject<string[]>([]); 
  // On expose ça en observable pour que les composants puissent s'abonner sans pouvoir modifier direct
  genres$ = this.genresSubject.asObservable(); 

  // Subject pour gérer un seul genre sélectionné (utile quand t'as un select simple)
  private selectedGenreSubject = new BehaviorSubject<string>('');
  selectedGenre$ = this.selectedGenreSubject.asObservable();

  // Celui-là c’est pour plusieurs genres sélectionnés (ex: si l’utilisateur peut cocher plusieurs cases)
  private multiSelectedGenresSubject = new BehaviorSubject<string[]>([]); 
  multiSelectedGenres$ = this.multiSelectedGenresSubject.asObservable(); 

  // Méthode pour balancer la liste complète des genres (genre après un fetch API)
  emitGenres(genres: string[]): void {
    this.genresSubject.next(genres); 
  }

  // On met à jour le genre sélectionné (genre si tu cliques sur une carte)
  setSelectedGenre(genre: string): void {
    this.selectedGenreSubject.next(genre);
  }

  // Pareil mais pour une sélection multiple (checkboxes, tags, etc.)
  setMultiSelectedGenres(genres: string[]): void {
    this.multiSelectedGenresSubject.next(genres);
  }
}
