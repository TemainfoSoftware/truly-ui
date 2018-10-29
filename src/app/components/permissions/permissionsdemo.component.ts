/*
  MIT License

  Copyright (c) 2018 Temainfo Software

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
selector : 'app-permissions',
templateUrl : './permissionsdemo.component.html',
styleUrls : [ './permissionsdemo.component.scss' ],
} )
export class PermissionsDemoComponent {

  public dataTableProperties;

  public dataEvents;

  public data = [
    {
      'id': 1,
      'group': 'Agenda',
      'tags': [ 'relatorio', 'financeiro' ],
      'permissions': [
        {
          'key': 'ATENDER_PACIENTE',
          'permission': 'Atender Paciente',
        },
        {
          'key': 'EFETUAR_PACIENTE',
          'permission': 'Efetuar pré consulta',
        }
      ],
    },
    {
      'id': 2,
      'group': 'Cadastro de Paciente',
      'tags': [ 'relatorio', 'financeiro' ],
      'permissions': [
        {
          'key': 'EFETUAR_PRECONSULTA',
          'permission': 'Efetuar pré consulta',
        },
        {
          'key': 'RELATORIO_PACIENTES',
          'permission': 'Relatorio de Pacientes',
        },
        {
          'key': 'RELATORIO_ANIVERSARIANTES',
          'permission': 'Relatorio de Aniversariantes',
        },
        {
          'key': 'RELATORIO_PRONTUARIO',
          'permission': 'Relatorio de Prontuario',
        },
        {
          'key': 'RELATORIO_CONTAS',
          'permission': 'Relatorio de Contas',
        }
      ],
    },
  ];

  public permissions = [
    'ATENDER_PACIENTE',
    'EFETUAR_PACIENTE',
    'RELATORIO_PACIENTES',
    'RELATORIO_ANIVERSARIANTES',
    'RELATORIO_CONTAS'
  ];

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;
  }

  onChangePermissions($event) {
    console.log('Change Permission', $event);
  }
}

