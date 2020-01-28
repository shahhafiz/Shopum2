import { Component } from '@angular/core';

import { Platform, NavController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Storage } from "@ionic/storage";
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './models/user';

import { Deeplinks } from "@ionic-native/deeplinks/ngx";
import { ToastService } from './services/toast.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home/all',
      // icon: 'home'
    },
    {
      title: 'Profile',
      url: '/profile',
      // icon: 'person'
    },
    {
      title: 'My Items',
      url: '/my-items',
      // icon: 'pricetag'
    },
    // {
    //   title: 'Conversations',
    //   url:'/conversations'
    // },
    {
      title: 'About',
      url: '/about',
      // icon: 'information-circle-outline'
    },
    {
      title: 'Logout',
      url:"LOGOUT"
    }
  ];

  // user: User = null;
  username: string;
  subscription : any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl:  NavController,
    private authentication: AuthenticationService,
    private storage: Storage,
    private afs: AngularFirestore,
    private toast: ToastService,
    ) {
      console.log("App Component")
      this.storage.get("userID")
      .then(userID => {
        this.subscription = this.afs.doc<User>("users/" + userID)
        .valueChanges()
        .subscribe((snap: User) => {
          if(snap){
            this.username = snap.name;
            if(!snap.enabled){
              this.click("LOGOUT");
            }
          } 
          
          this.initializeApp(snap);
        })
    })
  }
    
  initializeApp(user: User) {
    console.log("initializeApp");
    // if(user) {console.log(user)} 
    // else {console.log("no user logged in")};
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.splashScreen.hide();
      this.unsubscribe();
      console.log(user);
      
      if(user){
        if(user.isFirstTimeLogin){
          this.navCtrl.navigateRoot("/userdetailsform");
        } else {
          this.navCtrl.navigateRoot("/home/all");
          // this.navCtrl.navigateRoot("/add");
        }
      } else {
        this.navCtrl.navigateRoot("/login")
        
      }
    });
  }

  // side bar navigation
  click(url:string){
    if(url != "LOGOUT"){
      this.navCtrl.navigateRoot(url);
    } else {
      console.log("Logout");
      this.authentication.logout().then(() => {
        this.navCtrl.navigateRoot("/login");
      });
    }
  }

  unsubscribe(){
    this.subscription.unsubscribe();  
  }  
}
