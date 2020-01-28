import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
export interface Tags{id:string; searchCount:number};

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage {
  loading = true;
  form: FormGroup
  tags: [];
  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private navCtrl: NavController
  ) { 
    afs.collection<any>("tags")
      .valueChanges({idField: "id"})
      .subscribe((snap: any) => {
        this.tags = snap;
        this.loading = false;
      });
    
    this.form = this.formBuilder.group({
      tags:[]
    })
  }

  searchByExistingTag(tag){
    this.afs.doc("tags/"+tag.id).set({searchCount: tag.searchCount+1});
    this.navCtrl.navigateRoot("/home/"+tag.id);
  }

  searchByCustomTag(form){
    // for (let i = 0; i < form.tags.length; i++) {
      const searchedTag = form.tags[0].value;
      const tag:Tags = this.tags.find((obj:Tags) => 
        obj.id == searchedTag
      )
      this.afs.doc("tags/"+tag.id).set({searchCount: tag.searchCount+1});
      this.navCtrl.navigateRoot("/home/"+tag.id);
    // }
  }
}
