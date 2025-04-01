import { Component, Input, OnInit, SimpleChanges  } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Season } from '../models/season';
import { Episode } from '../models/episode';
import { MoviesService } from '../core/services/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-season-details',
  imports: [RouterLink],
  templateUrl: './season-details.component.html',
  styleUrl: './season-details.component.css'
})
export class SeasonDetailsComponent {

 
  episodes: Episode[] = [];
  @Input() seasonId!: number;
  movieId!: number;


  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['seasonId'] && this.seasonId) {
      this.loadEpisodes();
    }
  }

  loadEpisodes(): void {
    this.moviesService.getSeasonEpisodes(this.seasonId).subscribe({
      next: (data: Episode[]) => {
        this.episodes = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des épisodes :', err);
      },
    });
  }


}
