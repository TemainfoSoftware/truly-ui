import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlLoading } from './loading';
import { TlLoadingComponent } from './loading.component';

export * from './loading';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        TlLoading,
        TlLoadingComponent
    ],
    exports: [
        TlLoading
    ],
    entryComponents: [
        TlLoadingComponent
    ]
})
export class LoadingModule {}
