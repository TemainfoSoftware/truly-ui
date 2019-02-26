import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'truly-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public form: FormGroup;

  constructor( private fb: FormBuilder, private toasterService: ToasterService ) { }

  ngOnInit() {
    this.form = this.fb.group({
      user: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
  	this.toasterService.success({
		title: 'Success',
        message: 'Successfully registered!',
        position: 'top-right',
        width: '400px',
        height: '70px',
        progress: false,
        showIcon: true,
        time: 3000,
  	});
  }

}
