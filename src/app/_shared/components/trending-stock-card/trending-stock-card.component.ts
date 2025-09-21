import { Component, Input } from '@angular/core';
import { Stock } from '../../../_models/models';
import { sharedImports } from '../../shared-imports';

@Component({
  selector: 'trending-stock-card',
  imports: [...sharedImports],
  templateUrl: './trending-stock-card.component.html',
  styleUrl: './trending-stock-card.component.scss'
})
export class TrendingStockCardComponent {
  @Input() trendingStock!: Stock;
  @Input() size: 'lg' | 'md' | 'sm' = 'sm';
}
