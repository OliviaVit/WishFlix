import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Movie } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/core/services/movies.service';
import { GenreService } from 'src/app/core/services/genre.service';
import { GenreSelectionComponent } from '../shared/components/genre-selection/genre-selection.component';
import { MoviesListComponent } from '../features/movies/pages/movies-list/movies-list.component';
import { CommonModule } from '@angular/common';
import { SeriesSelectorComponent } from "../series-selector/series-selector.component";

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GenreSelectionComponent, MoviesListComponent, SeriesSelectorComponent],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css'
})
export class SuggestionsComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  isLoading: boolean = false;
  genreFilter: string [] = [];
  multiSelectedGenres: string [] = [];
  topRatedSelected: Movie[] = [];
  showSeriesSelector: boolean = false;



  constructor(
    private moviesService: MoviesService,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    this.fetchMovies();
    this.genreService.multiSelectedGenres$.subscribe((genres: string[]) => {
      this.multiSelectedGenres = genres;
    });

  }
  fetchMovies(): void {
    this.isLoading = true;
    this.moviesService.getAllMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.filteredMovies = data;
        this.logUniqueGenres();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur API :', err);
        this.isLoading = false;
      },
    });
  }

  applySmartFiltering(): void {
    if (!this.topRatedSelected.length && !this.multiSelectedGenres.length) {
      this.filteredMovies = this.movies.slice(0, 5);
      return;
    }
      const selectedGenres = new Set<string>();
  
    this.topRatedSelected.forEach(movie => {
      (movie.genres || []).forEach(g => selectedGenres.add(g));
    });
  
    this.multiSelectedGenres.forEach(g => selectedGenres.add(g));
  
    const scored = this.movies.map(movie => {
      const movieGenres = movie.genres || [];
      const matchCount = movieGenres.filter(g => selectedGenres.has(g)).length;
  
      return { movie, matchCount };
    });
  
    scored.sort((a, b) => b.matchCount - a.matchCount);
  
    this.filteredMovies = scored.slice(0, 5).map(s => s.movie);
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


  onGenresSelected(genres: string[]): void {
    this.genreService.setMultiSelectedGenres(genres);
    this.multiSelectedGenres = genres;
    this.applySmartFiltering();
  }

  filterBySummarySimilarity(): void {
    if (!this.topRatedSelected.length || !this.filteredMovies.length) return;
  
    const selectedSummaries = this.topRatedSelected
      .map(m => this.cleanText(m.summary))
      .join(' ')
      .split(/\s+/);
  
    const wordCounts = new Map<string, number>();
    selectedSummaries.forEach(word => {
      const lower = word.toLowerCase();
      wordCounts.set(lower, (wordCounts.get(lower) || 0) + 1);
    });
  
    const scored = this.filteredMovies.map(movie => {
      const summaryWords = this.cleanText(movie.summary).split(/\s+/);
      let score = 0;
      summaryWords.forEach(word => {
        score += wordCounts.get(word.toLowerCase()) || 0;
      });
  
      return { movie, score };
    });
  
    scored.sort((a, b) => b.score - a.score);
    this.filteredMovies = scored.map(s => s.movie);
  }
  
  cleanText(text: string): string {
    const stopWords = new Set([
      'le', 'la', 'les', 'de', 'des', 'du', 'un', 'une', 'et', 'à', 'en', 'avec', 'pour', 'dans', 'sur', 'au', 'aux', 'ce', 'cette', 'ces', 'que'
    ]);
  
    return (text || '')
      .replace(/<[^>]*>/g, '') 
      .replace(/[^\w\s]/g, '') 
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word && !stopWords.has(word))
      .join(' ');
  }
  

  onTopRatedChanged(movies: Movie[]): void {
    this.topRatedSelected = movies;
    this.applySmartFiltering();
  }

  get shouldDisplayResults(): boolean {
    return this.multiSelectedGenres.length > 0 || this.topRatedSelected.length > 0;
  }


  toggleSeries(): void {
    this.showSeriesSelector = !this.showSeriesSelector;
  }

  
  
}
