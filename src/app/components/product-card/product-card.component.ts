import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { Dessert } from '../../models/dessert.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, AddToCartComponent],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() dessert!: Dessert;
}
