/**
 * Created by William on 18/05/2017.
 */
import {Component, OnInit, Input} from '@angular/core'

@Component({
    selector: 'tl-input',
    templateUrl: './input.html',
    styleUrls: ['./input.scss'],
})
export class TlInput implements OnInit {
    @Input() value: string = '';
    @Input() placeholder: string = '';

    constructor() {
    }

    ngOnInit() {

    }
}