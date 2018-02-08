import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShortcutDirective } from './shortcut.directive';
import { ShortcutService } from '../helper/shortcut.service';
import { DateDirective } from '../../input/validators/date/date.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        ShortcutDirective,
        DateDirective
    ],
    exports: [
        DateDirective,
        ShortcutDirective,
    ],
    providers: [
        ShortcutService,
    ]
})
export class DirectiveModule {}
