import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from "@ionic/storage";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-userdetailsform',
  templateUrl: './userdetailsform.page.html',
  styleUrls: ['./userdetailsform.page.scss'],
})
export class UserdetailsformPage implements OnInit {
  myForm : FormGroup;
  id : string;
  constructor(
    private formBuilder : FormBuilder,
    private afs : AngularFirestore,
    private storage : Storage,
    private navCtrl : NavController  
  ) {
    this.storage.get('userID').then(id => {
      this.id = id;
    });

    this.myForm = this.formBuilder.group({
      gender: ['', Validators.required],
      age: ['', Validators.required],
      ethnicity: ['', Validators.required],
      faculty: ['', Validators.required],
      study: ['', Validators.required],
      college: ['', Validators.required],
      isFirstTimeLogin : [false]
    });
   }

  ngOnInit() {
  }

  logForm(){
    console.log(this.myForm.value);
    this.afs.doc("users/"+this.id).update(this.myForm.value)
    .then(() => {
      this.navCtrl.navigateRoot("/home/all");
    });
  }

}
