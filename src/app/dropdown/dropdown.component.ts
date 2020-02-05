import { Component, OnInit, ViewChild } from '@angular/core';
import {
    IgxDropDownComponent
} from 'igniteui-angular';
import { data } from './local-data';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})

export class DropDownComponent implements OnInit {
    @ViewChild(IgxDropDownComponent, { static: true }) public igxDropDown: IgxDropDownComponent;

    public items: any[] = [];

    constructor() { }

    public ngOnInit() {
        this.items = data;
        this.igxDropDown.width = '200px';
    }
}
