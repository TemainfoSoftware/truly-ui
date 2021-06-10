import { Component } from '@angular/core';

import { slideToLeft } from '../../shared/animations/router.animations';
import {ContextMenuService} from '../../../../projects/truly-ui/src/components/contextmenu/services/contextmenu.service';

@Component( {
  selector: 'app-contextmenu',
  templateUrl: './context-menudemo.component.html',
  animations: [ slideToLeft() ],
  styleUrls: [ './context-menudemo.component.scss' ]
} )
export class ContextMenuDemoComponent {

  public itemsContext = [];

  public itemsContext2 = [];

  public itemsContextGlobal = [];

  public items = Array.from({ length: 5}).map((value, index) => `Item ${index}`);

  constructor( private contextMenuService: ContextMenuService) {
  }

  open($event, element, context) {
    this.contextMenuService.create($event, element, [
      { label: 'Remove Item', callback: (event) => console.log(`remove item ${event}`) },
      { label: 'View Item', callback: (event) => console.log(`view item ${event}`) },
      { label: 'Sub Menu Context', children: [
          { label: 'Sub Item 1', callback: (event) => console.log(`view item ${event}`) },
          { label: 'Sub Item 2', callback: (event) => console.log(`view item ${event}`) },
          { label: 'Sub Item 3', callback: (event) => console.log(`view item ${event}`) },
          { label: 'Sub Item 4', callback: (event) => console.log(`view item ${event}`) },
          { label: 'Sub Item 5', callback: (event) => console.log(`view item ${event}`) },
          { label: 'Sub Item 6', callback: (event) => console.log(`view item ${event}`) },
          { label: 'Sub Item 7', callback: (event) => console.log(`view item ${event}`) },
          { label: 'Sub Item 8', callback: (event) => console.log(`view item ${event}`) }
      ]},
      { label: 'Open Item', callback: (event) => console.log(`open item ${event}`) }
    ], context);
  }


}
