import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Movie } from '../../../../models/movie.model';
import { MoviesService } from '../../../../core/services/movies.service';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { MovieCardComponent } from '../../../../shared/components/movie-card/movie-card.component';
import { GenreService } from 'src/app/core/services/genre.service';
import { GenreSelectorComponent } from "../../../../genre-selector/genre-selector.component";

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SearchBarComponent,
    MovieCardComponent,
    GenreSelectorComponent
],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  genreFilter: string | null = null;
  searchFilter: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchFilter = params['search'] || '';
      this.fetchMovies();
    });

    this.genreService.selectedGenre$.subscribe((genre: string) => {
      if(genre){
        this.genreFilter = genre; 
        this.applyGenreFilter();
      }
      else{
        this.genreFilter = null;
        this.fetchMovies();
      }
      
    });
    
  }

  fetchMovies(): void {
    this.isLoading = true;
    this.moviesService.getAllMovies().subscribe({
      next: (data) => {
        console.log('Films récupérés :', data);
        this.movies = data;
        this.filteredMovies = data;
        this.applyGenreFilter();
        this.applySearchFilter();
        this.logUniqueGenres();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur API :', err);
        this.isLoading = false;
      },
    });
  }

  applyGenreFilter(): void {
    this.filteredMovies = this.movies
    if (this.genreFilter) {
      const genre = this.genreFilter.toLowerCase();
      this.filteredMovies = this.filteredMovies.filter((movie) =>
        movie.genres?.some((g) => g.toLowerCase().includes(genre))
      );
    }
  }

  applySearchFilter(): void {
    this.filteredMovies = this.movies; 
    const term = this.searchFilter.trim().toLowerCase();
   
      if (term) {
        this.moviesService.searchMovies(term).subscribe({
          next: (data) => {
            this.filteredMovies = data.map((result: any) => ({
              id: result.show.id,
              name: result.show.name,
              genres: result.show.genres,
              image: result.show.image || { medium: 'assets/default-poster.jpg', original: 'assets/default-poster.jpg' },
              summary: result.show.summary,
              premiered: result.show.premiered,
              year: result.show.premiered = new Date(result.show.premiered).getFullYear(),
              rating: result.show.rating,
            }));
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Erreur API :', err);
            this.isLoading = false;
          },
        });
      } else {
        this.filteredMovies = this.movies;
      }
      
  }

  onSearchChange(term: string): void {
    this.searchFilter = term;
    this.applyGenreFilter(); 
    this.applySearchFilter();
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    if (value === 'year') {
      this.filteredMovies.sort((a, b) => {
        const dateA = new Date(a.premiered).getFullYear();
        const dateB = new Date(b.premiered).getFullYear();
        return dateA - dateB;
      });
    } else if (value === 'name') {
      this.filteredMovies.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === 'rating') {
      this.filteredMovies.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
    }
  }

  goToDetail(arg0: number) {
    throw new Error('Method not implemented.');
  }

  logUniqueGenres(): void {
    const genres: string[] = [];
  
    for (let movie of this.movies) {
      if (movie.genres) {
        for (let genre of movie.genres) {
          if (!genres.includes(genre)) {
            genres.push(genre);
          }
        }
      }
    }
  
    this.genreService.emitGenres(genres); 

  }

}
