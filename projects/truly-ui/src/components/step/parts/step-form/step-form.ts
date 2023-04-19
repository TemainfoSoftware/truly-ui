import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {StepService} from '../../services/step.service';
import {Subscription} from 'rxjs';

let index = 0;

@Component({
  selector: 'tl-step-form',
  templateUrl: './step-form.html',
  styleUrls: ['./step-form.scss']
})
export class TlStepForm implements OnInit, OnDestroy {

  @Input() form: UntypedFormGroup;

  @Input() validateForm = true;

  @Input() label = `step${index++}`;

  @Input() templateIcon = null;

  public selected = false;

  private subscription = new Subscription();

  constructor( private stepService: StepService ) { }

  ngOnInit() {
    this.changes();
    this.statusChanges();
  }

  changes() {
    this.subscription.add(this.stepService.onChange.subscribe(() => {
      this.stepService.formStatusChange( this.form.status !== 'INVALID' );
    }));
  }

  statusChanges() {
    this.subscription.add(this.form.statusChanges.subscribe(( status: string ) => {
      this.stepService.formStatusChange( status !== 'INVALID' );
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
