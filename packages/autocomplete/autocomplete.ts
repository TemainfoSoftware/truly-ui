/**
 * Created by Maicon on 16/05/2017.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ty-autocomplete',
    templateUrl: './autocomplete.html',
    styleUrls: ['./autocomplete.scss']
})
export class TYAutocomplete implements OnInit {

    myTrultProperty: string;

    constructor() {
        this.myTrultProperty = 'Hello Word';
    }

    ngOnInit() {
    }

}
