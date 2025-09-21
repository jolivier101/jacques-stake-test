import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingStockCardComponent } from './trending-stock-card.component';

describe('TrendingStockCardComponent', () => {
  let component: TrendingStockCardComponent;
  let fixture: ComponentFixture<TrendingStockCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingStockCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingStockCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
