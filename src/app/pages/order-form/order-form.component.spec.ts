import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, GestureController, ModalController } from '@ionic/angular';
import { OrderFormComponent } from './order-form.component';
import { of } from 'rxjs';
import { StockService } from '../../_services/stock/stock.service';

describe('OrderFormComponent (gesture)', () => {
  let component: OrderFormComponent;
  let fixture: ComponentFixture<OrderFormComponent>;
  let stockServiceSpy: jasmine.SpyObj<StockService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('StockService', ['placeOrder']);
    spy.placeOrder.and.returnValue(of({ orderId: 'ORD123', status: 'pending', filledShares: 0 }));

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [OrderFormComponent],
      providers: [
        { provide: StockService, useValue: spy },
        ModalController,
        GestureController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;
    component.symbol = 'FIG';
    component.price = 58.44;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate shares correctly', () => {
    component.order.amount = 500;
    component.calculateShares();
    expect(component.order.shares).toBeCloseTo(8.55, 2);
  });

  // it('should call placeOrder on submit', () => {
  //   component.submitOrder();
  //   expect(stockServiceSpy.placeOrder).toHaveBeenCalled();
  // });
});
