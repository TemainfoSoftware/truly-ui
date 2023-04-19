import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {HomeComponent} from './home/home.component';
import {GettingStartedComponent} from './getting-started/getting-started.component';


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
        loadChildren: () => import('./internationalization/internationalization.module').then(m => m.InternationalizationModule)
    },
    {
        path: 'theming',
        loadChildren: () => import('./theming/theming.module').then(m => m.ThemingModule)
    },
    // Components
    {
        path: 'accordion',
        loadChildren: () => import('./components/accordion/accordiondemo.module').then(m => m.AccordionDemoModule)
    },
    {
        path: 'autocomplete',
        loadChildren: () => import('./components/autocomplete/autocompletedemo.module').then(m => m.AutoCompleteDemoModule)
    },
    {
        path: 'tag',
        loadChildren: () => import('./components/tag/tagdemo.module').then(m => m.TagDemoModule)
    },
    {
        path: 'avatar',
        loadChildren: () => import('./components/avatar/avatardemo.module').then(m => m.AvatarDemoModule)
    },
    {
        path: 'badge',
        loadChildren: () => import('./components/badge/badgedemo.module').then(m => m.BadgeDemoModule)
    },
    {
        path: 'card',
        loadChildren: () => import('./components/card/carddemo.module').then(m => m.CardDemoModule)
    },
    {
        path: 'button',
        loadChildren: () => import('./components/button/buttondemo.module').then(m => m.ButtonDemoModule)
    },
    {
        path: 'buttongroup',
        loadChildren: () => import('./components/buttongroup/buttongroupdemo.module').then(m => m.ButtonGroupDemoModule)
    },
    {
        path: 'blockui',
        loadChildren: () => import('./components/blockui/blockuidemo.module').then(m => m.BlockUIDemoModule)
    },
    {
        path: 'calendar',
        loadChildren: () => import('./components/calendar/calendardemo.module').then(m => m.CalendarDemoModule)
    },
    {
        path: 'colorpicker',
        loadChildren: () => import('./components/colorpicker/colorpickerdemo.module').then(m => m.ColorPickerDemoModule)
    },
    {
        path: 'chatlist',
        loadChildren: () => import('./components/chatlist/chatlistdemo.module').then(m => m.ChatListDemoModule)
    },
    {
        path: 'checkbox',
        loadChildren: () => import('./components/checkbox/checkboxdemo.module').then(m => m.CheckBoxDemoModule)
    },
    {
        path: 'contextmenu',
        loadChildren: () => import('./components/contextmenu/context-menudemo.module').then(m => m.ContextMenuDemoModule)
    },
    {
        path: 'step',
        loadChildren: () => import('./components/step/stepdemo.module').then(m => m.StepDemoModule)
    },
    {
        path: 'upload',
        loadChildren: () => import('./components/upload/uploaddemo.module').then(m => m.UploadDemoModule)
    },
    {
        path: 'datatable',
        loadChildren: () => import('./components/datatable/overview/datatabledemo-overview.module').then(m => m.DatatableDemoOverviewModule)
    },
    {
        path: 'datatable/columnfeatures',
        // tslint:disable-next-line:max-line-length
        loadChildren: () => import('./components/datatable/columnfeatures/datatable-columnfeatures.demo.module').then(m => m.DatatableColumnFeaturesDemoModule)
    },
    {
        path: 'datatable/filtering',
        // tslint:disable-next-line:max-line-length
        loadChildren: () => import('./components/datatable/filtering/datatable-filtering.demo.module').then(m => m.DatatableFilteringDemoModule)
    },
    {
        path: 'datatable/rowmodels',
        // tslint:disable-next-line:max-line-length
        loadChildren: () => import('./components/datatable/rowmodels/datatable-rowmodels.demo.module').then(m => m.DatatableRowModelsDemoModule)
    },
    {
        path: 'datatable/tablemodes',
        // tslint:disable-next-line:max-line-length
        loadChildren: () => import('./components/datatable/tablemodes/datatable-tablemodes.demo.module').then(m => m.DatatableTableModesDemoModule)
    },
    {
        path: 'dialog',
        loadChildren: () => import('./components/dialog/dialogdemo.module').then(m => m.DialogDemoModule)
    },
    {
        path: 'date',
        loadChildren: () => import('./components/date/datedemo.module').then(m => m.DateDemoModule)
    },
    {
        path: 'dropdownlist',
        loadChildren: () => import('./components/dropdownlist/dropdownlistdemo.module').then(m => m.DropDownListDemoModule)
    },
    {
        path: 'lightbox',
        loadChildren: () => import('./components/lightbox/lightboxdemo.module').then(m => m.LightboxDemoModule)
    },
    {
        path: 'dropdownicon',
        loadChildren: () => import('./components/dropdownicon/dropdownicondemo.module').then(m => m.DropDownIconDemoModule)
    },
    {
        path: 'datepicker',
        loadChildren: () => import('./components/datepicker/datepickerdemo.module').then(m => m.DatePickerDemoModule)
    },
    {
        path: 'editor',
        loadChildren: () => import('./components/editor/editordemo.module').then(m => m.EditorDemoModule)
    },
    {
        path: 'form',
        loadChildren: () => import('./components/form/formdemo.module').then(m => m.FormDemoModule)
    },
    {
        path: 'inlineform',
        loadChildren: () => import('./components/form/inline/form-inlinedemo.module').then(m => m.FormInlineDemoModule)
    },
    {
        path: 'modalform',
        loadChildren: () => import('./components/form/modal/form-modaldemo.module').then(m => m.FormModalDemoModule)
    },
    {
        path: 'smartform',
        loadChildren: () => import('./components/form/smart/form-smartdemo.module').then(m => m.FormSmartDemoModule)
    },
    {
        path: 'input',
        loadChildren: () => import('./components/input/inputdemo.module').then(m => m.InputDemoModule)
    },
    {
        path: 'inputvalidators',
        loadChildren: () => import('./components/inputvalidators/inputvalidatorsdemo.module').then(m => m.InputValidatorsDemoModule)
    },
    {
        path: 'inputmask',
        loadChildren: () => import('./components/inputmask/inputmaskdemo.module').then(m => m.InputMaskDemoModule)
    },
    {
        path: 'inputcurrency',
        loadChildren: () => import('./components/inputcurrency/inputcurrencydemo.module').then(m => m.InputCurrencyDemoModule)
    },
    {
        path: 'icons',
        loadChildren: () => import('./components/icons/overview/iconsdemo.module').then(m => m.IconsDemoModule)
    },
    {
        path: 'icons/dxicons',
        loadChildren: () => import('./components/icons/dxicons/iconsdemo.module').then(m => m.IconsDemoModule)
    },
    {
        path: 'icons/font-awesome',
        loadChildren: () => import('./components/icons/font-awesome/iconsdemo.module').then(m => m.IconsDemoModule)
    },
    {
        path: 'icons/ionicons',
        loadChildren: () => import('./components/icons/ionicons/iconsdemo.module').then(m => m.IconsDemoModule)
    },
    {
        path: 'loader',
        loadChildren: () => import('./components/loader/loaderdemo.module').then(m => m.LoaderDemoModule)
    },
    {
        path: 'skeleton',
        loadChildren: () => import('./components/skeleton/skeletondemo.module').then(m => m.SkeletondemoModule)
    },
    {
        path: 'listbox',
        loadChildren: () => import('./components/listbox/listboxdemo.module').then(m => m.ListBoxDemoModule)
    },
    {
        path: 'modal',
        loadChildren: () => import('./components/modal/modaldemo.module').then(m => m.ModalDemoModule)
    },
    {
        path: 'multiselect',
        loadChildren: () => import('./components/multiselect/multiselectdemo.module').then(m => m.MultiSelectDemoModule)
    },
    {
        path: 'menu',
        loadChildren: () => import('./components/menu/menudemo.module').then(m => m.MenuDemoModule)
    },
    {
        path: 'multiview',
        loadChildren: () => import('./components/multiview/multiviewdemo.module').then(m => m.MultiViewDemoModule)
    },
    {
        path: 'overlaypanel',
        loadChildren: () => import('./components/overlaypanel/overlay-paneldemo.module').then(m => m.OverlayPanelDemoModule)
    },
    {
        path: 'navigator',
        loadChildren: () => import('./components/navigator/navigatordemo.module').then(m => m.NavigatorDemoModule)
    },
    {
        path: 'thumbnail',
        loadChildren: () => import('./components/thumbnail/thumbnaildemo.module').then(m => m.ThumbnailDemoModule)
    },
    {
        path: 'panelgroup',
        loadChildren: () => import('./components/panel/paneldemo.module').then(m => m.PanelDemoModule)
    },
    {
        path: 'permissions',
        loadChildren: () => import('./components/permissions/permissionsdemo.module').then(m => m.PermissionsDemoModule)
    },
    {
        path: 'progressbar',
        loadChildren: () => import('./components/progressbar/progressbardemo.module').then(m => m.ProgressBarDemoModule)
    },
    {
        path: 'popupmenu',
        loadChildren: () => import('./components/popupmenu/popupmenudemo.module').then(m => m.PopupMenuDemoModule)
    },
    {
        path: 'radiobutton',
        loadChildren: () => import('./components/radiobutton/radiobuttondemo.module').then(m => m.RadioButtonDemoModule)
    },
    {
        path: 'shortcut',
        loadChildren: () => import('./components/shortcut/shortcutdemo.module').then(m => m.ShortcutDemoModule)
    },
    {
        path: 'schedule',
        loadChildren: () => import('./components/schedule/overview/scheduledemo-overview.module').then(m => m.ScheduledemoOverviewModule)
    },
    {
        path: 'sidebar',
        loadChildren: () => import('./components/sidebar/sidebardemo.module').then(m => m.SidebarDemoModule)
    },
    {
        path: 'splitbutton',
        loadChildren: () => import('./components/splitbutton/splitbuttondemo.module').then(m => m.SplitButtonDemoModule)
    },
    {
        path: 'stopwatch',
        loadChildren: () => import('./components/stopwatch/stopwatchdemo.module').then(m => m.StopwatchDemoModule)
    },
    {
        path: 'switch',
        loadChildren: () => import('./components/switch/switchdemo.module').then(m => m.SwitchDemoModule)
    },
    {
        path: 'textarea',
        loadChildren: () => import('./components/textarea/textareademo.module').then(m => m.TextareaDemoModule)
    },
    {
        path: 'clockpicker',
        loadChildren: () => import('./components/clockpicker/clockpickerdemo.module').then(m => m.ClockPickerDemoModule)
    },
    {
        path: 'timeline',
        loadChildren: () => import('./components/timeline/overview/timelinedemo.module').then(m => m.TimelineDemoModule)
    },
    {
        path: 'timepicker',
        loadChildren: () => import('./components/timepicker/timepickerdemo.module').then(m => m.TimepickerDemoModule)
    },
    {
        path: 'timeavailable',
        // tslint:disable-next-line:max-line-length
        loadChildren: () => import('./components/time-available-picker/time-available-pickerdemo.module').then(m => m.TimeAvailablePickerDemoModule)
    },
    {
        path: 'timeline/infinitescroll',
        loadChildren: () => import('./components/timeline/infinitescroll/timelinedemo.module').then(m => m.TimelineDemoModule)
    },
    {
        path: 'timeline/dynamictemplate',
        loadChildren: () => import('./components/timeline/templatedynamic/timelinedemo.module').then(m => m.TimelineDemoModule)
    },
    {
        path: 'tabcontrol',
        loadChildren: () => import('./components/tabcontrol/tabcontroldemo.module').then(m => m.TabControlDemoModule)
    },
    {
        path: 'toaster',
        loadChildren: () => import('./components/toaster/toasterdemo.module').then(m => m.ToasterDemoModule)
    },
    {
        path: 'toolbar',
        loadChildren: () => import('./components/toolbar/toolbardemo.module').then(m => m.ToolbarDemoModule)
    },
    {
        path: 'tooltip',
        loadChildren: () => import('./components/tooltip/tooltipdemo.module').then(m => m.TooltipDemoModule)
    },
    {
        path: 'overlaypanel',
        loadChildren: () => import('./components/overlaypanel/overlay-paneldemo.module').then(m => m.OverlayPanelDemoModule)
    },
], {})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
