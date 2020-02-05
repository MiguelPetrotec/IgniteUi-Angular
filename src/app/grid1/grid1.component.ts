import { Component, OnInit, ViewEncapsulation, Renderer2 } from '@angular/core';
import { employeesData } from './localData';

@Component({
  selector: 'app-grid1',
  templateUrl: './grid1.component.html',
  styleUrls: ['./grid1.component.scss']
})
export class Grid1Component implements OnInit {
  public localData: any[];
  title = 'grid1';
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.localData = employeesData;
  }
}
