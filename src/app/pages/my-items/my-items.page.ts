import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/user';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.page.html',
  styleUrls: ['./my-items.page.scss'],
})
export class MyItemsPage {
  items = [];
  userID : string;
  user: User;
  constructor(
    private afs   : AngularFirestore,
    private storage: Storage,
    private alertCtrl: AlertController,
    private navCtrl: NavController
    ) {
      this.storage.get("userID")
      .then(userID => {
        this.userID = userID;
      }).then(() => {
        this.afs.doc<User>("users/"+this.userID)
        .valueChanges()
        .subscribe(snap => {
          this.user = snap;
        });

        this.afs.collection<Item[]>("items", ref => ref
        .where("owner.id", "==" , this.userID)
        .orderBy("timestamp","desc"))
        .snapshotChanges()
        .subscribe(snap => {
          this.items = snap.map(item => {
            const data = item.payload.doc.data()
            const doc = item.payload.doc
            return { ...data, doc}
          });
          console.log(this.items);
        });
      })
  }

  add(){
    if(this.user.phoneNumber){
      this.navCtrl.navigateForward("/add");
    } else {
      this.alertAddPhoneNumber();
    }
  }

  async alertAddPhoneNumber() {
    const alert = await this.alertCtrl.create({
      header: 'Add your phone number first!',
      message: 'You will be directed to <strong>Profile page</strong>.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'text-black',
          handler: () => {
          }
        }, {
          text: 'Ok',
          cssClass: 'success',
          handler: () => {
            this.navCtrl.navigateRoot("/profile");
          }
        }
      ]
    });

    await alert.present();
  }
}