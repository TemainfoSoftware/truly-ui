import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { TlMessageValidationComponent } from '../input/components/messagevalidation/messagevalidation.component';
import { TlMessageValidationDirective } from './message-validation.directive';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    PortalModule
  ],
  declarations: [
    TlMessageValidationDirective
  ],
  exports: [
    TlMessageValidationDirective
  ],
  entryComponents: [ TlMessageValidationComponent ]
} )
export class MessageValidationModule {
}
