import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MoviesService } from 'src/app/core/services/movies.service';
import { Movie } from 'src/app/models/movie.model';
import { GenreSelectorComponent } from "../genre-selector/genre-selector.component";

@Component({
  selector: 'app-suggestions',
  imports: [GenreSelectorComponent],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css'
})
export class SuggestionsComponent {

}
