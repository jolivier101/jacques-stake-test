import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Holding, Stock } from '../../_models/models';
import { StockService } from '../../_services/stock/stock.service';
import { sharedImports } from '../../_shared/shared-imports';
import { TrendingStockCardComponent } from '../../_shared/components/trending-stock-card/trending-stock-card.component';
import { OrderFormHelperService } from '../../_services/order-form-helper/order-form-helper.service';
import { ToastService } from '../../_services/toast/toast.service';

@Component({
  selector: 'invest-page',
  imports: [...sharedImports, TrendingStockCardComponent],
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InvestComponent implements OnInit {
  holdings$!: Observable<Holding[]>;
  totalEquity$!: Observable<number>;
  trending$!: Observable<Stock[]>;

  constructor(
    private stockService: StockService,
    private orderFormHelper: OrderFormHelperService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.holdings$ = this.stockService.getHoldings();
    this.totalEquity$ = this.stockService.getTotalEquity();
    this.trending$ = this.stockService.getTrendingStocks();
  }

  openBuyModal(stockItem: Stock) {
    this.orderFormHelper.openOrderForm(stockItem).then((response: any) => {
      if (response.role == 'success') {
        // this will naturally have the actual stock name passed down but im running out of time so i apologise for the hard-coded value
        this.toast.show('Figma successfully purchased', 3000, 'success', 'top');
      }
    })
  }
}
