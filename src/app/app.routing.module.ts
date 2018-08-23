import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
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
      {
        path: 'i18n',
        loadChildren: './internationalization/internationalization.module#InternationalizationModule'
      },
      {
        path: 'theming',
        loadChildren: './theming/theming.module#ThemingModule'
      },
      // Components
      {
        path: 'accordion',
        loadChildren: './components/accordion/accordiondemo.module#AccordionDemoModule'
      },
      {
        path: 'autocomplete',
        loadChildren: './components/autocomplete/autocompletedemo.module#AutoCompleteDemoModule'
      },
      {
        path: 'badge',
        loadChildren: './components/badge/badgedemo.module#BadgeDemoModule'
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
        path: 'blockui',
        loadChildren: './components/blockui/blockuidemo.module#BlockUIDemoModule'
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
        path: 'contextmenu',
        loadChildren: './components/contextmenu/context-menudemo.module#ContextMenuDemoModule'
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
        path: 'dropdownicon',
        loadChildren: './components/dropdownicon/dropdownicondemo.module#DropDownIconDemoModule'
      },
      {
        path: 'datepicker',
        loadChildren: './components/datepicker/datepickerdemo.module#DatePickerDemoModule'
      },
      {
        path: 'editor',
        loadChildren: './components/editor/editordemo.module#EditorDemoModule'
      },
      {
        path: 'form',
        loadChildren: './components/form/formdemo.module#FormDemoModule'
      },
      {
        path: 'inlineform',
        loadChildren: './components/form/inline/form-inlinedemo.module#FormInlineDemoModule'
      },
      {
        path: 'modalform',
        loadChildren: './components/form/modal/form-modaldemo.module#FormModalDemoModule'
      },
      {
        path: 'smartform',
        loadChildren: './components/form/smart/form-smartdemo.module#FormSmartDemoModule'
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
        path: 'menu',
        loadChildren: './components/menu/menudemo.module#MenuDemoModule'
      },
      {
        path: 'multiview',
        loadChildren: './components/multiview/multiviewdemo.module#MultiViewDemoModule'
      },
      {
        path: 'overlaypanel',
        loadChildren: './components/overlaypanel/overlay-paneldemo.module#OverlayPanelDemoModule'
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
        path: 'progressbar',
        loadChildren: './components/progressbar/progressbardemo.module#ProgressBarDemoModule'
      },
      {
        path: 'popupmenu',
        loadChildren: './components/popupmenu/popupmenudemo.module#PopupMenuDemoModule'
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
        path: 'schedule',
        loadChildren: './components/schedule/overview/scheduledemo-overview.module#ScheduledemoOverviewModule'
      },
      {
        path: 'sidebar',
        loadChildren: './components/sidebar/sidebardemo.module#SidebarDemoModule'
      },
      {
        path: 'splitbutton',
        loadChildren: './components/splitbutton/splitbuttondemo.module#SplitButtonDemoModule'
      },
      {
        path: 'switch',
        loadChildren: './components/switch/switchdemo.module#SwitchDemoModule'
      },
      {
        path: 'timepicker',
        loadChildren: './components/timepicker/timepickerdemo.module#TimePickerDemoModule'
      },
      {
        path: 'tabcontrol',
        loadChildren: './components/tabcontrol/tabcontroldemo.module#TabControlDemoModule'
      },
      {
        path: 'toaster',
        loadChildren: './components/toaster/toasterdemo.module#ToasterDemoModule'
      },
      {
        path: 'toolbar',
        loadChildren: './components/toolbar/toolbardemo.module#ToolbarDemoModule'
      },
      {
        path: 'tooltip',
        loadChildren: './components/tooltip/tooltipdemo.module#TooltipDemoModule'
      },
      {
        path: 'overlaypanel',
        loadChildren: './components/overlaypanel/overlay-paneldemo.module#OverlayPanelDemoModule'
      },
      {
        path: 'popupmenu',
        loadChildren: './components/popupmenu/popupmenudemo.module#PopupMenuDemoModule'
      },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
