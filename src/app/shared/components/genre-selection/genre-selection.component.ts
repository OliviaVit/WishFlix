// Importations des modules nécessaires à Angular, ainsi que du service et des composants utilisés
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreService } from 'src/app/core/services/genre.service';
import { MoviesListComponent } from 'src/app/features/movies/pages/movies-list/movies-list.component';

// Définition du composant de sélection de genres
@Component({
  selector: 'app-genre-selection',
  standalone: true,
  imports: [CommonModule, MoviesListComponent],
  templateUrl: './genre-selection.component.html',
  styleUrl: './genre-selection.component.css'
})
export class GenreSelectionComponent implements OnInit {
  // Liste des genres disponibles (récupérés via le service)
  genres: string[] = [];

  // Genres sélectionnés par l’utilisateur
  selectedGenres: string[] = [];

  // Événement émis à chaque mise à jour de la sélection
  @Output() onGenresSelected = new EventEmitter<string[]>();

  // Injection du GenreService
  constructor(private genreService: GenreService) {}

  // Initialisation : récupération des genres disponibles
  ngOnInit(): void {
    this.genreService.genres$.subscribe((genres) => {
      this.genres = genres;
    });
  }

  // Ajoute ou retire un genre de la sélection, puis émet la liste mise à jour
  toggleGenre(genre: string): void {
    const index = this.selectedGenres.indexOf(genre);
    if (index > -1) {
      this.selectedGenres.splice(index, 1);
    } else {
      this.selectedGenres.push(genre);
    }
    this.onGenresSelected.emit(this.selectedGenres);
  }

  // Vérifie si un genre est sélectionné (pour affichage ou style)
  isSelected(genre: string): boolean {
    return this.selectedGenres.includes(genre);
  }
}
