import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import {
  Holding,
  Stock,
  StockSearchResult,
  OrderRequest,
  OrderResponse,
} from '../../_models/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  // Mock holdings
  private holdings$ = new BehaviorSubject<Holding[]>([
    { symbol: 'AAPL', shares: 3.0282, price: 105.44, changePercent: 22.9 },
    { symbol: 'TSLA', shares: 3.0282, price: 105.44, changePercent: 22.9 },
    { symbol: 'TIK', shares: 3.0282, price: 105.44, changePercent: 22.9 },
  ]);

  // Mock trending stocks
  private trendingStocks: Stock[] = [
    {
      type: 'stock',
      logoUrl: 'assets/img/figma-logo.svg',
      symbol: 'FIG',
      name: 'Figma Inc',
      price: 131.04,
      volume: '36.9m',
      marketCap: '1.2b',
      range: '30-32',
    },
    {
      type: 'stock',
      logoUrl: 'assets/img/figma-logo.svg',
      symbol: 'FIG',
      name: 'Figma Inc',
      price: 131.04,
      volume: '36.9m',
      marketCap: '1.2b',
      range: '30-32',
    },
    {
      type: 'stock',
      logoUrl: 'assets/img/figma-logo.svg',
      symbol: 'FIG',
      name: 'Figma Inc',
      price: 131.04,
      volume: '36.9m',
      marketCap: '1.2b',
      range: '30-32',
    },
  ];

  private endpoint: string = environment.stockApiUrl;
  constructor(private httpClient: HttpClient) {
    this.endpoint += this.endpoint.endsWith('/') ? '' : '/';
  }

  // --- API mocks ---

  getHoldings(): Observable<Holding[]> {
    return this.holdings$.asObservable();
  }

  getTotalEquity(): Observable<number> {
    return this.holdings$.pipe(
      // sum of shares * price
      // real API would provide this directly
      // but we compute here for demo
      delay(200), // simulate API latency
      (source) =>
        new Observable<number>((observer) => {
          source.subscribe((holdings) => {
            const total = holdings.reduce(
              (sum, h) => sum + h.shares * h.price,
              0
            );
            observer.next(total);
          });
        })
    );
  }

  getTrendingStocks(): Observable<Stock[]> {
    return of(this.trendingStocks).pipe(delay(200));
  }

  searchStocks(query: string): Observable<StockSearchResult[]> {
    const results: StockSearchResult[] = [
      { symbol: 'TIK', name: 'TikTok Corp', price: 78.38 },
      { symbol: 'TIK.A', name: 'TikTok Alt', price: 131.04 },
    ];
    return of(results).pipe(delay(300));
  }

  placeOrder(order: OrderRequest): Observable<OrderResponse> {
    // fake response
    const response: OrderResponse = {
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      status: 'pending',
      filledShares: 0,
    };
    return of(response).pipe(
      delay(1000),
      tap(() => {
        const current = this.holdings$.value; // get current array
        const updated = [
          ...current,
          {
            symbol: order.symbol,
            shares: order.shares,
            price: order.stockPrice,
            changePercent: 0,
          },
        ];
        this.holdings$.next(updated); // emit new array
      })
    ); // simulate order processing

    /**
     * this could be something like
     
       return this.httpClient.post(this.endpoint + 'api/orders',
        order,
        this.prepareOptions());
     
     */
  }

  private prepareOptions(): any {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + 'some bearer token');
    return { headers: httpHeaders };
  }
}
