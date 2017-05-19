/**
 * Created by William on 18/05/2017.
 */
import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core'

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

    constructor() {
    }

    ngOnInit() {

    }
}