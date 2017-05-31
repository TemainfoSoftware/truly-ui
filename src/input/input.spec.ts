import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { TlInput } from './input';
import { InputModule } from './index';

describe('TLInput Component', () => {
    let comp :    TlInput;
    let fixture : ComponentFixture<TlInput>;
    let de :      DebugElement;
    let el :      HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports : [
                InputModule
            ]
        });

        fixture = TestBed.createComponent(TlInput);
        comp = fixture.componentInstance;
    });

    test('should instantiate the component', () => {
        expect(fixture.debugElement).toBeDefined();
    });

    test('deve inicialziar labelPlacement sempre a esquerda', () => {
        const app = fixture.debugElement.componentInstance;
        expect(app.labelPlacement).toEqual('left');
    });

    test('deve inicialziar iconAfter sempre a esquerda', () => {
        const app = fixture.debugElement.componentInstance;
        expect(app.iconAfter).toEqual('');
    });
});
