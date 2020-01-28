import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from "../../models/item";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { CatalogComponent } from 'src/app/components/catalog/catalog.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [
    trigger('inOutAnimation',[
      state('true', style({opacity:1})),
      state('false',style({transform: 'translateY(-10px)' ,opacity:0})),
      transition('false <=> true',animate(200))
    ])
  ]
})
export class HomePage implements OnInit {
  @ViewChild(CatalogComponent,{static:false}) catalog:CatalogComponent;
  itemRegistry = [];
  searchBar = false;
  ref: any;
  searchedKeyword = "";
  constructor(
    private afs : AngularFirestore,
    private toast: ToastService
    ) {
      this.ref = this.afs.collection('items');
      this.toast.showToastBottom("You have successfully add new item!");
   }
  ngOnInit(){
    this.afs.doc("registry/itemRegistry").valueChanges().subscribe((snap:any) => {
      this.itemRegistry = snap.items;
      // this.itemRegistry.forEach((item:string) => {
      //   console.log(item.toLowerCase().indexOf("perma"))
      // })
    });

    // setTimeout(() => {
    //   this.itemRegistry.forEach(item => {
    //     console.log(item);
    //   })
    // }, 5000);
  }

  found = [];
  showSearchBar(){
    this.searchBar = !this.searchBar;
    if(!this.showSearchBar){
      this.catalog.ngOnInit()
    }
  }

  search(){
    console.log(this.getKeywords(this.searchedKeyword));
    this.found = [];
    if(this.searchedKeyword == ""){
      return;
    } else {
      // let temp = this.searchedKeyword.split(" ");
      // console.log(temp);
      let tempItemRegistry = this.itemRegistry;
      let tempFound = [];
      this.getKeywords(this.searchedKeyword).forEach(key=>{
        tempFound = [];
        tempItemRegistry.forEach(item => {
          if(item.split(" ").join("").toLowerCase().indexOf(key.toLowerCase()) > -1){
            console.log("key:"+key+ "  item:"+item);
              tempFound.push(item);
          }
        });
        tempItemRegistry = tempFound;
      })
      // console.log(tempFound);
      if(this.searchedKeyword.length > 0 && tempFound.length == 0){
        this.found[0] = "No results found"
      } else {
        this.found = tempFound;
      }
    }
  }

  getKeywords(keywords: string){
    console.log(keywords);
    let temp = keywords.split(" ");
    let temp2 = [];
    temp.forEach(t => {
      temp2.push(t);
      // if(t != "") {
      //   for (let i = 1; i <= t.length; i++) {
      //     temp2.push(t.substring(0,i));
      //   }
      // }
    }) 
    return temp2;
  }
}
