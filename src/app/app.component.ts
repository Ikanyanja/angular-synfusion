import { Component, OnInit } from '@angular/core';
import { DataManager, ODataAdaptor, Query, ReturnOption,Predicate } from '@syncfusion/ej2-data';
import { ApolloService } from './apollo-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 SERVICE_URI = 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders';
 public items?: object[] | any;
 public sortItems?: object[] | any;
 public pageItems?: object[] | any;
public oDataadaptorItems?: object[] | any;
 limit:number=8;


 constructor( private  api: ApolloService) {}


  public ngOnInit(): void {
    // this. Load();
    this. LoadWithLimit();
    this. LoadWithSort();
    this. LoadWithpage();
    this. LoadWithODataadaptor();
  }
  public Load(): void {
    new DataManager({ url: this.SERVICE_URI }).executeQuery(new Query().take(this.limit)).then((e: ReturnOption) => {
        this.items = e.result as object[];
    }).catch((e) => true);
}
  public LoadWithLimit(): void {
    new DataManager({ url: this.SERVICE_URI }).executeQuery(new Query().take(this.limit)).then((e: ReturnOption) => {
        this.items = e.result as object[];
    }).catch((e) => true);
}

public LoadWithSort(): void {
  new DataManager({ url: this.SERVICE_URI }).executeQuery(new Query().sortBy('CustomerID').take(this.limit)).then((e: ReturnOption) => {
      this.sortItems = e.result as object[];
  }).catch((e) => true);
}

public LoadWithSortDesc(): void {
  new DataManager({ url: this.SERVICE_URI, adaptor: new ODataAdaptor})
  .executeQuery(new Query().sortBy('CustomerID', 'descending').take(8))
  .then((e: ReturnOption) => this.items = e.result as object[]).catch((e) => true);
}
public LoadWithpage(): void {
  new DataManager({ url: this.SERVICE_URI }).executeQuery(new Query().page(1, 8)).then((e: ReturnOption) => {
      this.pageItems = e.result as object[];
  }).catch((e) => true);
}

 
public LoadWithODataadaptor(): void { 
  new DataManager({ url: this.SERVICE_URI, adaptor: new ODataAdaptor() })
  .executeQuery(new Query().take(8)).then((e: ReturnOption) => this.oDataadaptorItems = e.result as object[]).catch((e) => true);
}

public LoadWithResourceName(): void {
  const SERVICE_URI =  'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/';
  // resource name is Orders
  new DataManager({ url: SERVICE_URI, adaptor: new ODataAdaptor()})
  .executeQuery(new Query().from('Orders').take(8)).then((e: ReturnOption) => this.items = e.result as object[]).catch((e) => true);
}

public LoadWithResourceSelect(): void {
  new DataManager({ url: this.SERVICE_URI, adaptor: new ODataAdaptor()})
  .executeQuery(new Query().select(['OrderID', 'CustomerID', 'EmployeeID']).take(8))
  .then((e: ReturnOption) => this.items = e.result as object[]).catch((e) => true);
}

public LoadWithFilter(): void {
  let predicate: Predicate = new Predicate('EmployeeID', 'equal', 3);
  predicate = predicate.or('EmployeeID', 'equal', 2);

  new DataManager({ url: this.SERVICE_URI, adaptor: new ODataAdaptor()})
  .executeQuery(new Query().where(predicate).take(8))
  .then((e: ReturnOption) => this.items = e.result as object[]).catch((e) => true);
}

public LoadWithGrouping(): void {
  new DataManager({ url: this.SERVICE_URI, adaptor: new ODataAdaptor()})
  .executeQuery(new Query().group('CustomerID').take(8))
  .then((e: ReturnOption) => this.items = e.result as object[]).catch((e) => true);
}

public LoadWithSearch(): void {
  new DataManager({ url: this.SERVICE_URI, adaptor: new ODataAdaptor()})
  .executeQuery(new Query().search('VI', ['CustomerID']))
  .then((e: ReturnOption) => this.items = e.result as object[]).catch((e) => true);
}

public LoadWithAgregation(): void {
  let min = 0;
  new DataManager({ url: this.SERVICE_URI, adaptor: new ODataAdaptor()})
  .executeQuery(new Query().take(5).requiresCount().aggregate('min', 'EmployeeID'))
  .then((e: ReturnOption) => { this.items = e.result as object[];  min = (e as any).aggregates['EmployeeID - min']; }).catch((e) => true);
}


initializeData(){
  let dat:any=this.api.getGraphql('Orders');
  console.log('Data 1 Orders :',dat);




  //  let databe= this.api.get('Orders');
  //  console.log('Data 2 Orders :',databe)

  const SERVICE_URI: string =  'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc';
  new DataManager({ url: SERVICE_URI, adaptor: new ODataAdaptor })
  .executeQuery(new Query().from('Products').take(3)).then((e: ReturnOption) => {
      (<Object[]>e.result).forEach((data: Object) => {
         console.log(data)
      });
  });
}



insertItems(){
  const payload ={
    OrderID: "12345",
    CustomerID: "98741",
    EmployeeID:"45697"
  }
  this.api.insert('Orders',payload)
}
updateItems(){
  const payload ={
    OrderID: "12345",
    CustomerID: "98741",
    EmployeeID:"45697"
  }
  this.api.update('Orders','OrderID',payload)
}
deleteItems(){
  const payload ={
    OrderID: "12345"
  }
  this.api.delete('Orders','OrderID',payload)
}

}
