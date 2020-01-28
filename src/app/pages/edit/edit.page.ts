import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage {
  oldName : string;
  id : string;
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
  form: FormGroup;
  private itemsCollection: AngularFirestoreCollection;
  data: boolean;
  show: boolean;
  
  constructor(
    private formBuilder: FormBuilder,
    public navCtrl : NavController,
    private route : ActivatedRoute,
    private afs : AngularFirestore,
    private toast : ToastService,
    ) {
  }

  ionViewWillEnter(){
    let stop = false;
    this.data = false;
    this.show = false;

    this.itemsCollection = this.afs.collection('items'); 
    this.id = this.route.snapshot.paramMap.get('id');
    let subs = this.afs.doc<Item>('items/'+this.id)
    .valueChanges()
    .subscribe(snap => {
      this.item = snap;
      this.oldName = this.item.name;
      this.data = !this.data;
    })

    setTimeout(() => {
      subs.unsubscribe();
    }, 1000);
  }
  
  imageLoaded(){
    this.show = !this.show; 
  } 
  
  cancel(){
    this.navCtrl.back();
  }

  async save(){
    this.itemsCollection.doc(this.id).set(this.item)
    .then(() => {
      this.toast.showToastBottom("Successful!");
    })
    .then(() => {
      if(this.item.name != this.oldName){
        this.updateItemRegistry(this.oldName,this.item.name);
      }
    })
    .catch(err => {
      console.log(err);
    }).finally(() => {
      this.navCtrl.back();
    })
  }

  updateItemRegistry(oldName:string, newName:string){
    let stop = false;
    let items = [];
    const ref = this.afs.doc("registry/itemRegistry"); 
    ref.valueChanges().subscribe((snap:any) => {
      if(!stop){
        items = snap.items
        for (let i = 0; i < items.length; i++) {
          if(items[i] == oldName) {
            console.log("Change name");
            items[i] = newName
          }; 
        }
        ref.set({items:items});
      }
      stop = true;
    });
  }
}