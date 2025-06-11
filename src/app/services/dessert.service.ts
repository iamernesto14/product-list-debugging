// dessert.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Dessert } from '../models/dessert.interface';

@Injectable({
  providedIn: 'root',
})
export class DessertService {
  private dessertsSubject = new BehaviorSubject<Dessert[]>([]);
  desserts$ = this.dessertsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadDesserts();
  }

  private loadDesserts(): void {
    this.http.get<Dessert[]>('/assets/data.json').subscribe({
      next: (data) => {
        const validatedData = data.filter(
          (dessert) =>
            dessert &&
            dessert.name &&
            dessert.price &&
            dessert.category &&
            dessert.image,
        );
        this.dessertsSubject.next(validatedData);
        if (data.length !== validatedData.length) {
          console.warn('Some desserts were invalid and filtered out:', data);
        }
      },
      error: (error) => {
        console.error('Error fetching desserts:', error);
        this.dessertsSubject.next([]);
      },
    });
  }
}
