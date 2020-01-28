export interface Item {
    // id: string; 
    name: string; 
    // brand: string;
    price: number; 
    description: string; 
    // url: Object;
    url: string;
    owner : {
        id : string;
        name : string;
    };
    timestamp: Date;
    category: string;
    faulty: string;
    view : number;
  }