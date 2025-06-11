import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { OrderConfirmationComponent } from '../order-confirmation/order-confirmation.component';
import { Dessert } from '../../models/dessert.interface';

interface CartItem {
  dessert: Dessert;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, OrderConfirmationComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  showModal = false;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      console.log('Cart items:', items); // Debug log
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  removeItem(dessert: Dessert) {
    this.cartService.removeFromCart(dessert);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  startNewOrder() {
    this.showModal = false;
  }
}