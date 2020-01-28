import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserdetailsformPage } from './userdetailsform.page';

const routes: Routes = [
  {
    path: '',
    component: UserdetailsformPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UserdetailsformPage]
})
export class UserdetailsformPageModule {}
