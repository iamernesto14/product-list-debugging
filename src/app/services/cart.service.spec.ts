import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Dessert } from '../models/dessert.interface';

describe('CartService', () => {
  let service: CartService;

  // Sample dessert objects for testing
  const validDessert: Dessert = {
    name: 'Chocolate Cake',
    category: 'Cake',
    price: 5.99,
    image: { thumbnail: '', mobile: '', tablet: '', desktop: '' },
  };
  const anotherDessert: Dessert = {
    name: 'Vanilla Ice Cream',
    category: 'Ice Cream',
    price: 3.99,
    image: { thumbnail: '', mobile: '', tablet: '', desktop: '' },
  };
  const invalidDessert: Dessert = {
    name: '',
    category: '',
    price: 0,
    image: { thumbnail: '', mobile: '', tablet: '', desktop: '' },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    // Clear cart before each test
    service.clearCart();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('cartItems$', () => {
    it('should reflect added items', (done) => {
      service.addToCart(validDessert, 2);
      service.cartItems$.subscribe(items => {
        expect(items).toEqual([{ dessert: validDessert, quantity: 2 }]);
        done();
      });
    });
  });

  describe('addToCart', () => {
    it('should add a new dessert with default quantity 1', () => {
      service.addToCart(validDessert);
      service.cartItems$.subscribe(items => {
        expect(items).toEqual([{ dessert: validDessert, quantity: 1 }]);
      });
    });

    it('should increment quantity for existing dessert', () => {
      service.addToCart(validDessert, 1);
      service.addToCart(validDessert, 2);
      service.cartItems$.subscribe(items => {
        expect(items).toEqual([{ dessert: validDessert, quantity: 3 }]);
      });
    });
  });

  describe('removeFromCart', () => {
    it('should remove an existing dessert', () => {
      service.addToCart(validDessert, 1);
      service.removeFromCart(validDessert);
      service.cartItems$.subscribe(items => {
        expect(items).toEqual([]);
      });
    });
  });

  describe('updateQuantity', () => {
    it('should update quantity for existing dessert', () => {
      service.addToCart(validDessert, 1);
      service.updateQuantity(validDessert, 5);
      service.cartItems$.subscribe(items => {
        expect(items).toEqual([ { dessert: validDessert, quantity: 5 }]);
      });
    });

  });

  describe('getTotalPrice', () => {
    it('should calculate total price for multiple items', () => {
      service.addToCart(validDessert, 2); // 2 * 5.99 = 11.98
      service.addToCart(anotherDessert, 1); // 1 * 3.99 = 3.99
      expect(service.getTotalPrice()).toBeCloseTo(11.98 + 3.99);
    });
  });

  describe('clearCart', () => {
    it('should reset cart to empty', () => {
      service.addToCart(validDessert, 1);
      service.clearCart();
      service.cartItems$.subscribe(items => {
        expect(items).toEqual([]);
      });
    });
  });
});