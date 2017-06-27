import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from "app/home/home.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'input', loadChildren: './components/input/inputdemo.module#InputDemoModule'},
      {path: 'inputmask', loadChildren: './components/inputmask/inputmaskdemo.module#InputMaskDemoModule'},
      {path: 'button', loadChildren: './components/button/buttondemo.module#ButtonDemoModule'},
      {path: 'modal', loadChildren: './components/modal/modaldemo.module#ModalDemoModule'},
      {path: 'tooltip', loadChildren: './components/tooltip/tooltipdemo.module#TooltipDemoModule'}
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
