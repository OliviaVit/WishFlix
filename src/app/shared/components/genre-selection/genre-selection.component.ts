import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreService } from 'src/app/core/services/genre.service';
import { MoviesListComponent } from 'src/app/features/movies/pages/movies-list/movies-list.component';

@Component({
  selector: 'app-genre-selection',
  standalone: true,
  imports: [CommonModule, MoviesListComponent],
  templateUrl: './genre-selection.component.html',
  styleUrl: './genre-selection.component.css'
})
export class GenreSelectionComponent implements OnInit {
  genres: string[] = [];
  selectedGenres: string[] = [];
  @Output() onGenresSelected = new EventEmitter<string[]>(); // 👈


  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    this.genreService.genres$.subscribe((genres) => {
      this.genres = genres;
    });
  }

  toggleGenre(genre: string): void {
    const index = this.selectedGenres.indexOf(genre);
    if (index > -1) {
      this.selectedGenres.splice(index, 1);
    } else {
      this.selectedGenres.push(genre);
    }
    this.onGenresSelected.emit(this.selectedGenres);

   
  }

  isSelected(genre: string): boolean {
    return this.selectedGenres.includes(genre);
  }
}
