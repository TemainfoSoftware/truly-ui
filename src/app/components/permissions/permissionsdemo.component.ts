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
import { Component } from '@angular/core';

import * as json from './permissionsdemo-dataproperties.json';
import * as jsonEvts from './permissionsdemo.dataevents.json';

@Component( {
  selector: 'app-permissions',
  templateUrl: './permissionsdemo.component.html',
  styleUrls: [ './permissionsdemo.component.scss' ],
} )
export class PermissionsDemoComponent {

  public dataTableProperties;

  public dataEvents;

  public data: any = [];

  public permissions = [
    { 'permission': 'PATIENT_REPORT', 'description': 'Patient Report' },
    { 'permission': 'REPORT_RECORD', 'description': 'Report of Record' },
    { 'permission': 'MAKE_INQUIRY', 'description': 'Make an Inquiry' },
  ];

  constructor() {
    setTimeout(() => {
      this.data = [
        {
        'description': 'Agenda',
        'permissions': [
          {
            'permission': 'ATTEND_THE_PATIENT',
            'description': 'Attend the Patient',
          },
          {
            'permission': 'MAKE_INQUIRY',
            'description': 'Make an Inquiry',
          }
        ],
      },
        {
          'description': 'Patient Registration',
          'permissions': [
            {
              'permission': 'PATIENT_REPORT',
              'description': 'Patient Report',
            },
            {
              'permission': 'ANNIVERSARY_REPORT',
              'description': 'Anniversary Report',
            },
            {
              'permission': 'REPORT_RECORD',
              'description': 'Report of Record',
            },
            {
              'permission': 'FINANCIAL_REPORT',
              'description': 'Financial Report',
            }
          ],
        },
      ];
    }, 5000);

    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;
  }

  onChangePermissions( $event ) {
    console.log( 'Change Permission', $event );
  }
}

