/**
 * Created by Maicon on 16/05/2017.
 */

import {NgModule} from '@angular/core';

import {TYButton} from './button';

@NgModule({
    declarations: [
        TYButton,
    ],
    exports: [
        TYButton,
    ],
})
export class ButtonModule {}
