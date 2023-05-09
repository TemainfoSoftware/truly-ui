import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class User {
  name: string;
  lastName: string;
  birthday: string;
  active: boolean;
}

@Component({
  selector: 'app-form-inlinedemo',
  templateUrl: './form-inlinedemo.component.html',
  styleUrls: ['./form-inlinedemo.component.scss']
})
export class FormInlinedemoComponent implements OnInit {

  public reactive = 'HTML';

  public driven = 'HTML';

  public dataMock = {
    name: 'David',
    lastName: 'Spencer',
    birthday: '22.05.189',
    active: true
  };

  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthday: new FormControl(''),
    active: new FormControl(false)
  });

  public user = new User();

  constructor() { }

  ngOnInit() {
  }

  onSubmit($event) {
    console.log($event);
  }

}
