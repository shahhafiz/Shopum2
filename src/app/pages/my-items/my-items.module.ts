import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyItemsPage } from './my-items.page';

import { ApplicationPipesModule } from "../../pipes/application-pipes.module";
const routes: Routes = [
  {
    path: '',
    component: MyItemsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ApplicationPipesModule
  ],
  declarations: [MyItemsPage]
})
export class MyItemsPageModule {}
