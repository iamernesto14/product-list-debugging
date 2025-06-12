import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DessertService } from './dessert.service';
import { Dessert } from '../models/dessert.interface';

describe('DessertService', () => {
  let service: DessertService;
  let httpMock: HttpTestingController;

  // Sample dessert data for testing
  const validDesserts: Dessert[] = [
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
  const invalidDesserts: Dessert[] = [
    {
      name: '',
      category: '',
      price: 0,
      image: null as any,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DessertService],
    }).compileComponents();

    service = TestBed.inject(DessertService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    // Mock the HTTP request initiated by the constructor
    const req = httpMock.expectOne('/assets/data.json');
    expect(req.request.method).toBe('GET');
    req.flush([]);
    expect(service).toBeTruthy();
  });

  describe('desserts$', () => {

    it('should emit valid desserts after successful HTTP call', fakeAsync(() => {
      // Subscribe to desserts$
      let emittedDesserts: Dessert[] | undefined;
      service.desserts$.subscribe(desserts => {
        emittedDesserts = desserts;
      });

      // Mock the constructor's HTTP request
      let req = httpMock.expectOne('/assets/data.json');
      req.flush([]);

      // Trigger loadDesserts() again by mocking a new request
      service['loadDesserts'](); // Access private method for testing
      req = httpMock.expectOne('/assets/data.json');
      expect(req.request.method).toBe('GET');
      req.flush(validDesserts);
      tick();

      expect(emittedDesserts).toEqual(validDesserts);
    }));
  });
});