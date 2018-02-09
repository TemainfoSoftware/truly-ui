import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShortcutDirective } from './shortcut.directive';
import { ShortcutService } from '../core/helper/shortcut.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        ShortcutDirective,
    ],
    exports: [
        ShortcutDirective,
    ],
    providers: [
        ShortcutService,
    ]
})
export class MiscModule {}
