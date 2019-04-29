import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { TlMessageValidationComponent } from './messagevalidation.component';
import { TlMessageValidationDirective } from './directives/message-validation.directive';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    PortalModule
  ],
  declarations: [
    TlMessageValidationComponent,
    TlMessageValidationDirective
  ],
  exports: [
    TlMessageValidationComponent,
    TlMessageValidationDirective
  ],
  entryComponents: [ TlMessageValidationComponent ]
} )
export class MessageValidationModule {
}
