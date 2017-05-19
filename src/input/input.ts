/**
 * Created by William on 18/05/2017.
 */
import {Component, OnInit, Input, ViewEncapsulation, ViewChild} from '@angular/core'

@Component({
    selector: 'tl-input',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './input.html',
    styleUrls: ['./input.scss', '../assets/reset.css'],
})
export class TlInput implements OnInit {
    @Input() value: string = '';
    @Input() iconLeft: string = '';
    @Input() iconRight: string = '';
    @Input() placeholder: string = '';
    @Input() clearButton: boolean;

    @ViewChild('input') input;

    constructor() {

    }

    ngOnInit() {

    }

    clearInput() {
        this.input.nativeElement.value = '';
        this.value = '';
    }
}