// Importations nécessaires pour le composant Angular et la gestion de formulaire réactif
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms'; 
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

// Définition du composant de barre de recherche
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'] 
})
export class SearchBarComponent {
  // Texte affiché dans l'input (via @Input)
  @Input() placeholder: string = '';

  // Événement émis à chaque recherche (via @Output)
  @Output() search = new EventEmitter<string>();

  // Contrôle du champ de recherche
  searchControl = new FormControl('');

  // Abonnement à la valeur du champ avec logique de filtrage
  constructor() {
    this.searchControl.valueChanges.pipe(
      // Ignore les valeurs nulles
      filter((value): value is string => value !== null),

      // Ajoute un délai de 500ms après la frappe
      debounceTime(500),

      // Ignore les répétitions identiques
      distinctUntilChanged(),

      // N’émet que si le terme est vide ou a ≥ 3 caractères
      filter((term: string) => term.length === 0 || term.length >= 3)
    ).subscribe((value: string) => {
      this.search.emit(value.trim());
    });
  }
}
