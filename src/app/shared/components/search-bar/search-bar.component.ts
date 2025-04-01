import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms'; 
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'] 
})
export class SearchBarComponent {
  @Input() placeholder: string = '';
  @Output() search = new EventEmitter<string>();

  searchControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges.pipe(
      filter((value): value is string => value !== null),
      debounceTime(500),
      distinctUntilChanged(),
      filter((term: string) => term.length === 0 || term.length >= 3)
    ).subscribe((value: string) => {
      this.search.emit(value.trim());
    });
    
  }
}