import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Episode } from '../models/episode';
import { MoviesService } from '../core/services/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-season-details',
  standalone: true, // Composant autonome
  imports: [CommonModule],
  templateUrl: './season-details.component.html',
  styleUrls: ['./season-details.component.css'],
})
export class SeasonDetailsComponent implements OnChanges {
  @Input() seasonId!: number;

  episodes: Episode[] = []; // Liste des épisodes récupérés
  expandedEpisodes: Set<number> = new Set(); // Permet de suivre les épisodes "ouverts"

  constructor(private moviesService: MoviesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['seasonId'] && this.seasonId) {
      this.loadEpisodes(); // Recharge les épisodes dès que la saison change
    }
  }

  // Appelle l'API pour récupérer les épisodes de la saison
  loadEpisodes(): void {
    this.moviesService.getSeasonEpisodes(this.seasonId).subscribe({
      next: (data: Episode[]) => {
        this.episodes = data;
        this.expandedEpisodes.clear(); // Réinitialise les épisodes ouverts à chaque chargement
      },
      error: (err) => {
        console.error('Erreur chargement épisodes :', err);
      },
    });
  }

  // Active/désactive l'affichage du résumé d’un épisode
  toggleEpisode(id: number): void {
    if (this.expandedEpisodes.has(id)) {
      this.expandedEpisodes.delete(id);
    } else {
      this.expandedEpisodes.add(id);
    }
  }

  // Vérifie si un épisode est actuellement "ouvert"
  isExpanded(id: number): boolean {
    return this.expandedEpisodes.has(id);
  }
}
