import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-seed',
  templateUrl: './seed.page.html',
  styleUrls: ['./seed.page.scss'],
})
export class SeedPage implements OnInit {

  constructor(
    private afs:AngularFirestore
  ) {
    setTimeout(() => {
      this.seedItems();
      // this.seedItemRegistry();
      this.seedUsers();
    }, 5000);
  }
  ngOnInit() { }

  data:Item[] = [ 
    // 1
    {
    name: "Adidas Ultraboost Shoes Core", 
    // brand: "Adidas",
    price: 525,
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero nihil qui culpa eum distinctio ipsam inventore, perspiciatis error a labore.",
    url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTXe0OyXvzJ05qXuBU-rcxixgrrUGQazT7A08su6QKYFlaZY8O9BYJTGwBAGAdrtMAsEgYCzZn2qg&usqp=CAc",
    owner : {
        id : "ZonnE2AdvMyRhuhR5uOD",
        name : "wilson",
    },
    timestamp: new Date(2019,8,12),
    category: "Fashion",
    faulty: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    view: 0,
    },
    // 2
    {
    name: "Elite Roller Stationery Glue", 
    // brand: "Elite",
    price: 1.60,
    description: "For wide area gluing. High performance roller-ball-tip. No spills, no drips, no mess. Non toxic. Extra string bond. Ideal for school, home and office.",
    url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQzpiC0ep4CyYjGR7dYUeUs8arlfFW5_v3pjW_vJAgR_MGHljMTsbFzUWDePnj6v6YRExIMPoNy&usqp=CAc",
    owner : {
        id : "jeS4AESR1gz2ex1KDRLl",
        name : "kunal",
    },
    timestamp: new Date(2019,8,1),
    category: "Stationery",
    faulty: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    view: 0  
  },
    // 3
    {
    name: "Faster Permanent Marker", 
    // brand: "Faster",
    price: 2.50,
    description: "Acrylic tip. Xylene free. Heavy duty quality. Permanent and water proof. Longer cap-off time. Suitable for using on most surfaces. Conforms to ASTM D-4236 U.S.A. Conforms to European standard EN 71/3. Available in blue, black, red and green.",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5pgVCuhfGd1n4Ch5_l160eo6qf6THtjrWC1KdUG6cRWMqGkhLuw&s",
    owner : {
        id : "jeS4AESR1gz2ex1KDRLl",
        name : "kunal",
    },
    timestamp: new Date(2019,8,15),
    category: "Stationery",
    faulty: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    view: 0
    },
    // 4
    {
    name: "Faber-Casterll Blue Ballpoint Pen", 
    // brand: "Faber-Castell",
    price: 1.30,
    description: "Super soft colour writing. High colour intensity ink. Ventilated safety cap. With clip. Line width: M, ball diameter 1.0 mm.",
    // url: Object;
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTErC00TRg2N44dHslxu-Nry0kRfQK4FQAXGsXqNmrUS-ovRFxc&s",
    owner : {
        id : "ZonnE2AdvMyRhuhR5uOD",
        name : "wilson",
    },
    timestamp: new Date(2019,7,18),
    category: "Stationery",
    faulty: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    view: 0
    },
    // 5
    {
    name: "Faber-Castell Grip 2001 Triangular Eraser", 
    // brand: "Faber-Castell",
    price: 4,
    description: "High quality eraser in functional pencil shape. Ergonomic triangular grip zone. Smudge-free erasing. PVC-free. Colour: red, blue",
    url: "https://www.faber-castell.com.my/-/media/Products/Product-Repository/GRIP-eraser/24-24-22-Eraser/187101-Triangular-eraser-GRIP-2001-berryblue/Images/187101_10_PM1.ashx?bc=ffffff&as=0&h=450&w=450&hash=A3456B40813F183E167B04435C85EEC3FC32CA6A",
    owner : {
        id : "v2Iskn0mWFTD7FnnoIxyeKTluXA2",
        name : "iamshahhafiz",
    },
    timestamp: new Date(2019,7,20),
    category: "Stationery",
    faulty: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    view: 0
    },
    // 6
    {
    name: "Plain 100% Cotton Short Sleeve Round Neck T-Shirt Black", 
    // brand: "No brand",
    price: 5.9,
    description: "This is the 100% cotton basic T-Shirt with lycra neck rib, special silicone coat and enzyme wash to make it smooth and soft. In addition Oeko-tek complaint, safe, and tested to be free from more than 100 harmful substances",
    url: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT0iiW9ZgFReh2xU49mtRYoIuggXpF_jDr_urnjmYn2IQ1DLhW6Srp8eX1mR_x9BHuKBpbCWidkKQ&usqp=CAc",
    owner : {
        id : "jeS4AESR1gz2ex1KDRLl",
        name : "kunal",
    },
    timestamp: new Date(2019,9,12),
    category: "Fashion",
    faulty: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    view: 0
    },
    // 7
    {
    name: "Men Pants British Business Style", 
    // brand: "No brand",
    price: 60,
    description: " Quick dry & Breathable & Comfortable & Good Quality &100% brand new",
    url: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcREL3XFXLm8ucHCjDHE25ajCBVPNESEVyYevEo3dbMsk08Bkd9zmlcL5nVeRc1QsJd3zA7mmb89v8q04fsYEHyJjEQKLcg0s5K8edIi8Dbhrqwnk8xTdi4w&usqp=CAc",
    owner : {
        id : "vmoRXDSSbyCzWQzVAyNR",
        name : "masyitah",
    },
    timestamp: new Date(2019,6,1),
    category: "Fashion",
    faulty: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    view: 0
    },
    // 8
    {
    name: "Gaming PC", 
    // brand: "No brand",
    price: 699,
    description: " i5 GTX & Quad-Core PC BUDGET with WiFi FULLSET, Gaming & Design, AMD Cpu NVIDIA Gpu, Desktop Computer",
    url: "https://media.karousell.com/media/photos/products/2019/11/21/120148_261745118_thumbnailg_progressive_thumbnail",
    owner : {
        id : "vmoRXDSSbyCzWQzVAyNR",
        name : "masyitah",
    },
    timestamp: new Date(2019,6,6),
    category: "Electronic",
    faulty: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    view: 0
    },
    // 9
    {
    name: "Amazfit Smartwatch", 
    // brand: "Amazfit",
    price: 550,
    description: "Brand new. In box.",
    url: "https://media.karousell.com/media/photos/products/2019/10/07/191544_255509797_thumbnail_progressive_thumbnail.jpg",
    owner : {
        id : "vmoRXDSSbyCzWQzVAyNR",
        name : "masyitah",
    },
    timestamp: new Date(2019,2,2),
    category: "Electronic",
    faulty: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    view: 0
    },
    // 10
    {
    name: "iPhone Case Love", 
    // brand: "No brand",
    price: 40,
    description: "Available for IPHONE 6,6S,6S PLUS,7,7 PLUS,8,8 PLUS,X,XS,XR,XSMAX,11,11 PRO,11 PRO MAX",
    url: "https://media.karousell.com/media/photos/products/2019/11/25/iphone_case_love_1574615189_9883ef61_progressive.jpg",
    owner : {
        id : "v2Iskn0mWFTD7FnnoIxyeKTluXA2",
        name : "masyitah",
    },
    timestamp: new Date(2019,9,30),
    category: "Electronic",
    faulty: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    view: 0
    },
    // 11
    {
    name: "Typo Brown Leather Laptop", 
    // brand: "Typo",
    price: 65,
    description: "15 inch. Used a few times only. Condition tip-top",
    url: "https://media.karousell.com/media/photos/products/2019/11/15/typo_brown_leather_laptop_bag_15_inch_1573802922_d256eb59_progressive.jpg",
    owner : {
        id : "v2Iskn0mWFTD7FnnoIxyeKTluXA2",
        name : "iamshahhafiz",
    },
    timestamp: new Date(2019,9,28),
    category: "Fashion",
    faulty: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    view: 0
    },
    // 12
    {
    name: "Faber-Castell Colouring Set", 
    // brand: "Faber-Castell",
    price: 33,
    description: "Condition : New , not even opened.The one I opened to photograph is my kid’s own personal set. The one I’m selling has all the seals in tact. Not even removed. Refer to the photos Very very good value for money & different textures for kids to play around with 12 colours - magic markers",
    url: "https://media.karousell.com/media/photos/products/2019/11/07/fabercastell_colouring_set_authentic_1573115883_5fbb4d6d_progressive.jpg",
    owner : {
        id : "vmoRXDSSbyCzWQzVAyNR",
        name : "masyitah",
    },
    timestamp: new Date(2019,10,25),
    category: "Stationery",
    faulty: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    view: 0
    },
    // 13
    {
    name: "Reyn Spooner Harrington Vintage Jacket", 
    // brand: "Reyn Spooner Harrington",
    price: 60,
    description: "Good condition. No refund after purchase",
    url: "https://media.karousell.com/media/photos/products/2019/11/18/vintage_reyn_spooner_harrington_jacket_1574090750_4e892ba5_progressive.jpg",
    owner : {
        id : "v2Iskn0mWFTD7FnnoIxyeKTluXA2",
        name : "iamshahhafiz",
    },
    timestamp: new Date(2019,1,16),
    category: "Fashion",
    faulty: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    view: 0
    },
    // 14 
    {
    name: "Apple Mac Book Pro", 
    // brand: "Apple",
    price: 4500,
    description: "13 inch, i5, 8GB Ram, 256GB SSD, 2016, 2.0 GHz",
    url: "https://media.karousell.com/media/photos/products/2018/08/24/mac_book_pro_13_inchi5_8_gb_ram_256_gb_ssd_2016_20_ghz_1535078567_07d0a4fa0",
    owner : {
        id : "v2Iskn0mWFTD7FnnoIxyeKTluXA2",
        name : "iamshahhafiz",
    },
    timestamp: new Date(2019,10,15),
    category: "Fashion",
    faulty: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    view: 0
    },
    // 15
    {
    name: "Helmet Bell Magnum LTD Oren", 
    // brand: "LTD",
    price: 2,
    description: "Vintage bell megnum ltd oren, Vintage bell helmet. Size 59'.  Original bell usa. Warna oren original",
    url: "https://media.karousell.com/media/photos/products/2019/11/23/helmet_bell_magnum_ltd_oren_1574486858_a15728c1_progressive.jpg",
    owner : {
        id : "v2Iskn0mWFTD7FnnoIxyeKTluXA2",
        name : "iamshahhafiz",
    },
    timestamp: new Date(2019,10,28),
    category: "Vehicle",
    faulty: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    view: 0
    },
    // 16
    {
    name: "Razer black widow gaming keyboards", 
    // brand: "Razer",
    price: 380,
    description: "Used.",
    url: "https://media.karousell.com/media/photos/products/2019/07/15/razed_black_widow_gaming_keyboards_1563166366_96606c20_progressive.jpg",
    owner : {
        id : "v2Iskn0mWFTD7FnnoIxyeKTluXA2",
        name : "iamshahhafiz",
    },
    timestamp: new Date(2019,10,11),
    category: "Electronic",
    faulty: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    view: 0
    },
  ]

  items = [
    "Faster Permanent Marker", 
    "Elite Roller Stationery Glue",  
    "Adidas Ultraboost Shoes Core",
    "Faber-Casterll Blue Ballpoint Pen", 
    "Faber-Castell Grip 2001 Triangular Eraser",
    "Plain 100% Cotton Short Sleeve Round Neck T-Shirt Black",
    "Men Pants British Business Style",
    "Gaming PC",
    "Amazfit Smartwatch", 
    "iPhone Case Love",
    "Typo Brown Leather Laptop",
    "Faber-Castell Colouring Set",
    "Reyn Spooner Harrington Vintage Jacket",
    "Apple Mac Book Pro",
    "Helmet Bell Magnum LTD Oren",
    "Razer black widow gaming keyboards",
  ]

  userData : User[] = [
    {
      uid     : "v2Iskn0mWFTD7FnnoIxyeKTluXA2",
      name    : 'iamshahhafiz', 
      phoneNumber: 0,
      email   : 'iamshahhafiz@gmail.com',
      enabled : true,
      isFirstTimeLogin : false,
      age : '18 - 24',
      college : 'Out campus', 
      ethnicity : 'Malay',
      faculty : 'Computer Science and IT',
      gender : 'Male',
      study : 'Undergraduate',
    },
    {
      uid     : 'BfdZ7WLtu8Hs7yCK1zIm',
      name    : 'chua', 
      phoneNumber: 0,
      email   : 'chua@siswa.um.edu.my',
      enabled : true,
      isFirstTimeLogin : true,
      age : '18 - 24',
      college : 'KK8', 
      ethnicity : 'Chinese',
      faculty : 'Engineering',
      gender : 'Male',
      study : 'Undergraduate',
    },
    {
      uid     : 'ZonnE2AdvMyRhuhR5uOD',
      name    : 'wilson', 
      phoneNumber: 0,
      email   : 'wilson@siswa.um.edu.my',
      enabled : true,
      isFirstTimeLogin : true,
      age : '18 - 24',
      college : 'KK10', 
      ethnicity : 'Chinese',
      faculty : 'Computer Science and IT',
      gender : 'Male',
      study : 'Undergraduate',
    },
    {
      uid     : 'bP2OemAkA0TV8k2VCMgoMKhRFZJ2',
      name    : 'mohdshah', 
      phoneNumber: 0,
      email   : 'mohdshah@siswa.um.edu.my',
      enabled : true,
      isFirstTimeLogin : false,
      age : '18 - 24',
      college : 'KK8', 
      ethnicity : 'Malay',
      faculty : 'Computer Science and IT',
      gender : 'Male',
      study : 'Undergraduate',
    },
    {
      uid     : 'hvZLp4QrUPaNwl1DzH8yGh8cZpz1',
      name    : 'danial', 
      phoneNumber: 0,
      email   : 'danial@siswa.um.edu.my',
      enabled : true,
      isFirstTimeLogin : true,
      age : '25 - 34',
      college : 'KK6', 
      ethnicity : 'Malay',
      faculty : 'Medicine',
      gender : 'Male',
      study : 'Postgraduate',
    },
    {
      uid     : 'jeS4AESR1gz2ex1KDRLl',
      name    : 'kunal', 
      phoneNumber: 0,
      email   : 'kunal@siswa.um.edu.my',
      enabled : true,
      isFirstTimeLogin : true,
      age : '25 - 34',
      college : 'Out campus', 
      ethnicity : 'Indian',
      faculty : 'Computer Science and IT',
      gender : 'Male',
      study : 'Postgraduate',
    },
    {
      uid     : 'vmoRXDSSbyCzWQzVAyNR',
      name    : 'masyitah', 
      phoneNumber: 0,
      email   : 'masyitah@siswa.um.edu.my',
      enabled : true,
      isFirstTimeLogin : true,
      age : '18 - 24',
      college : 'KK8', 
      ethnicity : 'Malay',
      faculty : 'Malay Studies',
      gender : 'Female',
      study : 'Postgraduate',
    },
    // {
    //   uid     : '',
    //   name    : '', 
    //   phoneNumber: 0,
    //   email   : '',
    //   enabled : true,
    //   isFirstTimeLogin : true,
    //   age : '',
    //   college : '', 
    //   ethnicity : '',
    //   faculty : '',
    //   gender : '',
    //   study : '',
    // },
  ]

  seedItems(){
    console.log("seeding");
    this.data.forEach(item => {
      this.afs.collection<Item>("items").doc(this.afs.createId()).set(item).then(output => {
        console.log(output);
      })
      .catch(err => {
        console.log(err);
      });
    })
  }

  seedItemRegistry(){
    this.afs.doc("registry/itemRegistry").set({items:this.items})
  }

  seedUsers(){
    console.log("Number of user = "+this.userData.length);
    this.userData.forEach(user => {
      this.afs.collection("users").doc(user.uid).set(user);
    })
  }

}
