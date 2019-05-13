/*
 MIT License

 Copyright (c) 2019 Temainfo Software

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
import { Component, ChangeDetectorRef, Input, ViewContainerRef } from '@angular/core';

import * as json from './scheduledemo-overview-dataproperties.json';
import * as jsonEvts from './scheduledemo-overview.dataevents.json';
import { SlotSettingsType } from '../../../../../projects/truly-ui/src/components/schedule/types/slot-settings.type';
import { WorkScaleType } from '../../../../../projects/truly-ui/src/components/schedule/types/work-scale.type';
import {ContextMenuService} from '../../../../../projects/truly-ui/src/components/contextmenu/services/contextmenu.service';

@Component( {
  selector : 'app-schedule',
  templateUrl : './scheduledemo-overview.component.html',
  styleUrls : [ './scheduledemo-overview.component.scss' ]
} )
export class ScheduleDemoOverviewComponent {

  public slotSettings: SlotSettingsType = new SlotSettingsType(  2, 40);

  public workScale: WorkScaleType | WorkScaleType[] = [
    new WorkScaleType( '08:00', '12:00', 30 ),
    new WorkScaleType( '13:00', '18:00', 30 )
  ];

  public dataTableProperties;

  public dataEvents;

  public dataSource = [];

  public statusConfig = {};

  public isLoading = true;

 // public data = [];
  public data = [
    {
      value: '1',
      title: 'William Aguera - 1',
      detail: 'Consulta | Particular',
      status: 'missed',
      allday: false,
      date: { start: new Date(new Date().setHours(8, 0)).getTime() , end: new Date( new Date().setHours(8, 30) ).getTime() }
    },
   {
    value: '2',
    title: 'William Aguera - 2',
    detail: 'Consulta | Particular',
    status: 'attended',
    allday: false,
    date: { start: new Date(new Date().setHours(8, 30)).getTime() , end: new Date(new Date().setHours(9, 0 )).getTime() }
  },
    {
      value: '3',
      title: 'William Aguera - 3',
      detail: 'Consulta | Particular',
      allday: false,
      status: 'attended',
      date: { start: new Date(new Date().setHours(9, 0)).getTime() , end: new Date(new Date().setHours(9, 30 )).getTime() }
    },
  {
    value: '4',
    title: 'Jerson Algo - 4',
    detail: 'Consulta | Unimed',
    allday: false,
    status: 'missed',
    date: { start: new Date(new Date().setHours(8, 30)).getTime() , end: new Date(new Date().setHours(9, 30 )).getTime() }
  },
  // {
  //   value: '5',
  //   title: 'Jerson Algo - 5',
  //   detail: 'Consulta | Unimed',
  //   allday: false,
  //   status: 'attended',
  //   date: { start: new Date(new Date().setHours(9, 30)).getTime() , end: new Date(new Date().setHours(10, 0 )).getTime() }
  // },
  // {
  //   value: '6',
  //   title: 'Maicon Aguera - 6',
  //   detail: 'Consulta | Unimed',
  //   allday: false,
  //   status: 'missed',
  //   date: { start: new Date().getTime() , end: new Date().getTime() + 1800000 }
  // },
  //   {
  //     value: '7',
  //     title: 'Adilson Nascimento - 7',
  //     detail: 'Consulta | UNIPREV',
  //     allday: false,
  //     status: 'notmet',
  //     date: { start: new Date().getTime() - 1800000 , end: new Date().getTime() }
  //   },
  // {
  //   value: '8',
  //   title: 'Adilson Nascimento - 8',
  //   detail: 'Consulta | UNIPREV',
  //   allday: false,
  //   status: 'attended',
  //   date: { start: new Date().getTime() - 1800000 , end: new Date().getTime() }
  // },
  // {
  //   value: '9',
  //   title: 'Adilson Nascimento - 9',
  //   detail: 'Consulta | UNIPREV',
  //   allday: false,
  //   status: 'notmet',
  //   date: { start: new Date().getTime() - 1800000 , end: new Date().getTime() }
  // },
  // {
  //   value: '10',
  //   title: 'Edevaldo Nascimento - 10',
  //   detail: 'Consulta | UNIPREV',
  //   allday: false,
  //   status: 'attended',
  //   date: { start: new Date().getTime() - 1800000 , end: new Date().getTime() }
  // },
  // {
  //   value: '11',
  //   title: 'Adilson Nascimento - 11',
  //   detail: 'Consulta | UNIPREV',
  //   allday: false,
  //   status: 'attended',
  //   date: { start: new Date().getTime() , end: new Date().getTime() + 1800000}
  // },
  // {
  //   value: '12',
  //   title: 'Jaisson Buccio - 12',
  //   detail: 'Consulta | Copel',
  //   allday: false,
  //   status: 'attended',
  //   date: { start: new Date().getTime() , end: new Date().getTime() + 1800000 }
  // },
  // {
  //   value: '13',
  //   title: 'Jaisson Buccio - 13',
  //   detail: 'Consulta | Copel',
  //   allday: false,
  //   status: 'notmet',
  //   date: { start: new Date().getTime() + 1800000 , end: new Date().getTime() + 5400000 }
  // },
  // {
  //   value: '14',
  //   title: 'Jaisson Buccio - 14',
  //   detail: 'Consulta | Copel',
  //   allday: false,
  //   status: 'notmet',
  //   date: { start: new Date().getTime() + 1800000 , end: new Date().getTime() + 3600000 }
  // },
  // {
  //   value: '15',
  //   title: 'Jaisson Buccio - 15',
  //   detail: 'Consulta | Copel',
  //   allday: false,
  //   status: 'notmet',
  //   date: { start: new Date().getTime() + 1800000 , end: new Date().getTime() + 3600000 }
  // },
  // {
  //   value: '16',
  //   title: 'Jaisson Buccio - 16',
  //   detail: 'Consulta | Copel',
  //   allday: false,
  //   status: 'attended',
  //   date: { start: new Date().getTime() + 1800000 , end: new Date().getTime() + 3600000 }
  // },
  // {
  //   value: '17',
  //   title: 'Jaisson Buccio - 17',
  //   detail: 'Consulta | Copel',
  //   allday: false,
  //   status: 'attended',
  //   date: { start: new Date().getTime() + 1800000 , end: new Date().getTime() + 3600000 }
  // },
  // {
  //   value: '18',
  //   title: 'Jaisson Buccio - 18',
  //   detail: 'Consulta | Copel',
  //   allday: false,
  //   status: 'attended',
  //   date: { start: new Date(new Date().setHours(13, 30)).getTime() , end: new Date(new Date().setHours(14, 0 )).getTime() }
  // },
  // {
  //   value: '19',
  //   title: 'Jaisson Buccio - 19',
  //   detail: 'Consulta | Copel',
  //   allday: false,
  //   status: 'notmet',
  //   date: { start: new Date(new Date().setHours(13, 30)).getTime() , end: new Date(new Date().setHours(14, 0)).getTime() }
  // },
  //   {
  //     value: '20',
  //     title: 'Jaisson Buccio - 20',
  //     detail: 'Consulta | Copel',
  //     allday: false,
  //     status: 'attended',
  //     date: { start: new Date(new Date().setHours(14, 0)).getTime() , end: new Date(new Date().setHours(14, 30 )).getTime() }
  //   },
  //   {
  //     value: '21',
  //     title: 'Jaisson Buccio - 21',
  //     detail: 'Consulta | Copel',
  //     allday: false,
  //     status: 'notmet',
  //     date: { start: new Date(new Date().setHours(14, 0)).getTime() , end: new Date(new Date().setHours(14, 30)).getTime() }
  //   },
  //   {
  //     value: '22',
  //     title: 'Jaisson Buccio - 22',
  //     detail: 'Consulta | Copel',
  //     allday: false,
  //     status: 'notmet',
  //     date: { start: new Date(new Date().setHours(14, 30)).getTime() , end: new Date(new Date().setHours(15, 0)).getTime() }
  //   }
  ];

  constructor(
    private change: ChangeDetectorRef,
    private contextmenuService: ContextMenuService,
    private container: ViewContainerRef
  ) {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;
    this.isLoading = true;
    setTimeout(() => {

      this.getWorkScale().then(( workScale: WorkScaleType | WorkScaleType[] ) => {
        this.workScale = workScale;
      });

      this.getStatusConfig().then((  statusConfig ) => {
        this.statusConfig = statusConfig;
      });

      this.getDataSource()
        .then((data: Array<any>) => {
          this.isLoading = false;
          this.dataSource = data;
          this.change.detectChanges();
        });
    }, 3000);
  }

  getStatusConfig() {
    return new Promise((resolve) => {
      resolve( {
        attended : { status : 'attended', color : '#90ED5D', description : 'Attended' },
        missed: { status : 'missed', color : '#FF385C', description : 'Missed' },
        notmet: { status : 'notmet', color : '#1d8bff', description : 'Not Met' }
      } );
    });
  }


  getWorkScale() {
    return new Promise((resolve) => {
      resolve( [
        new WorkScaleType( '08:00', '12:00', 30 ),
        new WorkScaleType( '13:00', '18:00', 30 )
      ] );
    });
  }

  getDataSource() {
    return new Promise((resolve) => {
      resolve(this.data);
    });
  }

  onNewEventClick( event ) {
    const id = Math.floor((Math.random() * 100) + 1).toString(10);
    this.dataSource = [...this.dataSource, {
      value: id,
      title: 'William Aguera - ' + id,
      detail: 'Consulta | Particular',
      status: 'missed',
      allday: false,
      date: {
        start: new Date(new Date().setHours(14, 30)).getTime() ,
        end: new Date( new Date().setHours(15, 0) ).getTime()
      }
    }];

    console.log( 'NEW DATA: ', this.dataSource);
  }

  onChangeDate( event  ) {
    console.log('EVENT CHANGE DATE: ', event);
  }

  onEventContextmenu( event ) {
    this.contextmenuService.create( event.event, event.element, [
      { label: `Desmarcar agendamento do Paciente ${ event.data.title }`, icon: '', callback: console.log.bind(this, event.data) },
      { label: 'Enviar Lembrete', icon: '',
        children: [
          { label: 'Via WhatsApp', icon: 'ion ion-logo-whatsapp', callback: console.log.bind(this, event.data)  },
          { label: 'Via Email', icon: '',  },
          { label: 'Via SMS', icon: '', callback: console.log.bind(this, event.data)  }
        ]
      },
    ]);
  }

  onEventDbClick( event ) {
    console.log('EVENT CLICK: ', event);
  }

  onRowClick( event ) {
    console.log('ROW DBCLICK: ', event );
    console.log('ROW DBCLICK START TIME: ', new Date(event.start));
    console.log('ROW DBCLICK END TIME: ', new Date(event.end));
  }


}

