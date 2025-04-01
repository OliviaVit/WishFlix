import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchBarComponent } from '../shared/components/search-bar/search-bar.component';
import { MovieCardComponent } from '../shared/components/movie-card/movie-card.component';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../core/services/movies.service';
import { GenreService } from '../core/services/genre.service';
import { MoviesListComponent } from "../features/movies/pages/movies-list/movies-list.component";
import { FilterComponent } from '../shared/components/filter/filter.component';
import { SortSelectorComponent } from "../shared/components/sort/sort.component";
import { SortService } from '../core/services/sort.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SearchBarComponent,
    MovieCardComponent,
    FilterComponent,
    MoviesListComponent,
    SortSelectorComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  genreFilter: string | null = null;
  isLoading: boolean = false;
  searchFilter: string = '';

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private genreService: GenreService,
    private sortService: SortService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
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

    this.sortService.sort$.subscribe((sortType) => {
      this.sortMovies(sortType);
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

  sortMovies(sortType: string) {
    if (sortType === 'year') {
      this.filteredMovies.sort((a, b) => {
        const dateA = new Date(a.premiered).getFullYear();
        const dateB = new Date(b.premiered).getFullYear();
        return dateA - dateB;
      });
    } else if (sortType === 'name') {
      this.filteredMovies.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'rating') {
      this.filteredMovies.sort(
        (a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)
      );
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

