import { Component, OnInit } from '@angular/core';
import { GenreService } from 'src/app/core/services/genre.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-genre-selector',
  imports: [ReactiveFormsModule],
  templateUrl: './genre-selector.component.html',
  styleUrl: './genre-selector.component.css'
})
export class GenreSelectorComponent implements OnInit {
  genreControl = new FormControl<string>('');

  genres: string[] = [];

  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    this.genreService.genres$.subscribe((genres) => {
      this.genres = genres;
    });

    this.genreControl.valueChanges.subscribe((genre: string | null) => {
      this.genreService.setSelectedGenre(genre ?? '');
    });
    
  }
}