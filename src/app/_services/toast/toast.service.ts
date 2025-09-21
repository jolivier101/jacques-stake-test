import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async show(
    message: string,
    duration = 2000,
    color: string = 'primary',
    position: 'top' | 'middle' | 'bottom' = 'top'
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      position,
      cssClass: 'my-toast'
    });
    await toast.present();
  }
}
