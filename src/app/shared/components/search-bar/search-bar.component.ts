import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  @Input() placeholder: string = '';
  @Output() search = new EventEmitter<string>();

  searchTerm: string = '';

  onInputChange() {
    this.search.emit(this.searchTerm);
  }
}
