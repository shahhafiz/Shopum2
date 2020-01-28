import { Component } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { CameraService } from 'src/app/services/camera.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Storage } from "@ionic/storage";
import { Camera } from "@ionic-native/camera/ngx";
import { Item } from 'src/app/models/item';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {
  private userID : string;
  private itemsCollection: AngularFirestoreCollection;
  private usersCollection: AngularFirestoreCollection;
  private tagsCollection: AngularFirestoreCollection;
  imageData = null;
  form: FormGroup;
  loading = false;
  tags = [];
  id: string;
  private item: Item = {
    name        : null,
    price       : null,
    description : null,
    url         : null,
    owner       : { id : null, name : null},
    timestamp   : null,
    category    : null,
    faulty      : null, 
    view        : 0,
  }
  
  constructor(private formBuilder: FormBuilder,
      private actionSheetController : ActionSheetController,
      private toast                 : ToastService,
      private cameraService         : CameraService,
      private dbService             : DatabaseService,
      private navCtrl               : NavController,
      private camera                : Camera,
      private afs                   : AngularFirestore,
      private storage               : Storage,
      // private afStorage             : AngularFireStorage
    
    ) {
      // this.updateItemRegistry();
      this.itemsCollection  = afs.collection('items');
      this.usersCollection  = afs.collection('users');
      this.tagsCollection   = afs.collection('tags');
      this.id               = this.afs.createId();

      this.storage.get("userID").then(output => {
        this.userID = output;
      });
  }

  async addImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.camera.getPicture(this.cameraService.cameraOptions)
            .then( imageData => {
              this.imageData = "data:image/png;base64," + imageData;
              // this.resizeImage();
            });
          }
        },{
          text: 'Gallery',
          handler: () => {
            this.camera.getPicture(this.cameraService.libraryOptions)
            .then( imageData => {
              this.imageData = "data:image/png;base64," + imageData;
            });
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async save(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 5000);

    var userRef = this.usersCollection.doc(this.userID);
    // upload image first
    // this.dbService.uploadImageToFireStorage(this.imageData, this.id).then((output:string) => {
      // get url
      // this.item.url = output;
      userRef.get().toPromise()
      .then((user) => {
        //get other data
        this.item.owner.id = user.get("uid");
        this.item.owner.name = user.get("name");
        this.item.timestamp = new Date();
      })
      .then(() => {
        // store data to db
        console.log(this.item);
        this.itemsCollection.doc(this.id).set(this.item)
        .then(() => {
          this.updateItemRegistry(this.item.name);
          this.navCtrl.navigateRoot("/my-items");
        });
      });
    // }).catch(err => {
    //   this.toast.showToast("Please upload a photo of your item!");
    // }).finally(() => {
    //   this.loading = false;
    // });
  }

  updateItemRegistry(newItem: string){
    let stop = false;
    let items = [];
    const ref = this.afs.doc("registry/itemRegistry"); 
    ref.valueChanges().subscribe((snap:any) => {
      if(!stop){
        items = snap.items
        items.push(newItem);
        ref.set({items:items});
      }
      stop = true;
    })
  }
}
