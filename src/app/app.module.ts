import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { Camera } from "@ionic-native/camera/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { IonicStorageModule } from "@ionic/storage";
import { Deeplinks } from "@ionic-native/deeplinks/ngx";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDX9-HcRJbMg3Xtczc4u9ycevht8D_qYbI",
  authDomain: "fir-auth-5f721.firebaseapp.com",
  databaseURL: "https://fir-auth-5f721.firebaseio.com",
  projectId: "fir-auth-5f721",
  storageBucket: "fir-auth-5f721.appspot.com",
  messagingSenderId: "733963954079"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,

    BrowserAnimationsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SocialSharing,
    Deeplinks,
    Camera,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
