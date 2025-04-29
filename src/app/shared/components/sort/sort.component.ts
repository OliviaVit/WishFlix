import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SortService } from 'src/app/core/services/sort.service';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortSelectorComponent implements OnInit {
  sortControl = new FormControl<string>('name');

  constructor(private sortService: SortService) {}

  ngOnInit(): void {
    this.sortControl.valueChanges.subscribe((sortType: string | null) => {
      this.sortService.setSort(sortType ?? 'name');
    });
  }
}
