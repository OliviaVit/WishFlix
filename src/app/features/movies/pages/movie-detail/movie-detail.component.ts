import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MoviesService } from '../../../../core/services/movies.service';
import { Movie } from '../../../../models/movie.model';
import { CommonModule } from '@angular/common';
import { Season } from 'src/app/models/season';
import { Episode } from 'src/app/models/episode';
import { SeasonDetailsComponent } from "../../../../season-details/season-details.component";

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, SeasonDetailsComponent],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie!: Movie;
  seasons: Season[] = [];
  selectedSeasonId!: number
  

  
  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.moviesService.getMovieById(+id).subscribe({
        next: (data: Movie) => {
          this.movie = data; 
        },
        error: (err) => {
          console.error('Erreur lors du chargement de la serie :', err);
        },
      });
      this.moviesService.getMovieSeasons(+id).subscribe({
        next: (data: Season[]) => {
          this.seasons = data; 
        },
        error: (err) => {
          console.error('Erreur lors du chargement de la saison :', err);
        },
      });
      
    }
  }

  onSelectSeason(seasonId: number) {
    this.selectedSeasonId = seasonId;
  }
  

}
