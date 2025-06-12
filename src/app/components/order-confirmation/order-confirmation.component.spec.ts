import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderConfirmationComponent } from './order-confirmation.component';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Dessert } from '../../models/dessert.interface';
import { By } from '@angular/platform-browser';

describe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationComponent;
  let fixture: ComponentFixture<OrderConfirmationComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  const mockDessert: Dessert = {
    name: 'Chocolate Cake',
    category: 'Cake',
    price: 5.99,
    image: { thumbnail: 'thumb.jpg', mobile: 'mobile.jpg', tablet: 'tablet.jpg', desktop: 'desktop.jpg' },
  };
  const mockCartItems = [{ dessert: mockDessert, quantity: 2 }];

  beforeEach(async () => {
    cartService = jasmine.createSpyObj('CartService', ['clearCart']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, OrderConfirmationComponent],
      providers: [{ provide: CartService, useValue: cartService }],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderConfirmationComponent);
    component = fixture.componentInstance;
    component.cartItems = mockCartItems;
    component.totalPrice = 11.98; // 2 * 5.99
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onStartNewOrder', () => {
    it('should call cartService.clearCart and emit closeModal and startNewOrder events', () => {
      spyOn(component.closeModal, 'emit');
      spyOn(component.startNewOrder, 'emit');
      component.onStartNewOrder();
      expect(cartService.clearCart).toHaveBeenCalled();
      expect(component.closeModal.emit).toHaveBeenCalled();
      expect(component.startNewOrder.emit).toHaveBeenCalled();
    });
  });

  describe('template rendering', () => {
    it('should render cart items and total price', () => {
      const element = fixture.nativeElement as HTMLElement;
      const cartItem = element.querySelector('.cart-items li');
      expect(cartItem?.querySelector('.item-name')?.textContent).toContain('Chocolate Cake');
      expect(cartItem?.querySelector('.qty')?.textContent).toContain('2x');
      expect(cartItem?.querySelector('.price')?.textContent).toContain('$5.99');
      expect(cartItem?.querySelector('.mini-total')?.textContent).toContain('$11.98');
      const totalPrice = element.querySelector('.order-total p:last-child');
      expect(totalPrice?.textContent).toContain('$11.98');
      const image = cartItem?.querySelector('.item-image') as HTMLImageElement;
      expect(image.src).toContain('thumb.jpg');
      expect(image.alt).toContain('Chocolate Cake thumbnail');
    });

    it('should call onStartNewOrder when start new order button is clicked', () => {
      spyOn(component, 'onStartNewOrder');
      const button = fixture.nativeElement.querySelector('.start-order-btn');
      button.click();
      fixture.detectChanges();
      expect(component.onStartNewOrder).toHaveBeenCalled();
    });
  });
});