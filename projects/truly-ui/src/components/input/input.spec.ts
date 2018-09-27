import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TlInput } from './input';
import { InputModule } from './index';
import { DebugElement } from '@angular/core';

let componentInputInstance: TlInput;
let fixture: ComponentFixture<TlInput>;
let clearButton: DebugElement;
let inputElement: HTMLInputElement;

const textMock = 'Eu sou um Texto do Input';

// async beforeEach
beforeEach( () => {
    TestBed.configureTestingModule( { imports: [ InputModule ] } ).compileComponents();
} );

// synchronous beforeEach
beforeEach( () => {
    fixture = TestBed.createComponent( TlInput );
    componentInputInstance = fixture.componentInstance;
} );

describe( 'TLInput (templateUrl)', () => {
    test( 'should instantiate the component', () => {
        expect( fixture.debugElement ).toBeDefined();
    } );

    test( 'deve inicialziar labelPlacement sempre a esquerda', () => {
        expect( componentInputInstance.labelPlacement ).toEqual( 'left' );
    } );

    test( 'deve incializar iconAfter sempre com vazio', () => {
        expect( componentInputInstance.iconAfter ).toEqual( '' );
    } );
} );
describe( 'TLInput Propriedade [ CLEARBUTTON ]', () => {

    beforeEach( () => {
        componentInputInstance.value = textMock;
        componentInputInstance.clearButton = true;
        fixture.detectChanges();
        clearButton = fixture.debugElement.query( By.css( '.addon.-clearbutton' ) );
        inputElement = fixture.debugElement.query( By.css( 'input' ) ).nativeElement;
        console.log('clearButton element', clearButton);
    } );

    // teste( 'deve limpar elemento html "input" ao clicar no "ClearButton"', async( () => {
    //     clearButton.triggerEventHandler( 'click', null );
    //     expect( inputElement.value ).toEqual( '' );
    // } ) );

    // test( 'deve limpar propriedade "value" ao clicar no "ClearButton"', async( () => {
    //     clearButton.triggerEventHandler( 'click', null );
    //     expect( componentInputInstance.value ).toEqual( '' );
    // } ) );
} );
/*describe( 'TlInput Propriedade [ LABEL, LABELSIZE, LABELPLACEMENT ]', () => {

    beforeEach( () => {
        componentInputInstance.label = textMock;
        fixture.detectChanges();
        debugElment = fixture.debugElement.query( By.css( 'label' ) );
        elementoHTMLLabel = debugElment.nativeElement;
    } );

    test( 'deve posicionar o label a "esquerda" por padrão', async( () => {
        expect( elementoHTMLLabel.className ).toContain( 'labelleft' );
    } ) );

    test( 'deve posicionar o label "acima" do input quando setar a propriedade "labelPlacement"="top"', async( () => {
        componentInputInstance.labelPlacement = 'top';
        fixture.detectChanges();
        expect( elementoHTMLLabel.className ).toContain( 'labeltop' );
    } ) );

    test( 'deve exibir o texto no elementoHtml label ', async( () => {
        fixture.detectChanges();
        expect( elementoHTMLLabel.textContent ).toContain( textMock );
    } ) );

    test( 'deve exibir o elemento "label" com width setado em "LabelSize"', async( () => {
        componentInputInstance.labelSize = '350px';
        fixture.detectChanges();
        expect( elementoHTMLLabel.style.width ).toEqual( '350px' );
    } ) );

    test( 'não deve existir elemento label quando propriedade "label" for vazio', async( () => {
        componentInputInstance.label = '';
        fixture.detectChanges();
        debugElment = fixture.debugElement.query( By.css( 'label' ) );
        expect( debugElment ).toBeNull();
    } ) );

} );*/
