import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  @Input() searchedKeyword :string[];
  @ViewChild(IonInfiniteScroll,{static:false}) infiniteScroll: IonInfiniteScroll;
  private _data = new BehaviorSubject([]);
  items=[];
  allItemsLoaded = false;
  loading = false;
  pageIsReady = false;
  showSearchBar = false;
  skeletons = [1,2,3,4];
  constructor(
    private afs   : AngularFirestore,
    private navCtrl: NavController
  ) {}
  
  ngOnInit(){
    this.pageIsReady = false;
    this.allItemsLoaded = false;

    this.items = [];
    let ref:any;

    console.log(this.searchedKeyword);
    
    if(this.searchedKeyword[0] == "No results found"){
      this.loading = false;
      this.pageIsReady = true;
      this.allItemsLoaded = true;

    } else if(this.searchedKeyword.length == 0){
      ref = this.afs.collection<Item[]>("items",  ref => ref.orderBy("timestamp","desc").limit(8)); 
      this.update(ref);
    
    } else {
      this.allItemsLoaded = true;
      this.searchedKeyword.forEach(key => {
        ref = this.afs.collection<Item[]>("items", ref => ref.where("name","==",key).orderBy("timestamp","desc").limit(1));
        this.update(ref);
      })
    }
  }

  subs:any;
  update(ref:any){
    let stop = false; // stopper to prevent from receiving update.
    this.subs = ref
    .snapshotChanges()
    .subscribe(snap => {
      if(!stop){
        const newItems = snap.map(item => {
          const data = item.payload.doc.data()
          const doc = item.payload.doc
          return { ...data, doc}
        })
        this.items = [...this.items, ...newItems];
        console.log(this.items);
        this._data.next(this.items);
        if(newItems.length == 0){
          this.allItemsLoaded = true;
        };
        stop = true;
        this.pageIsReady = true;
        this.loading = false;
      }
    });
  }

  more(){
    let ref:any;
    if(this.searchedKeyword.length == 0){
      ref = this.afs.collection<Item>("items", 
      ref => ref.orderBy("timestamp","desc").limit(8).startAfter(this._data.value[this._data.value.length - 1].doc));
    } 
    // else {
    //   ref = this.afs.collection<Item>("items", 
    //   ref => ref.where("tags", "array-contains", this.searchedKeyword).orderBy("timestamp","desc").limit(8));
    // }
    this.update(ref);
  }

  
  loadData(event) {
    this.loading = !this.loading;
    setTimeout(() => {
      this.more();
    }, 500);
  }

  ngOnChanges(){
    if(this.pageIsReady){
      this.ngOnInit();
    }
  }
}