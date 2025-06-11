// add-to-cart.component.ts
import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Dessert } from '../../models/dessert.interface';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent {
  @Input() dessert!: Dessert;
  isAddedToCart = false;
  quantity = 1;

  constructor(private cartService: CartService) {}

  // add-to-cart.component.ts
addToCart() {
  if (!this.dessert) {
    console.error('Dessert is undefined');
    return;
  }
  this.cartService.addToCart(this.dessert, this.quantity);
  this.isAddedToCart = true;
}

  decreaseProductItem() {
    if (this.quantity > 1) {
      this.quantity--;
      this.cartService.updateQuantity(this.dessert, this.quantity);
    }
  }

  increaseProductItem() {
    this.quantity++;
    this.cartService.updateQuantity(this.dessert, this.quantity);
  }
}