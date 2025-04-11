import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MoviesService } from '../../../../core/services/movies.service';
import { Movie } from '../../../../models/movie.model';
import { Season } from 'src/app/models/season';
import { CommonModule } from '@angular/common';
import { SeasonDetailsComponent } from '../../../../season-details/season-details.component';

@Component({
  selector: 'app-movie-detail',
  standalone: true, // Le composant est autonome, pas besoin d'être déclaré dans un module
  imports: [CommonModule, RouterLink, SeasonDetailsComponent], // Modules nécessaires au template
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie!: Movie; // Contiendra les infos du film
  seasons: Season[] = []; // Liste des saisons du film
  selectedSeasonId!: number; // ID de la saison sélectionnée

  constructor(
    private route: ActivatedRoute, // Pour accéder aux paramètres de l’URL
    private moviesService: MoviesService // Pour faire les appels API
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Récupère l'ID dans l'URL
    if (id) {
      // Récupération des infos du film
      this.moviesService.getMovieById(+id).subscribe({
        next: (data: Movie) => {
          this.movie = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement de la série :', err);
        },
      });

      // Récupération des saisons associées au film
      this.moviesService.getMovieSeasons(+id).subscribe({
        next: (data: Season[]) => {
          this.seasons = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des saisons :', err);
        },
      });
    }
  }

  // Met à jour l'ID de la saison sélectionnée (utilisé dans le template)
  onSelectSeason(seasonId: number) {
    this.selectedSeasonId = seasonId;
  }
}
