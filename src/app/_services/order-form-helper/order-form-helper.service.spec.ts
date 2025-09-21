import { TestBed } from '@angular/core/testing';

import { OrderFormHelperService } from './order-form-helper.service';

describe('OrderFormHelperService', () => {
  let service: OrderFormHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderFormHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
