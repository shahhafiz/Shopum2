import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoriesPage } from './categories.page';
import { TagInputModule } from "ngx-chips";
const routes: Routes = [
  {
    path: '',
    component: CategoriesPage
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    TagInputModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
