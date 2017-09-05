import { ChangeDetectionStrategy, Component } from '@angular/core';

import * as json from './datatabledemo-dataproperties.json';

import * as jsonEvents from './datatabledemo-dataevents.json';

@Component( {
  selector: 'app-datatable',
  templateUrl: './datatabledemo.component.html',
  styleUrls: [ './datatabledemo.component.scss' ]
} )
export class DataTableDemo {

  public data: Array<any>;

  public dataLazy: any;

  public rowSelected: any;

  private take = 200;

  private dataTableProperties;

  private dataTableEvents;

  private timeout ;

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataTableEvents = jsonEvents.dataProperties;

    this.data = this.createRandomData(1000000);

    this.dataLazy = {
      "data" : this.getDataFromService(0,this.take),
      "total" : this.data.length
    }
  }

  getDataFromService(skip, take) {

      return this.data.slice(skip, take);

  }

  onLazyLoad(event){
    clearTimeout(this.timeout );
    this.timeout = setTimeout(()=>{
      this.dataLazy = {
          "data" : this.getDataFromService(event.skip,event.take),
          "total" : this.data.length
        };
    },2000)
  }

  onPageChange(event){
   // console.log(event);
  }

  onRowSelect( row ) {
    this.rowSelected = row;
  }

  private createRandomData(count: number) {
    const firstNames = ["Adilson", "William", "Silvio", "Maicon", "Jaisson", "Moacyr", "Marcio", "Laura", "Anne", "Nige"],
      lastNames = ["Davolio", "Fuller", "Leverling", "Peacock", "Buchanan", "Suyama", "King", "Callahan", "Dodsworth", "White"],
      cities = ["Seattle", "Tacoma", "Kirkland", "Redmond", "London", "Philadelphia", "New York", "Seattle", "London", "Boston"],
      titles = ["Accountant", "Vice President, Sales", "Sales Representative", "Technical Support", "Sales Manager", "Web Designer",
        "Software Developer"];

    return Array(count).fill({}).map((_, idx) => ({
        id: idx + 1,
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        title: titles[Math.floor(Math.random() * titles.length)]
      })
    );
  }

}
