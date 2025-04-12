// Importations des modules Angular et services nécessaires
import { Component, OnInit } from '@angular/core';
import { GenreService } from 'src/app/core/services/genre.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

// Définition du composant Angular
@Component({
  selector: 'app-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {
  // Contrôle de formulaire pour la sélection d’un genre
  genreControl = new FormControl<string>('');

  // Liste des genres disponibles à afficher dans le select
  genres: string[] = [];

  // Injection du service de gestion des genres
  constructor(private genreService: GenreService) {}

  // Initialisation du composant
  ngOnInit(): void {
    // Récupère la liste des genres depuis le service
    this.genreService.genres$.subscribe((genres) => {
      this.genres = genres;
    });

    // Envoie le genre sélectionné à chaque changement
    this.genreControl.valueChanges.subscribe((genre: string | null) => {
      this.genreService.setSelectedGenre(genre ?? '');
    });
  }
}
