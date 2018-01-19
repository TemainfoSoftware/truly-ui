import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NavigatorDemoModule } from './components/navigator/navigatordemo.module';
import { HomeComponent } from './home/home.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      // Showcase
      {
        path: '', component: HomeComponent
      },
      {
        path: 'gettingstarted',
        component: GettingStartedComponent
      },
      {
        path: 'home', component: HomeComponent
      },
      // Components
      {
        path: 'autocomplete',
        loadChildren: './components/autocomplete/autocompletedemo.module#AutoCompleteDemoModule'
      },
      {
        path: 'button',
        loadChildren: './components/button/buttondemo.module#ButtonDemoModule'
      },
      {
        path: 'buttongroup',
        loadChildren: './components/buttongroup/buttongroupdemo.module#ButtonGroupDemoModule'
      },
      {
        path: 'calendar',
        loadChildren: './components/calendar/calendardemo.module#CalendarDemoModule'
      },
      {
        path: 'chatlist',
        loadChildren: './components/chatlist/chatlistdemo.module#ChatListDemoModule'
      },
      {
        path: 'checkbox',
        loadChildren: './components/checkbox/checkboxdemo.module#CheckBoxDemoModule'
      },
      {
        path: 'datatable',
        loadChildren: './components/datatable/overview/datatabledemo-overview.module#DatatableDemoOverviewModule'
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
        path: 'datatable/rowmodels',
        loadChildren: './components/datatable/rowmodels/datatable-rowmodels.demo.module#DatatableRowModelsDemoModule'
      },
      {
        path: 'datatable/tablemodes',
        loadChildren: './components/datatable/tablemodes/datatable-tablemodes.demo.module#DatatableTableModesDemoModule'
      },
      {
        path: 'dialog',
        loadChildren: './components/dialog/dialogdemo.module#DialogDemoModule'
      },
      {
        path: 'dropdownlist',
        loadChildren: './components/dropdownlist/dropdownlistdemo.module#DropDownListDemoModule'
      },
      {
        path: 'form',
        loadChildren: './components/form/formdemo.module#FormDemoModule'
      },
      {
        path: 'input',
        loadChildren: './components/input/inputdemo.module#InputDemoModule'
      },
      {
        path: 'inputvalidators',
        loadChildren: './components/inputvalidators/inputvalidatorsdemo.module#InputValidatorsDemoModule'
      },
      {
        path: 'inputmask',
        loadChildren: './components/inputmask/inputmaskdemo.module#InputMaskDemoModule'
      },
      {
        path: 'listbox',
        loadChildren: './components/listbox/listboxdemo.module#ListBoxDemoModule'
      },
      {
        path: 'modal',
        loadChildren: './components/modal/modaldemo.module#ModalDemoModule'
      },
      {
        path: 'multiselect',
        loadChildren: './components/multiselect/multiselectdemo.module#MultiSelectDemoModule'
      },
      {
        path: 'navigator',
        loadChildren: './components/navigator/navigatordemo.module#NavigatorDemoModule'
      },
      {
        path: 'panelgroup',
        loadChildren: './components/panel/paneldemo.module#PanelDemoModule'
      },
      {
        path: 'radiobutton',
        loadChildren: './components/radiobutton/radiobuttondemo.module#RadioButtonDemoModule'
      },
      {
        path: 'shortcut',
        loadChildren: './components/shortcut/shortcutdemo.module#ShortcutDemoModule'
      },
      {
        path: 'splitbutton',
        loadChildren: './components/splitbutton/splitbuttondemo.module#SplitButtonDemoModule'
      },
      {
        path: 'tabcontrol',
        loadChildren: './components/tabcontrol/tabcontroldemo.module#TabControlDemoModule'
      },
      {
        path: 'tooltip',
        loadChildren: './components/tooltip/tooltipdemo.module#TooltipDemoModule'
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
