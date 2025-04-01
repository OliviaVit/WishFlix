import { Component, OnInit } from '@angular/core';
import { GenreService } from 'src/app/core/services/genre.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {
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