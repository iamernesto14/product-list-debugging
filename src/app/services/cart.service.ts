// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dessert } from '../models/dessert.interface';
import { CartItem } from '../models/dessert.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(dessert: Dessert, quantity: number = 1) {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.dessert.name === dessert.name);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ dessert, quantity });
    }
    this.cartItemsSubject.next([...currentItems]);
  }

  removeFromCart(dessert: Dessert) {
    const updatedItems = this.cartItemsSubject.value.filter(item => item.dessert.name !== dessert.name);
    this.cartItemsSubject.next(updatedItems);
  }

  updateQuantity(dessert: Dessert, quantity: number) {
    const currentItems = this.cartItemsSubject.value;
    const item = currentItems.find(item => item.dessert.name === dessert.name);
    if (item && quantity >= 1) {
      item.quantity = quantity;
      this.cartItemsSubject.next([...currentItems]);
    }
  }

  getTotalPrice(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.dessert.price * item.quantity, 0);
  }
}