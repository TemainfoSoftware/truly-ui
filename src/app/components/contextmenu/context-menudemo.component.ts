import { Component } from '@angular/core';

import * as json from './context-menudemo-dataproperties.json';
import * as jsonEvts from './context-menudemo-events.json';
import { slideToLeft } from '../../shared/animations/router.animations';

@Component( {
  selector: 'app-contextmenu',
  templateUrl: './context-menudemo.component.html',
  animations: [ slideToLeft() ],
  styleUrls: [ './context-menudemo.component.scss' ]
} )
export class ContextMenuDemoComponent {
  public dataTableProperties;

  public dataEvents;

  public itemsContext = [];

  public itemsContext2 = [];

  public itemsContextGlobal = [];

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;


    this.itemsContext = [
      {
        label: 'The Target 1 Context Menu Item 1',
        icon: '',
        callBack: this.functionContext
      },
      {
        label: 'The Target 1 Context Menu Item 2',
        icon: '',
      },
      {
        label: 'The Target 1 Context Menu Item 3',
        icon: '',
      },
      {
        label: 'The Target 1 Context Menu Item 4',
        icon: '',
      },
      {
        label: 'The Target 1 Context Menu Item 5',
        icon: '',
      },
    ];

    this.itemsContext2 = [
      {
        label: 'The Target 2 Context Menu Item 1',
        icon: '',
        callBack: this.functionContext2
      },
      {
        label: 'The Target 2 Context Menu Item 2',
        icon: '',
        subMenu: [
          {
            label: 'The Target 2 Context Menu Item 3',
            icon: ''
          },
          {
            label: 'The Target 2 Context Menu Item 4',
            icon: ''
          },
          {
            label: 'The Target 2 Context Menu Item 5',
            icon: ''
          }
        ]
      },
    ];

    this.itemsContextGlobal = [
      {
        label: 'The Global Context Menu Item 1',
        icon: 'ion-ios-world',
        callBack: this.functionContextGlobal
      },
      {
        label: 'The Global Context Menu Item 2',
        icon: 'ion-world',
      },
      {
        label: 'The Global Context Menu Item 3',
        icon: 'ion-planet',
        subMenu: [
          {
            label: 'The Global Context Menu Item 4',
            icon: ''
          },
          {
            label: 'The Global Context Menu Item 5',
            icon: ''
          },
          {
            label: 'The Global Context Menu Item 6',
            icon: '',
            subMenu: [
              {
                label: 'The Global Context Menu Item 7',
                icon: ''
              },
              {
                label: 'The Global Context Menu Item 8',
                icon: ''
              },
              {
                label: 'The Global Context Menu Item 9',
                icon: ''
              },
              {
                label: 'The Global Context Menu Item 10',
                icon: ''
              }
            ]
          }
        ]
      }
    ];
  }

  functionContext($event) {
    console.log('Context 1', $event);
    alert('Menu 1 - Context 1');
  }

  functionContext2($event) {
    console.log('Context 2', $event);
    alert('Menu 1 - Context 2');
  }

  functionContextGlobal($event) {
    console.log('Context Global', $event);
    alert('Menu 1 - Context Global');
  }


}
