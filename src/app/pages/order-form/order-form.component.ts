import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { sharedImports } from '../../_shared/shared-imports';
import { OrderRequest, Stock } from '../../_models/models';
import {
  Gesture,
  GestureController,
  ModalController,
} from '@ionic/angular/standalone';
import { StockService } from '../../_services/stock/stock.service';

import { addIcons } from 'ionicons';
import { arrowForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'order-form',
  imports: [...sharedImports],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  standalone: true,
})
export class OrderFormComponent {
  @Input() stock!: Stock;

  //@ViewChild('swipeHandle', { read: ElementRef }) swipeHandle!: ElementRef;

  order: OrderRequest = {
    symbol: '',
    priceType: 'market',
    amount: 0,
    shares: 0,
    stockPrice: 0
  };

  constructor(
    private modalCtrl: ModalController,
    private stockService: StockService,
    private gestureCtrl: GestureController
  ) {
    addIcons({arrowForwardOutline});
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    //this.initSwipeGesture();
  }

  calculateShares() {
    if (this.stock.price > 0) {
      this.order.shares = +(this.order.amount / this.stock.price).toFixed(2);
    }
  }

  // private initSwipeGesture() {
  //   const handleEl = this.swipeHandle.nativeElement;
  //   const parentWidth = handleEl.parentElement.offsetWidth;

  //   const gesture: Gesture = this.gestureCtrl.create({
  //     el: handleEl,
  //     threshold: 0,
  //     gestureName: 'swipe-to-buy',
  //     onMove: (ev: any) => {
  //       const newX = Math.min(
  //         Math.max(0, ev.deltaX),
  //         parentWidth - handleEl.offsetWidth
  //       );
  //       handleEl.style.transform = `translateX(${newX}px)`;
  //     },
  //     onEnd: (ev: any) => {
  //       const endX = ev.deltaX;
  //       if (endX > parentWidth * 0.6) {
  //         handleEl.style.transform = `translateX(${
  //           parentWidth - handleEl.offsetWidth
  //         }px)`;
  //         this.submitOrder();
  //       } else {
  //         handleEl.style.transition = 'transform 0.3s ease';
  //         handleEl.style.transform = 'translateX(0px)';
  //         setTimeout(() => (handleEl.style.transition = ''), 300);
  //       }
  //     },
  //   });

  //   gesture.enable(true);
  // }

  async submitOrder() {
    this.order.stockPrice = this.stock.price;
    this.order.symbol = this.stock.symbol;
    this.stockService.placeOrder(this.order).subscribe((resp) => {
      console.log('Order placed:', resp);
      this.modalCtrl.dismiss(resp, 'success');
    });
  }

  dismiss() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
