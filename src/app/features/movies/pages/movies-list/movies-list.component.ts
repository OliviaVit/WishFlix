import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Movie } from '../../../../models/movie.model';
import { MoviesService } from '../../../../core/services/movies.service';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { MovieCardComponent } from '../../../../shared/components/movie-card/movie-card.component';
import { GenreService } from 'src/app/core/services/genre.service';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SearchBarComponent,
    MovieCardComponent
],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit {

  @Input() movies: Movie[] = [];

  ngOnInit(): void {
      
  }
  
}
