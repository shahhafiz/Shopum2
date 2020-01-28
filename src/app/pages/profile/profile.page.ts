import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastService } from 'src/app/services/toast.service';
import { User } from "../../models/user";
import { Storage } from "@ionic/storage";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  myForm : FormGroup;
  user : any;
  id : string;
  edit = false;
  userRef : any;
  private subscription;
  private obs : Observable<any>;
  constructor(
    private formBuilder : FormBuilder,
    private auth : AngularFireAuth,
    private afs : AngularFirestore,
    private storage : Storage,
    // private navCtrl : NavController,
    private toast : ToastService,
    private alertCtrl : AlertController 
  ) {
    this.storage.get('userID').then(id => {
      this.id = id;
      this.userRef = this.afs.doc<User>("users/"+this.id);
      this.userRef.valueChanges().subscribe((snap:User) => {
          this.populate(snap);
          this.user = snap;
      });
    });
    
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      ethnicity: ['', Validators.required],
      faculty: ['', Validators.required],
      study: ['', Validators.required],
      college: ['', Validators.required],
      phoneNumber: [null]
    });
  }

  ngOnInit() {
  
  }

  populate(user:User){
    this.myForm = this.formBuilder.group({
      email: [user.email, Validators.required],
      gender: [user.gender, Validators.required],
      age: [user.age, Validators.required, ],
      ethnicity: [user.ethnicity, Validators.required],
      faculty: [user.faculty, Validators.required],
      study: [user.study, Validators.required],
      college: [user.college, Validators.required],
      phoneNumber: [user.phoneNumber]
    });
  }

  save(form: FormGroup){
    this.myForm.value.phoneNumber = this.validatePhoneNumber(this.myForm.value.phoneNumber);
    this.userRef.update(form.value)
    .then(() => {
      this.toast.showToastBottom("You information have been saved successfully!")
      this.toggle();
    }).catch(err => {
      console.log(err);
    });
  }

  validatePhoneNumber(data: number){
    const phoneNumber = data.toString();
    if(phoneNumber.charAt(0) != "6"){
      return parseInt("60"+phoneNumber);
    } else {
      return phoneNumber;
    }
  }

  async changePassword() {
    const alert = await this.alertCtrl.create({
      header: 'Change password',
      inputs: [
        {
          name: 'oldPassword',
          type: 'password',
          placeholder: 'Old Password'
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'New Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.confirmChangePassword(data)
          }
        }
      ]
    });
    await alert.present();
  }

  confirmChangePassword(data: any){
    this.auth.auth.signInWithEmailAndPassword(this.user.email,data.oldPassword)
    .then(() => {
      this.auth.auth.currentUser.updatePassword(data.newPassword)
      .then(() => { 
        this.toast.showToastBottom("Password changed successfully!");  
      })
      .catch(e => { 
        console.log(e)})
    }).catch(e => { 
      console.log(e); 
      this.toast.showToastBottom("Wrong password")})
  }

  toggle(){
    this.edit = !this.edit;
  }

  cancel(){
    // this.populate(this.user);
    this.toggle();
  }
}
