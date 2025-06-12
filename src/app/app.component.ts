import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { DessertService } from './services/dessert.service';
import { Dessert } from './models/dessert.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductCardComponent, CartComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Product list';
  desserts: Dessert[] = [];

  constructor(private dessertService: DessertService) {}

  ngOnInit(): void {
    this.dessertService.desserts$.subscribe({
      next: (desserts) => (this.desserts = desserts),
      error: (error) => console.error('Error subscribing to desserts:', error),
    });
  }
}
