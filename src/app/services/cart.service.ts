import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dessert } from '../models/dessert.interface';

interface CartItem {
  dessert: Dessert;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(dessert: Dessert, quantity: number = 1) {
    if (!dessert || !dessert.name || !dessert.price) {
      console.error('Invalid dessert object:', dessert);
      return;
    }
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.dessert?.name === dessert.name);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ dessert, quantity });
    }
    this.cartItemsSubject.next([...currentItems]);
  }

  removeFromCart(dessert: Dessert) {
    if (!dessert) return;
    const updatedItems = this.cartItemsSubject.value.filter(item => item.dessert?.name !== dessert.name);
    this.cartItemsSubject.next(updatedItems);
  }

  updateQuantity(dessert: Dessert, quantity: number) {
    if (!dessert || quantity < 1) return;
    const currentItems = this.cartItemsSubject.value;
    const item = currentItems.find(item => item.dessert?.name === dessert.name);
    if (item) {
      item.quantity = quantity;
      this.cartItemsSubject.next([...currentItems]);
    }
  }

  getTotalPrice(): number {
    return this.cartItemsSubject.value.reduce((total, item) => {
      if (item.dessert && item.dessert.price) {
        return total + item.dessert.price * item.quantity;
      }
      return total;
    }, 0);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }
}