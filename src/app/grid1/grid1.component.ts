import { Component, OnInit, Renderer2, ViewChild, TemplateRef } from '@angular/core';
// import { employeesData } from './localData';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IgxGridComponent, NoopFilteringStrategy } from 'igniteui-angular';
import { Subject, Observable } from 'rxjs';
import { RemoteFilteringService } from './services/remoteFilteringService';
import { CustomCustomerDTO } from './models/custom-CustomerDTO';
import { columnConfig } from './models/column-Config';
import { PropertiesService } from './services/properties/propertiesService.service';
import { PropertyDTO } from './models/properties/PropertyDTO';
import { DataType } from './models/enum/DataType.enum';

const DEBOUNCE_TIME = 300;
const USAGE_CODE = 'CUSTOMER';

@Component({
  providers: [RemoteFilteringService, PropertiesService],
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
  // private _chunkSize: number;
  private destroy$ = new Subject<boolean>();

  public remoteData: Observable<CustomCustomerDTO[]>;
  public propertyList: Observable<PropertyDTO[]>;

  // Plain Data

  public properties: PropertyDTO[];

  // Pagination
  public page = 0;
  public totalCount = 0;
  public pages = [];
  public selectOptions = [5, 10, 15, 25, 50];
  @ViewChild('customPager', { read: TemplateRef, static: true }) public remotePager: TemplateRef<any>;

  private _perPage = 10;
  private _dataLengthSubscriber;
  //

  // grid config
  gridConfig: columnConfig[];

  //

  constructor(private remoteService: RemoteFilteringService, private renderer: Renderer2, private propertiesService: PropertiesService) {
    // use rxjs zip


    // base grid config
    this.gridConfig = [];

    this.propertiesService.getData(USAGE_CODE, (data) => {
      this.properties = data.result.items;
      console.dir(this.properties);
      console.log('Loaded Properties');
      // build the properties columns
      this.gridConfig = this.gridConfig.concat([
        {
          field: 'code', header: 'Code', width: '150px', sortable: true,
          filterable: true, resizable: true, movable: true, pinned: false,
          groupable: false, hidden: false, dataType: DataType.TEXT, type: 'text'
        },
        {
          field: 'name', header: 'Full Name', width: '150px', sortable: true,
          filterable: true, resizable: true, movable: true, pinned: false,
          groupable: false, hidden: true, dataType: DataType.TEXT, type: 'text'
        },
        {
          field: 'customerCode', header: 'Customer Code', width: '140px', sortable: true,
          filterable: true, resizable: true, movable: true, pinned: false,
          groupable: false, hidden: false, dataType: DataType.TEXT, type: 'text'
        },
        {
          field: 'vatin', header: 'VAT IN', width: '110px', sortable: true,
          filterable: true, resizable: true, movable: true, pinned: false,
          groupable: true, hidden: false, dataType: DataType.NUMERIC, type: 'number'
        },
        {
          field: 'statusCode', header: 'Status Code', width: '110px', sortable: true,
          filterable: true, resizable: true, movable: true, pinned: false,
          groupable: false, hidden: false, dataType: DataType.TEXT, type: 'text'
        },
        {
          field: 'birthday', header: 'Birthday', width: '180px', sortable: true,
          filterable: true, resizable: true, movable: true, pinned: false,
          groupable: false, hidden: false, dataType: DataType.DATE, type: 'date'
        }
      ]);


      this.properties.forEach(prop => {
        this.gridConfig = this.gridConfig.concat(
          {
            field: 'properties', header: prop.detailedDescription['en-en'], width: '150px', sortable: true,
            filterable: true, resizable: true, movable: true, pinned: false,
            groupable: false, hidden: !prop.mandatory, dataType: DataType[prop.dataTypeCode], type: 'array', code: prop.code
          }
        );
      });
      console.dir(this.gridConfig);
      // this.grid.isLoading = false;
    });

    // dynamic grid config
    // do the request to obtain properties and categories

  }



  ngOnInit() {
    // this.localData = employeesData;
    // this.remoteData = this.remoteService.remoteData;
    this.remoteData = this.remoteService.remoteData.asObservable();
    this.propertyList = this.propertiesService.remoteData.asObservable();

  }

  public ngAfterViewInit() {

    const filteringExpr = this.grid.filteringExpressionsTree.filteringOperands;
    const sortingExpr = this.grid.sortingExpressions[0];
    // this._chunkSize = Math.ceil(parseInt(this.grid.height, 10) / this.grid.rowHeight);
    this.grid.isLoading = true;



    this.remoteService.getData(
      {
        skip: 0,
        top: this.perPage
      },
      filteringExpr,
      sortingExpr,
      (data) => {
        this.totalCount = data.result.size;
        this.grid.isLoading = false;
      });

    // this.grid.onDataPreLoad.pipe(
    //   debounceTime(DEBOUNCE_TIME),
    //   takeUntil(this.destroy$)
    // ).subscribe(() => {
    //   this.processData();
    // });
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

    // const virtualizationState = this.grid.virtualizationState;
    const filteringExpr = this.grid.filteringExpressionsTree.filteringOperands;
    const sortingExpr = this.grid.sortingExpressions[0];

    // console.dir(filteringExpr);

    this._prevRequest = this.remoteService.getData(
      {
        skip: 0,
        top: this.perPage
      },
      filteringExpr,
      sortingExpr,
      (data) => {
        this.totalCount = data.result.size;
        if (this.grid.isLoading) {
          this.grid.isLoading = false;
        }
      });
  }

  public get perPage(): number {
    return this._perPage;
  }

  public set perPage(val: number) {
    this._perPage = val;
    this.paginate(0);
  }

  public paginate(page: number) {
    this.page = page;
    const skipCount = this.page * this.perPage;
    const topValue = this.perPage;

    // this.remoteService.getData(skip, top);

    this.remoteService.getData(
      {
        skip: skipCount,
        top: topValue
      },
      this.grid.filteringExpressionsTree.filteringOperands,
      this.grid.sortingExpressions[0],
      (data) => {
        this.totalCount = data.result.size;
        this.grid.isLoading = false;
      });
  }
}
