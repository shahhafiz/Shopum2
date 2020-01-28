import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from "../../services/authentication.service";
import { ToastService } from "../../services/toast.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/user';
import { FirebaseApp } from '@angular/fire';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit{
  email: string;
  password: string;
  password2: string;

  pattern = new RegExp("[a-zA-z]*@siswa.um.edu.my")
  constructor(
    private authentication : AuthenticationService,
    private navCtrl : NavController,
    private toast: ToastService,
    private firebase  : FirebaseApp,
    private afAuth : AngularFireAuth,
    private afs : AngularFirestore,
  ) { 
  }

  ngOnInit(){}

  signup(){
    if(!this.email.includes("@siswa.um.edu.my")) {
      this.toast.showToast("Only siswamail is allowed for sign up")
      this.email = "";
    } else if(this.password != this.password2){
      this.toast.showToast("Your passwords did not match");
      this.password = "";
      this.password2 = "";
    } else {
      this.register(this.email, this.password)
      .then(() => {
        this.sendVerificationEmail();
        this.navCtrl.back();
      });
    }
  }

  register(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(output => {
        this.addUserToDB(output);
        resolve(output);
      })
      .catch(output => {
        this.toast.showToast("Ops! "+output.message);
        reject(output);
      });
    });
  }

  addUserToDB(userCredential: firebase.auth.UserCredential){
    var email = userCredential.user.email;
    var res = email.split("@");
    // console.log(userCredential.user.email);
    // console.log(userCredential.user.uid);
    var user:User = {
      email: userCredential.user.email,
      uid: userCredential.user.uid,
      name: res[0],
      phoneNumber: null,
      enabled: true,
      isFirstTimeLogin: true,
      ethnicity:null,
      age:null,
      gender:null,
      study:null,
      faculty:null,
      college:null
    }
    this.afs.collection("users").doc(user.uid).set(user)
    .then(() => {});
  }

  sendVerificationEmail(){
    let user = this.getCurrentUser();
    user.sendEmailVerification();
    // this.toast.showToast("An email has been sent to "+user.email+" for verification");
    this.toast.showToast("You are just one step away! A verification email has been sent to "+user.email+".");
  }

  getCurrentUser() {
    return this.firebase.auth().currentUser;
  }

}
