import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from 'src/app/models/movie.model'; 

@Component({
  selector: 'app-mini-movie-card',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './mini-movie-card.component.html',
  styleUrls: ['./mini-movie-card.component.css']
})
export class MiniMovieCardComponent {
  // Série à afficher dans la carte
  @Input() movie!: Movie;

  // Indique si la carte est sélectionner
  @Input() selected: boolean = false;
}
