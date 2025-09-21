import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { OrderFormComponent } from '../../pages/order-form/order-form.component';
import { Stock } from '../../_models/models';

@Injectable({
  providedIn: 'root',
})
export class OrderFormHelperService {
  constructor(private modalCtrl: ModalController) {}

  async openOrderForm(stockItem: Stock) {
    const modal = await this.modalCtrl.create({
      component: OrderFormComponent,
      componentProps: { stock: stockItem },
      breakpoints: [0, 0.5, 0.9],
      initialBreakpoint: 0.5,
      cssClass: 'custom-modal'
    });
    await modal.present();

    const { data, role } = await modal.onDidDismiss();
    return { data, role };
  }
}
