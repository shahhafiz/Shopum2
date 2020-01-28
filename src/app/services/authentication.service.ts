import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastService } from "../services/toast.service";
import { User } from "../models/user";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Storage } from "@ionic/storage";
// import { OnInit } from "@angular/core";
@Injectable({
  providedIn: 'root'
}
)
export class AuthenticationService {

  private collection: AngularFirestoreCollection;
  
  constructor(
    private afAuth    : AngularFireAuth,
    
    private toast     : ToastService,
    private afs       : AngularFirestore,
    private storage   : Storage,
  ) {
    this.collection = afs.collection('users');
   }


  

  
  
  
   
  logout(){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut()
      .then(()=>{
        this.storage.set("userID", null);
        resolve()
      })
      .catch((output) => {
        reject(output)
      })
    })
  }
      
  resetPassword(email: string){
    return new Promise((resolve, reject) => {
      // this.firebase.auth().sendPasswordResetEmail(email)
      this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => {
        this.toast.showToast("An email has been sent to " + email);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
}
