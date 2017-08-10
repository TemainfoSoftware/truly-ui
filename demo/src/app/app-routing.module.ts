import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from "app/home/home.component";
import { GettingStarted } from "./getting-started/getting-started.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'home', component: HomeComponent},
      {path: 'gettingstarted', component: GettingStarted},
      {path: 'input', loadChildren: './components/input/inputdemo.module#InputDemoModule'},
      {path: 'inputmask', loadChildren: './components/inputmask/inputmaskdemo.module#InputMaskDemoModule'},
      {path: 'button', loadChildren: './components/button/buttondemo.module#ButtonDemoModule'},
      {path: 'splitbutton', loadChildren: './components/splitbutton/splitbuttondemo.module#SplitButtonDemoModule'},
      {path: 'buttongroup', loadChildren: './components/buttongroup/buttongroupdemo.module#ButtonGroupDemoModule'},
      {path: 'dropdownlist', loadChildren: './components/dropdownlist/dropdownlistdemo.module#DropDownListDemoModule'},
      {path: 'modal', loadChildren: './components/modal/modaldemo.module#ModalDemoModule'},
      {path: 'form', loadChildren: './components/form/formdemo.module#FormDemoModule'},
      {path: 'dialog', loadChildren: './components/dialog/dialogdemo.module#DialogDemoModule'},
      {path: 'tooltip', loadChildren: './components/tooltip/tooltipdemo.module#TooltipDemoModule'},
      {path: 'datatable', loadChildren: './components/datatable/datatabledemo.module#DatatableDemoModule'}
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
