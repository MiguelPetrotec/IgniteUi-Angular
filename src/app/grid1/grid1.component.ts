import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { employeesData } from './localData';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IgxGridComponent, NoopFilteringStrategy } from 'igniteui-angular';
import { Subject, Observable } from 'rxjs';
import { RemoteFilteringService } from './services/remoteFilteringService';
import { CustomCustomerDTO } from './models/custom-CustomerDTO';

const DEBOUNCE_TIME = 300;

@Component({
  providers: [RemoteFilteringService],
  selector: 'app-grid1',
  templateUrl: './grid1.component.html',
  styleUrls: ['./grid1.component.scss']
})
export class Grid1Component implements OnInit {
  public localData: any[];
  title = 'grid1';
  @ViewChild('grid', { static: true }) public grid: IgxGridComponent;
  public noopFilterStrategy = NoopFilteringStrategy.instance();
  // tslint:disable-next-line:variable-name
  private _prevRequest: any;
  private _chunkSize: number;
  private destroy$ = new Subject<boolean>();

  public remoteData: Observable<CustomCustomerDTO[]>;

  constructor(private _remoteService: RemoteFilteringService, private renderer: Renderer2) { }

  ngOnInit() {
    // this.localData = employeesData;
    this.remoteData = this._remoteService.remoteData;
  }

  public ngAfterViewInit() {

    const filteringExpr = this.grid.filteringExpressionsTree.filteringOperands;
    const sortingExpr = this.grid.sortingExpressions[0];
    this._chunkSize = Math.ceil(parseInt(this.grid.height, 10) / this.grid.rowHeight);
    this.grid.isLoading = true;



    this._remoteService.getData(
      {
        chunkSize: this._chunkSize,
        startIndex: this.grid.virtualizationState.startIndex
      },
      filteringExpr,
      sortingExpr,
      (data) => {
        this.grid.totalItemCount = data['@odata.count'];
        this.grid.isLoading = false;
      });

    this.grid.onDataPreLoad.pipe(
      debounceTime(DEBOUNCE_TIME),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.processData();
    });
    this.grid.filteringExpressionsTreeChange.pipe(
      debounceTime(DEBOUNCE_TIME),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.processData(true);
    });
    this.grid.sortingExpressionsChange.pipe(
      debounceTime(DEBOUNCE_TIME),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.processData();
    });
  }

  public processData(isFiltering: boolean = false) {
    if (this._prevRequest) {
      this._prevRequest.unsubscribe();
    }

    if (!this.grid.isLoading) {
      this.grid.isLoading = true;
    }

    const virtualizationState = this.grid.virtualizationState;
    const filteringExpr = this.grid.filteringExpressionsTree.filteringOperands;
    const sortingExpr = this.grid.sortingExpressions[0];

    console.dir(filteringExpr);

    this._prevRequest = this._remoteService.getData(
      {
        chunkSize: this._chunkSize,
        startIndex: isFiltering ? 0 : virtualizationState.startIndex
      },
      filteringExpr,
      sortingExpr,
      (data) => {
        this.grid.totalItemCount = data['@odata.count'];
        if (this.grid.isLoading) {
          this.grid.isLoading = false;
        }
      });
  }


}
