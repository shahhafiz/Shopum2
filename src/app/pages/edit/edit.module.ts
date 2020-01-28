import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditPage } from './edit.page';
import { TagInputModule } from "ngx-chips";
const routes: Routes = [
  {
    path: '',
    component: EditPage
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
  declarations: [EditPage]
})
export class EditPageModule {}
