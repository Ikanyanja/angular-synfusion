import { Injectable } from '@angular/core';
import { DataManager, Query, ReturnOption, ODataAdaptor, GraphQLAdaptor, WebApiAdaptor } from '@syncfusion/ej2-data';
@Injectable({
  providedIn: 'root'
})
export class ApolloService {
  baseUrl:string | undefined;
  // baseUrl:string = AppConfigService.settings?.apiUrl?.url ?? '';
  public dm?: DataManager;
  constructor() {
    this.baseUrl= 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc';
  }

  async getGraphql(endpoint: string) {
    await new DataManager({ url: `${this.baseUrl}` , adaptor: new ODataAdaptor })
      .executeQuery(new Query().from(endpoint)).then((e: ReturnOption) => {
        console.log('Result log :',e.result);
        return  e.result;
        // (<Object[]>e.result).forEach((data: Object) => {
        //   console.log('Data log',data); 
        // });
      });
  }  

  get(endpoint: string) {    
    let items: any;
    // Add the Syncfusion DataManager GrpahQLAdaptor for fetching data from GraphQL server
    return new DataManager({ url: `${this.baseUrl}/${endpoint}` , adaptor: new ODataAdaptor() })
      .executeQuery(new Query()).then((e: ReturnOption) => 
      items = e.result as object[]
      ).catch((e) => true);
  }


  insert(endpoint: string ,insertItem :any) {
    //Mutation with insert    
    new DataManager({ url: `${this.baseUrl}/${endpoint}` , adaptor: new ODataAdaptor() }).insert(insertItem);
  }
  update(endpoint: string ,pkey:any,delItem :any) {
    //Mutation with update
    new DataManager({ url: `${this.baseUrl}/${endpoint}` , adaptor: new ODataAdaptor() }).update(pkey, delItem);
  }
  delete(endpoint: string ,pkey:any,delItem :any) {   
    //Mutation with delete
    new DataManager({ url: `${this.baseUrl}/${endpoint}` , adaptor: new ODataAdaptor() }).remove(pkey, delItem);
  }
}
