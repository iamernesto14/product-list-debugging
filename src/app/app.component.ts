import { Component } from '@angular/core';
import desseretData from '../../public/data.json';
import { AddToCartComponent } from "./components/add-to-cart/add-to-cart.component";

// interface
interface Dessert {
  image: DessertImages;
  name: string;
  category: string;
  price: number;
};

interface DessertImages {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
};

@Component({
  selector: 'app-root',
  imports: [AddToCartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  title = 'Product list';
  desserts:Dessert[] | null = null;

  constructor() {
    this.desserts = desseretData;
  };
};
