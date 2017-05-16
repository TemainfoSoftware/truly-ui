/**
 * Created by Maicon on 16/05/2017.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ty-button',
    templateUrl: './button.html',
    styleUrls: ['./button.scss']
})
export class TYButton implements OnInit {

    myTrultProperty: string;

    constructor() {
        this.myTrultProperty = 'Hello Word';
    }

    ngOnInit() {
    }

}
