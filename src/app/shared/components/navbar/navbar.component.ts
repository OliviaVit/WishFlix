import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  selectedGenre = '';
  genres = ['Action', 'Comédie', 'Drame']; 
  onGenreChange() {
    console.log('Genre changé :', this.selectedGenre);
  }
}
