import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Dessert } from '../../models/dessert.interface';

interface CartItem {
  dessert: Dessert;
  quantity: number;
}

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent {
  @Input() cartItems: CartItem[] = [];
  @Input() totalPrice: number = 0;
  @Output() closeModal = new EventEmitter<void>();
  @Output() startNewOrder = new EventEmitter<void>();

  constructor(private cartService: CartService) {}

  onStartNewOrder() {
    this.cartService.clearCart();
    this.startNewOrder.emit();
    this.closeModal.emit();
  }
}