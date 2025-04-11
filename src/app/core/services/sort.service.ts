import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SortService {
  // Stocke le type de tri sélectionné, avec 'name' comme valeur par défaut
  private sortSubject = new BehaviorSubject<string>('name');
  // Observable que les composants peuvent écouter pour connaître le type de tri actuel
  sort$ = this.sortSubject.asObservable();

  // Met à jour le type de tri 
  setSort(sortType: string) {
    this.sortSubject.next(sortType);
  }
}
