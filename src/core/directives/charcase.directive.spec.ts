import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CharcaseDirective } from './charcase.directive';

@Component( {
    template: `
        <input charcase="UPPERCASE" [(ngModel)]="title">
        <input charcase="LOWERCASE" [(ngModel)]="title">`
} )
class TestComponent {
    title = 'Title Component';
}

let fixture: ComponentFixture<TestComponent>;
let debugElment: DebugElement[];
let inputElement: HTMLInputElement;
let componentInstance: TestComponent;

beforeEach( () => {
    TestBed.configureTestingModule( {
        declarations: [
            CharcaseDirective,
            TestComponent
        ],
        imports: [
            FormsModule
        ]
    } ).compileComponents();
} );

beforeEach( () => {
    fixture = TestBed.createComponent( TestComponent );
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
    debugElment = fixture.debugElement.queryAll( By.directive( CharcaseDirective ) );
} );


describe( 'Charcase Directive com NgModel', () => {

    const textInputMock = 'quick BROWNfox';

    test( 'deve escrever em maisculo quando setado "UPPERCASE"', async( () => {
        inputElement = debugElment[ 0 ].nativeElement;
        inputElement.value = textInputMock;
        inputElement.dispatchEvent( new Event( 'input' ) );
        fixture.detectChanges();
        expect( componentInstance.title ).toBe( textInputMock.toUpperCase() );
    } ) );

    test( 'deve escrever em minusculo quando setado "LOWERCASE"', async( () => {
        inputElement = debugElment[ 1 ].nativeElement;
        inputElement.value = textInputMock;
        inputElement.dispatchEvent( new Event( 'input' ) );
        fixture.detectChanges();
        expect( componentInstance.title ).toBe( textInputMock.toLowerCase() );
    } ) );
} );
