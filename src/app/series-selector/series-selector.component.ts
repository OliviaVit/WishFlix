import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/core/services/movies.service';
import { Movie } from 'src/app/models/movie.model'; 
import { MovieCardComponent } from 'src/app/shared/components/movie-card/movie-card.component';
import { MiniMovieCardComponent } from "../mini-movie-card/mini-movie-card.component";

@Component({
  selector: 'app-series-selector',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, MiniMovieCardComponent],
  templateUrl: './series-selector.component.html',
  styleUrl: './series-selector.component.css'
})
export class SeriesSelectorComponent implements OnInit {
  movies: Movie[] = []; // Liste des séries récupérées
  selectedMovies: Movie[] = []; // Séries sélectionnées par l’utilisateur

  @Output() selectionChanged = new EventEmitter<Movie[]>(); // Émet les séries sélectionnées au parent

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe((data) => {
      this.movies = data
        .filter(movie => movie.rating?.average) // Garde les séries avec une note
        .sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0)) // Trie par note décroissante
        .slice(0, 20); // Ne garde que les 20 premières
    });
  }

  // Ajoute ou retire une série de la sélection
  toggleSelection(movie: Movie): void {
    const exists = this.selectedMovies.find(m => m.id === movie.id);
    if (exists) {
      this.selectedMovies = this.selectedMovies.filter(m => m.id !== movie.id);
    } else {
      this.selectedMovies.push(movie);
    }
    this.selectionChanged.emit(this.selectedMovies); // Notifie le composant parent
  }

  // Vérifie si une série est déjà sélectionnée
  isSelected(movie: Movie): boolean {
    return this.selectedMovies.some(m => m.id === movie.id);
  }
}
