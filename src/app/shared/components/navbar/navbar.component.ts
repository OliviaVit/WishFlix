import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenreService } from 'src/app/core/services/genre.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  selectedGenre = '';
  genres: string[] = [];
  
  constructor(private genreService: GenreService) {}


  ngOnInit(): void {
    this.genreService.genres$.subscribe((genres: string[]) => {
      this.genres = genres;
    });
  }

  onGenreChange(): void {
    
    console.log('Genre changé :', this.selectedGenre);
    this.genreService.setSelectedGenre(this.selectedGenre); 
  
  }
}
