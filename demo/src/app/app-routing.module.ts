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
      {path: 'autocomplete', loadChildren: './components/autocomplete/autocompletedemo.module#AutoCompleteDemoModule'},
      {path: 'modal', loadChildren: './components/modal/modaldemo.module#ModalDemoModule'},
      {path: 'radiobutton', loadChildren: './components/radiobutton/radiobuttondemo.module#RadioButtonDemoModule'},
      {path: 'form', loadChildren: './components/form/formdemo.module#FormDemoModule'},
      {path: 'dialog', loadChildren: './components/dialog/dialogdemo.module#DialogDemoModule'},
      {path: 'tooltip', loadChildren: './components/tooltip/tooltipdemo.module#TooltipDemoModule'},
      {path: 'datatable', loadChildren: './components/datatable/datatabledemo.module#DatatableDemoModule'},
      {path: 'datatable/lazy', loadChildren: './components/datatable/lazy/datatablelazydemo.module#DatatableLazyDemoModule'},
      {path: 'datatable/scrollable', loadChildren: './components/datatable/scrollable/datatablescrollabledemo.module#DatatableScrollableDemoModule'},
      {path: 'checkbox', loadChildren: './components/checkbox/checkboxdemo.module#CheckBoxDemoModule'},
      {path: 'listbox', loadChildren: './components/listbox/listboxdemo.module#ListBoxDemoModule'},
      {path: 'panelgroup', loadChildren: './components/panel/paneldemo.module#PanelDemoModule'},
      {path: 'chatlist', loadChildren: './components/chatlist/chatlistdemo.module#ChatListDemoModule'},
      {path: 'multiselect', loadChildren: './components/multiselect/multiselectdemo.module#MultiSelectDemoModule'},
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
