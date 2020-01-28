import { Component, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email : string;
  password : string;

  constructor(
    private authentication: AuthenticationService,
    private navCtrl : NavController,
    private storage : Storage,
    private afs : AngularFirestore,
    private afAuth : AngularFireAuth,
    private toast : ToastService,
  ) {}

  ngOnInit() {}
  subscription:any;
  uid : string;
  login(){
    this.authenticate(this.email,this.password)
      .then((output:any) => {
        this.uid = output.user.uid; 
        this.storage.set("userID", this.uid);
      }).then(()=>{
        this.subscription = this.afs.doc<User>("users/"+this.uid)
        .valueChanges()
        .subscribe(snap => {
          if(!snap.enabled){
            this.accountIsSuspended();
            return;
          } 
          
          if(snap.isFirstTimeLogin){
            this.navCtrl.navigateRoot("/userdetailsform");
          } else {
            this.navCtrl.navigateRoot("/");
          }
        })
      });
  }

  accountIsSuspended(){
    this.subscription.unsubscribe();
    this.toast.showToast("This account is suspended.")
    this.authentication.logout().then(() => {
      this.navCtrl.navigateRoot("/login");
    });
  }

  async authenticate(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then( output => {
          console.log(output);
          if (output.user.emailVerified == false) {
            this.toast.showToast("Ops! Your email is not yet verifid. Please check your inbox.");
            reject("Email is not verified.")
          } else {
            resolve(output);
          }
        })
        .catch( output => {
          this.toast.showToast("Ops! "+output.message)
          console.log(output);
          reject(output);
        })
    })
  }
}
