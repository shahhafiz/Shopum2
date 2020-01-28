import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toast : ToastController
  ) { }

  async showToast(text: string){
    const toast = await this.toast.create({
      message: text,
      duration: 2000,
      position: 'top'
    })
    toast.present();
  }
  async showToastBottom(text: string){
    const toast = await this.toast.create({
      message: text,
      duration: 2000,
      position: 'bottom'
    })
    toast.present();
  }
}
