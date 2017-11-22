import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: HomeComponent},
      {
        path: 'home', component: HomeComponent},
      {
        path: 'gettingstarted',
        component: GettingStartedComponent},
      {
        path: 'input',
        loadChildren: './components/input/inputdemo.module#InputDemoModule'
      },
      {
        path: 'inputmask',
        loadChildren: './components/inputmask/inputmaskdemo.module#InputMaskDemoModule'
      },
      {
        path: 'button',
        loadChildren: './components/button/buttondemo.module#ButtonDemoModule'
      },
      {
        path: 'splitbutton',
        loadChildren: './components/splitbutton/splitbuttondemo.module#SplitButtonDemoModule'
      },
      {
        path: 'buttongroup',
        loadChildren: './components/buttongroup/buttongroupdemo.module#ButtonGroupDemoModule'
      },
      {
        path: 'dropdownlist',
        loadChildren: './components/dropdownlist/dropdownlistdemo.module#DropDownListDemoModule'
      },
      {
        path: 'autocomplete',
        loadChildren: './components/autocomplete/autocompletedemo.module#AutoCompleteDemoModule'
      },
      {
        path: 'modal',
        loadChildren: './components/modal/modaldemo.module#ModalDemoModule'
      },
      {
        path: 'radiobutton',
        loadChildren: './components/radiobutton/radiobuttondemo.module#RadioButtonDemoModule'
      },
      {
        path: 'form',
        loadChildren: './components/form/formdemo.module#FormDemoModule'
      },
      {
        path: 'dialog',
        loadChildren: './components/dialog/dialogdemo.module#DialogDemoModule'
      },
      {
        path: 'tooltip',
        loadChildren: './components/tooltip/tooltipdemo.module#TooltipDemoModule'
      },
      {
        path: 'datatable',
        loadChildren: './components/datatable/overview/datatabledemo-overview.module#DatatableDemoOverviewModule'
      },
      {
        path: 'datatable/tablemodes',
        loadChildren: './components/datatable/tablemodes/datatable-tablemodes.demo.module#DatatableTableModesDemoModule'
      },
      {
        path: 'datatable/rowmodels',
        loadChildren: './components/datatable/rowmodels/datatable-rowmodels.demo.module#DatatableRowModelsDemoModule'
      },
      {
        path: 'datatable/columnfeatures',
        loadChildren: './components/datatable/columnfeatures/datatable-columnfeatures.demo.module#DatatableColumnFeaturesDemoModule'
      },
      {
        path: 'datatable/filtering',
        loadChildren: './components/datatable/filtering/datatable-filtering.demo.module#DatatableFilteringDemoModule'
      },
      {
        path: 'checkbox',
        loadChildren: './components/checkbox/checkboxdemo.module#CheckBoxDemoModule'
      },
      {
        path: 'listbox',
        loadChildren: './components/listbox/listboxdemo.module#ListBoxDemoModule'
      },
      {
        path: 'panelgroup',
        loadChildren: './components/panel/paneldemo.module#PanelDemoModule'
      },
      {
        path: 'chatlist',
        loadChildren: './components/chatlist/chatlistdemo.module#ChatListDemoModule'
      },
      {
        path: 'multiselect',
        loadChildren: './components/multiselect/multiselectdemo.module#MultiSelectDemoModule'
      },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
