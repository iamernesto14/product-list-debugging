import { Component } from '@angular/core';
// import { AddToCartComponent } from "./components/add-to-cart/add-to-cart.component";
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';


@Component({
  selector: 'app-root',
  imports: [ProductCardComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  title = 'Product list';
};
