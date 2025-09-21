import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { InvestComponent } from './invest.component';
import { StockService } from '../../_services/stock/stock.service';

describe('InvestComponent', () => {
  let component: InvestComponent;
  let fixture: ComponentFixture<InvestComponent>;
  let stockServiceSpy: jasmine.SpyObj<StockService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('StockService', [
      'getHoldings',
      'getTotalEquity',
      'getTrendingStocks'
    ]);

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [InvestComponent],
      providers: [{ provide: StockService, useValue: spy }]
    }).compileComponents();

    stockServiceSpy = TestBed.inject(StockService) as jasmine.SpyObj<StockService>;

    stockServiceSpy.getHoldings.and.returnValue(of([
      { symbol: 'AAPL', shares: 1, price: 100, changePercent: 2 }
    ]));
    stockServiceSpy.getTotalEquity.and.returnValue(of(100));
    stockServiceSpy.getTrendingStocks.and.returnValue(of([
      { symbol: 'FIG', name: 'Figma Inc', price: 131.04 }
    ]));

    fixture = TestBed.createComponent(InvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show total equity', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.total-equity').textContent).toContain('$100.00');
  });

  it('should list holdings', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('ion-item h2').textContent).toContain('AAPL');
  });
});
