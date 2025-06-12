import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { CommonModule } from '@angular/common';
import { Dessert } from '../../models/dessert.interface';
import { By } from '@angular/platform-browser';
import { CartService } from '../../services/cart.service';
import { BehaviorSubject } from 'rxjs';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  const mockDessert: Dessert = {
    name: 'Chocolate Cake',
    category: 'Cake',
    price: 5.99,
    image: { thumbnail: 'thumb.jpg', mobile: 'mobile.jpg', tablet: 'tablet.jpg', desktop: 'desktop.jpg' },
  };

  beforeEach(async () => {
    // Mock CartService to satisfy AddToCartComponent
    const cartItemsSubject = new BehaviorSubject([]);
    cartService = jasmine.createSpyObj('CartService', ['addToCart', 'updateQuantity'], {
      cartItems$: cartItemsSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [CommonModule, ProductCardComponent, AddToCartComponent], // Import standalone components
      providers: [{ provide: CartService, useValue: cartService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.dessert = mockDessert;
    fixture.detectChanges(); // Ensure template is updated
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render dessert name, price, and category in the template', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.name')?.textContent).toContain('Chocolate Cake');
    expect(element.querySelector('.price')?.textContent).toContain('$5.99');
    expect(element.querySelector('.category')?.textContent).toContain('Cake');
  });

  it('should render dessert image with correct src and alt attributes', () => {
    const element = fixture.nativeElement as HTMLElement;
    const img = element.querySelector('.dessert-img') as HTMLImageElement;
    expect(img.src).toContain('thumb.jpg');
    expect(img.alt).toContain('Chocolate Cake');

    const sources = element.querySelectorAll('source');
    expect(sources[0].getAttribute('srcset')).toBe('mobile.jpg');
    expect(sources[1].getAttribute('srcset')).toBe('tablet.jpg');
    expect(sources[2].getAttribute('srcset')).toBe('desktop.jpg');
  });

  it('should pass dessert to AddToCartComponent', () => {
    const addToCartComponent = fixture.debugElement.query(By.directive(AddToCartComponent)).componentInstance;
    expect(addToCartComponent.dessert).toEqual(mockDessert);
  });
});