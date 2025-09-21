import { Component } from '@angular/core';
import { sharedImports } from '../../_shared/shared-imports';
import { BehaviorSubject, debounceTime, Observable, switchMap } from 'rxjs';
import { Stock } from '../../_models/models';
import { StockService } from '../../_services/stock/stock.service';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'discover-page',
  imports: [...sharedImports],
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent {
  private searchQuery$ = new BehaviorSubject<string>('');
  recentlySearched$!: Observable<Stock[]>;
  searchResults$!: Observable<Stock[]>;

  constructor(private stockService: StockService) {}

  ngOnInit() {
    //this.recentlySearched$ = this.stockService.getRecentlySearched();

    // search results
    // this.searchResults$ = this.searchQuery$.pipe(
    //   debounceTime(300),
    //   switchMap((query) => {
    //     if (!query) {
    //       return this.stockService.getTrendingStocks(); // fallback to trending
    //     }
    //     return this.stockService.searchStocks(query);
    //   })
    // );
  }

  onSearchChange(ev: any) {
    const val = ev.detail.value || '';
    this.searchQuery$.next(val);
  }
}
