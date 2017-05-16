/**
 * Created by Maicon on 16/05/2017.
 */

import {NgModule} from '@angular/core';

import {TYAutocomplete} from './autocomplete';

@NgModule({
    declarations: [
        TYAutocomplete,
    ],
    exports: [
        TYAutocomplete,
    ],
})
export class AutocompleteModule {}
