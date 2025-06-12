import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { OrderConfirmationComponent } from '../order-confirmation/order-confirmation.component';
import { CommonModule } from '@angular/common';
import { Dessert } from '../../models/dessert.interface';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;
  let cartItemsSubject: BehaviorSubject<any[]>;

  const mockDessert: Dessert = {
    name: 'Chocolate Cake',
    category: 'Cake',
    price: 5.99,
    image: { thumbnail: 'thumb.jpg', mobile: 'mobile.jpg', tablet: 'tablet.jpg', desktop: 'desktop.jpg' },
  };
  const mockCartItems = [{ dessert: mockDessert, quantity: 2 }];

  beforeEach(async () => {
    cartItemsSubject = new BehaviorSubject(mockCartItems);
    cartService = jasmine.createSpyObj('CartService', ['removeFromCart', 'getTotalPrice'], {
      cartItems$: cartItemsSubject.asObservable(),
    });
    cartService.getTotalPrice.and.returnValue(11.98); // 2 * 5.99

    await TestBed.configureTestingModule({
      imports: [CommonModule, CartComponent, OrderConfirmationComponent],
      providers: [{ provide: CartService, useValue: cartService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger ngOnInit and initial rendering
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should update cartItems and totalPrice from cartService', fakeAsync(() => {
      cartItemsSubject.next(mockCartItems);
      component.ngOnInit();
      tick();
      fixture.detectChanges();
      expect(component.cartItems).toEqual(mockCartItems);
      expect(component.totalPrice).toBe(11.98);
    }));
  });

  describe('removeItem', () => {
    it('should call cartService.removeFromCart', () => {
      component.removeItem(mockDessert);
      expect(cartService.removeFromCart).toHaveBeenCalledWith(mockDessert);
    });
  });

  describe('openModal', () => {
    it('should set showModal to true', () => {
      component.showModal = false;
      component.openModal();
      expect(component.showModal).toBeTrue();
    });
  });

  describe('closeModal', () => {
    it('should set showModal to false', () => {
      component.showModal = true;
      component.closeModal();
      expect(component.showModal).toBeFalse();
    });
  });

  describe('startNewOrder', () => {
    it('should set showModal to false', () => {
      component.showModal = true;
      component.startNewOrder();
      expect(component.showModal).toBeFalse();
    });
  });

  describe('template rendering', () => {
    it('should render cart items and total price', fakeAsync(() => {
      cartItemsSubject.next(mockCartItems);
      fixture.detectChanges();
      tick();
      const element = fixture.nativeElement as HTMLElement;
      const cartItem = element.querySelector('.cart-items li');
      const totalPrice = element.querySelector('.order-total p:last-child');
      expect(cartItem?.textContent).toContain('Chocolate Cake');
      expect(cartItem?.querySelector('.qty')?.textContent).toContain('2x');
      expect(cartItem?.querySelector('.price')?.textContent).toContain('$5.99');
      expect(cartItem?.querySelector('.mini-total')?.textContent).toContain('$11.98');
      expect(totalPrice?.textContent).toContain('$11.98');
    }));

    it('should render empty cart state when cartItems is empty', fakeAsync(() => {
      cartItemsSubject.next([]);
      fixture.detectChanges();
      tick();
      const element = fixture.nativeElement as HTMLElement;
      const emptyCart = element.querySelector('.empty-cart-content');
      expect(emptyCart).toBeTruthy();
      expect(emptyCart?.querySelector('.empty-cart-description')?.textContent).toContain('Your added items will appear here');
      expect(element.querySelector('.cart-items')).toBeNull();
    }));

    it('should call openModal when confirm order button is clicked', fakeAsync(() => {
      spyOn(component, 'openModal');
      fixture.detectChanges();
      tick();
      const button = fixture.nativeElement.querySelector('.confirm-order-btn');
      button.click();
      fixture.detectChanges();
      expect(component.openModal).toHaveBeenCalled();
    }));

    it('should show order confirmation component when showModal is true', fakeAsync(() => {
      component.showModal = true;
      fixture.detectChanges();
      tick();
      const orderConfirmation = fixture.debugElement.query(By.directive(OrderConfirmationComponent));
      expect(orderConfirmation).toBeTruthy();
      expect(orderConfirmation.componentInstance.cartItems).toEqual(mockCartItems);
      expect(orderConfirmation.componentInstance.totalPrice).toBe(11.98);
    }));

    it('should not show order confirmation component when showModal is false', fakeAsync(() => {
      component.showModal = false;
      fixture.detectChanges();
      tick();
      const orderConfirmation = fixture.debugElement.query(By.directive(OrderConfirmationComponent));
      expect(orderConfirmation).toBeNull();
    }));

    it('should update cart item count in header', fakeAsync(() => {
      cartItemsSubject.next(mockCartItems);
      fixture.detectChanges();
      tick();
      const header = fixture.nativeElement.querySelector('h2');
      expect(header?.textContent).toContain('Your Cart (1)');
    }));
  });
});