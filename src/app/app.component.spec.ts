import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DessertService } from './services/dessert.service';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { CommonModule } from '@angular/common';
import { Dessert } from './models/dessert.interface';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let dessertService: jasmine.SpyObj<DessertService>;
  let dessertsSubject: BehaviorSubject<Dessert[]>;

  const mockDesserts: Dessert[] = [
    {
      name: 'Chocolate Cake',
      category: 'Cake',
      price: 5.99,
      image: { thumbnail: 'thumb.jpg', mobile: 'mobile.jpg', tablet: 'tablet.jpg', desktop: 'desktop.jpg' },
    },
    {
      name: 'Vanilla Ice Cream',
      category: 'Ice Cream',
      price: 3.99,
      image: { thumbnail: 'thumb2.jpg', mobile: 'mobile2.jpg', tablet: 'tablet2.jpg', desktop: 'desktop2.jpg' },
    },
  ];

  beforeEach(async () => {
    dessertsSubject = new BehaviorSubject<Dessert[]>(mockDesserts);
    dessertService = jasmine.createSpyObj('DessertService', [], {
      desserts$: dessertsSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [CommonModule, AppComponent, ProductCardComponent, CartComponent],
      providers: [{ provide: DessertService, useValue: dessertService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger ngOnInit and initial rendering
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should update desserts from DessertService', fakeAsync(() => {
      dessertsSubject.next(mockDesserts);
      component.ngOnInit();
      tick();
      expect(component.desserts).toEqual(mockDesserts);
    }));
  });

  describe('template rendering', () => {
    it('should render app-product-card for each dessert', fakeAsync(() => {
      dessertsSubject.next(mockDesserts);
      fixture.detectChanges();
      tick();
      const productCards = fixture.debugElement.queryAll(By.directive(ProductCardComponent));
      expect(productCards.length).toBe(2);
      expect(productCards[0].componentInstance.dessert).toEqual(mockDesserts[0]);
      expect(productCards[1].componentInstance.dessert).toEqual(mockDesserts[1]);
    }));

    it('should render app-cart component', () => {
      const cartComponent = fixture.debugElement.query(By.directive(CartComponent));
      expect(cartComponent).toBeTruthy();
    });
  });
});