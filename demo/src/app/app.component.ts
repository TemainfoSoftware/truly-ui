import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  private source: any[] = [];

  ngOnInit() {
    this.source = [
      {
        'source': {
          'nome': 'Maicon Wagner',
          'profissao': 'Programador',
          'sexo': 'M',
          'idade': 25,
          'email': 'maiconwagner@hotmail.com'
        },
        'effect': {'icon': 'ion-gear-b', 'color': '#F9D362'}
      },
      {
        'source': {
          'nome': 'William Aguera',
          'profissao': 'Programador',
          'sexo': 'M',
          'idade': 22,
          'email': 'williamaguera.m@hotmail.com'
        },
        'effect': {'icon': 'ion-flash', 'color': '#F9D362'}
      },
      {
        'source': {
          'nome': 'Adilson Nascimento',
          'profissao': 'Programador',
          'sexo': 'M',
          'idade': 22,
          'email': 'adilsonnasc@hotmail.com'
        },
        'effect': {'icon': 'ion-lock-combination', 'color': '#0A85B2'}
      },
      {
        'source': {
          'nome': 'Silvio Fleming',
          'profissao': 'Programador',
          'sexo': 'M',
          'idade': 30,
          'email': 'silvio@gmail.com'
        },
        'effect': {'icon': 'ion-hammer', 'color': '#0A85B2'}
      },
      {
        'source': {
          'nome': 'Adimar da Silva',
          'profissao': 'Carpinteiro',
          'sexo': 'M',
          'idade': 30,
          'email': 'silvio@gmail.com'
        },
        'effect': {'icon': 'ion-hammer', 'color': '#FF1B4D'}
      },
      {
        'source': {
          'nome': 'Silveira da Cunha',
          'profissao': 'Servente de Obras',
          'sexo': 'M',
          'idade': 30,
          'email': 'silveira@gmail.com'
        },
        'effect': {'icon': 'ion-hammer', 'color': '#FF1B4D'}
      },
      {
        'source': {
          'nome': 'William Bonner',
          'profissao': 'Jornalista',
          'sexo': 'M',
          'idade': 30,
          'email': 'williambonner@gmail.com'
        },
        'effect': {'icon': 'ion-hammer', 'color': '#FF1B4D'}
      },
    ];
  }
}
