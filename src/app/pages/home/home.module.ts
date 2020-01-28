import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

import { ApplicationPipesModule } from "../../pipes/application-pipes.module";
import { CatalogComponent } from "../../components/catalog/catalog.component";
import { NgxMasonryModule } from "ngx-masonry";
const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ApplicationPipesModule,
    NgxMasonryModule,
  ],
  declarations: [HomePage, CatalogComponent]
})
export class HomePageModule {}
