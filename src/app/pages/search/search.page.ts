import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from 'src/app/models/item';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  itemRegistry = [];
  searchedKeyword = "";
  ref: any;
  constructor(
    private formBuilder : FormBuilder,
    private afs : AngularFirestore
    ) {
      this.ref = this.afs.collection('items');
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

  search(){
    let found = [];
    console.log("Searching "+this.searchedKeyword);
    this.itemRegistry.forEach(item => {
      if(item.toLowerCase().indexOf(this.searchedKeyword.toLowerCase()) > -1){
        found.push(item);
      }
    })
    console.log(found);
  }

  // query(){
  //   this.ref.

  // }
}

//Query limitation
// 1. Queries with range filter on different fields [ ("age", "<", "30"), ("date", ">", "12-10-2019") ]
// 2. Logical OR queries. In the case, you should create a seperate query into a greater-condition
//    and merge the query results in your app
// 3. Queries with a != clause. In this case, you should split the query into a greater-than query
//    and less-than query. [ ("age", "<",  "30") , ("age", ">", "30")] 
// 4. At most one array-contains clause in a compound query