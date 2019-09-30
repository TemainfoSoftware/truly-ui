import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlStep } from './step';
import {TlStepForm} from './parts/step-form/step-form';
import {StepNextDirective} from './directives/step-next.directive';
import {StepPreviousDirective} from './directives/step-previous.directive';
import {StepFinishDirective} from './directives/step-finish.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TlStep,
    TlStepForm,
    StepNextDirective,
    StepPreviousDirective,
    StepFinishDirective
  ],
  exports: [
    TlStep,
    TlStepForm,
    StepNextDirective,
    StepPreviousDirective,
    StepFinishDirective
  ]
})
export class StepModule {}
