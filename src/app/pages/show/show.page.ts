import { Component } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage{
  data: boolean;
  show: boolean;
  userID: string;
  showChatButton: boolean = true;
  theUserIsTheOwner: boolean = true;
  id: string;
  ref:any;
  subscription:any;
  // owner: Observable<User>;
  owner: User = {
    uid: null,
    name: null,
    phoneNumber: null,
    email: null,
    enabled: null,
    isFirstTimeLogin: null,
    ethnicity:null,
    age:null,
    gender:null,
    study:null,
    faculty:null,
    college:null
  };
  item : Item = {
    name: null,  
    price: null,  
    description: null,  
    url: null, 
    owner :null, 
    timestamp: null, 
    category: null, 
    faulty: null,
    view: null
  };
  constructor(
    private storage:Storage,
    private route: ActivatedRoute, 
    private afs: AngularFirestore,
    private navCtrl: NavController,
    private socialSharing: SocialSharing,
    private dbService: DatabaseService,
    private alertCtrl: AlertController 
    ) { }

  ionViewWillEnter(){
    this.data = false;
    this.show = false;

    this.storage.get("userID")
    .then(userID => {
      this.userID = userID;
    })
    .then(() => {
      this.id = this.route.snapshot.paramMap.get('id'); 
      this.ref = this.afs.collection("items").doc(this.id);
      this.subscription = this.ref.valueChanges()
      .subscribe(snap => {
        this.item = snap;
        this.theUserIsTheOwner = (snap.owner.id == this.userID);
        this.data = !this.data;
        

        this.afs.doc<User>('users/'+this.item.owner.id)
        .valueChanges()
        .subscribe(snap => {
          this.owner = snap;
        });
      });
    });

    setTimeout(() => {
      /* 
      item.view is a newly created property.
      code below is design to handle item without view property 
      */
      if(this.item.hasOwnProperty('view')){
        this.item.view++;
        this.ref.update(this.item).then();
      } else {
        this.ref.update({view : 1});
      }
      this.subscription.unsubscribe();
    }, 5000);
  }


  imageLoaded(){
    this.show = !this.show; 
  }

  navigateBack(){

    this.navCtrl.back();
  }

  share(){
    console.log(this.item);
    const line = "Get "+this.item.name +" for RM"+this.item.price+" only at Shopum!";
    // this.socialSharing.shareViaWhatsApp(line, this.item.url)
    this.socialSharing.shareViaWhatsApp(line,this.item.url+".png","dummy url")
    .then((output) => {
      console.log(output)
    })
    .catch(err => {
      console.log(err);
    });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      // subHeader: 'Subtitle',
      message: 'You will not be able co recover this item!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'You will not be able to recover this item!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'primary',
          handler: (blah) => {
            console.log('Cancel delete');
          }
        }, {
          text: 'Yes, delete it!',
          cssClass: 'secondary',
          handler: () => {
            this.deleteItem();
          }
        }
      ]
    });
    
    await alert.present();
  }
  
  deleteItem(){
    this.afs.doc<Item>('items/'+this.id).delete();
    this.dbService.deleteImageFromFireStorage(this.id);
    this.navCtrl.navigateRoot("/my-items");
  }
}