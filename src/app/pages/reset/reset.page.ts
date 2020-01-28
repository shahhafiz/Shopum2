import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  email : string;

  constructor(
    private authentication : AuthenticationService,
    private navCtrl : NavController
  ) { }

  ngOnInit() {
  }

  resetPassword(){
    this.authentication.resetPassword(this.email)
    .then(() => {this.navCtrl.navigateRoot('/login');})
  }

}
