import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MoviesService } from '../../../../core/services/movies.service';
import { Movie } from '../../../../models/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie!: Movie;

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
          console.error('Erreur lors du chargement du film :', err);
        },
      });
    }
  }
}
