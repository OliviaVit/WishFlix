import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Episode } from '../models/episode';
import { MoviesService } from '../core/services/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-season-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './season-details.component.html',
  styleUrls: ['./season-details.component.css'],
})
export class SeasonDetailsComponent implements OnChanges {
  @Input() seasonId!: number;
  episodes: Episode[] = [];
  expandedEpisodes: Set<number> = new Set(); 

  constructor(private moviesService: MoviesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['seasonId'] && this.seasonId) {
      this.loadEpisodes();
    }
  }

  loadEpisodes(): void {
    this.moviesService.getSeasonEpisodes(this.seasonId).subscribe({
      next: (data: Episode[]) => {
        this.episodes = data;
        this.expandedEpisodes.clear(); 
      },
      error: (err) => {
        console.error('Erreur chargement épisodes :', err);
      },
    });
  }

  toggleEpisode(id: number): void {
    if (this.expandedEpisodes.has(id)) {
      this.expandedEpisodes.delete(id);
    } else {
      this.expandedEpisodes.add(id);
    }
  }

  isExpanded(id: number): boolean {
    return this.expandedEpisodes.has(id);
  }
}
