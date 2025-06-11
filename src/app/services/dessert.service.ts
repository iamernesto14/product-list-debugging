import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dessert } from '../models/dessert.interface';

@Injectable({
  providedIn: 'root'
})
export class DessertService {
  private dessertsSubject = new BehaviorSubject<Dessert[]>([]);
  desserts$ = this.dessertsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadDesserts();
  }

  private loadDesserts(): void {
    this.http.get<Dessert[]>('/assets/data.json').subscribe({
      next: (data) => this.dessertsSubject.next(data),
      error: (error) => {
        console.error('Error fetching desserts:', error);
        this.dessertsSubject.next([]); // Fallback to empty array
      }
    });
  }
}