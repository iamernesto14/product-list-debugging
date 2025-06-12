import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Dessert } from '../../models/dessert.interface';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @Input() dessert!: Dessert;
  isAddedToCart = false;
  quantity = 1;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      const item = items.find(i => i.dessert?.name === this.dessert?.name);
      this.isAddedToCart = !!item; // Set to true only if item exists
      this.quantity = item ? item.quantity : 1; // Reset quantity to 1 if item is not in cart
    });
  }

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