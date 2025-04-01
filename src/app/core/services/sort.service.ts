import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SortService {
  private sortSubject = new BehaviorSubject<string>('name');
  sort$ = this.sortSubject.asObservable();

  setSort(sortType: string) {
    this.sortSubject.next(sortType);
  }
}
