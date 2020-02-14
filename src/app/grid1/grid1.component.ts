import { Component, OnInit, Renderer2, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
// import { employeesData } from './localData';
import { debounceTime, takeUntil, skip } from 'rxjs/operators';
import { IgxGridComponent, NoopFilteringStrategy, IgxColumnComponent, IFilteringExpressionsTree } from 'igniteui-angular';
import { Subject, Observable, Subscription, zip } from 'rxjs';
import { RemoteFilteringService } from './services/remoteFilteringService';
import { CustomCustomerDTO } from './models/custom-CustomerDTO';
import { columnConfig } from './models/column-Config';
import { PropertiesService } from './services/properties/propertiesService.service';
import { PropertyDTO } from './models/properties/PropertyDTO';
import { DataType } from './models/enum/DataType.enum';
import { CategoriesService } from './services/categories/categoriesService.service';
import { CategoryDTO } from './models/categories/CategoryDTO';
import { RemoteValuesService } from './services/remoteValues.service';

const DEBOUNCE_TIME = 300;
const USAGE_CODE = 'CUSTOMER';

@Component({
  providers: [RemoteFilteringService, PropertiesService, CategoriesService],
  selector: 'app-grid1',
  templateUrl: './grid1.component.html',
  styleUrls: ['./grid1.component.scss']
})
export class Grid1Component implements OnInit, OnDestroy {

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
  public categoryList: Observable<CategoryDTO[]>;

  // Plain Data

  public properties: PropertyDTO[];
  public categories: CategoryDTO[];
  public customers: CustomCustomerDTO[];

  // Zip subscription

  public zipsubs: Subscription;

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

  constructor(private remoteService: RemoteFilteringService, private renderer: Renderer2, private propertiesService: PropertiesService,
    private categoriesService: CategoriesService, private remoteValuesService: RemoteValuesService) {

    this.remoteData = this.remoteService.remoteData.asObservable();
    this.propertyList = this.propertiesService.remoteData.asObservable();
    this.categoryList = this.categoriesService.remoteData.asObservable();
    this.gridConfig = [];
    // use rxjs zip
    this.zipsubs = zip(
      this.remoteData.pipe(skip(1)),
      this.propertyList.pipe(skip(1)),
      this.categoryList.pipe(skip(1))
    ).subscribe(result => {

      console.log('Start Column Dynamic Generator');
      // base grid config
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

      if (result[0] && result[0].length > 0) {
        this.customers = result[0];
      }

      // properties
      if (result[1] && result[1].length > 0) {
        result[1].forEach(prop => {
          // 'properties[' + prop.code + ']'
          this.gridConfig = this.gridConfig.concat(
            {
              field: 'properties[' + prop.code + ']', header: prop.detailedDescription['en-en'], width: '150px', sortable: true,
              filterable: true, resizable: true, movable: true, pinned: false,
              groupable: false, hidden: !prop.mandatory, dataType: DataType[prop.dataTypeCode], type: 'prop', code: prop.code
            }
          );
        });
      }
      // categories
      if (result[2] && result[2].length > 0) {
        result[2].forEach(cat => {
          if (cat.categoryElements) {
            // cat.categoryElements.forEach(catElem => {
            this.gridConfig = this.gridConfig.concat(
              {
                field: 'categories[' + cat.code + ']', header: cat.detailedDescription['en-en'], width: '150px', sortable: true,
                filterable: true, resizable: true, movable: true, pinned: false,
                groupable: false, hidden: !cat.mandatory, dataType: DataType.TEXT, type: 'cat', code: cat.code
              }
            );
            // });
          }
        });
      }
    });

    this.categoriesService.getData(USAGE_CODE, (data) => {
      this.categories = data ? data.result.items : [];

    });

    this.propertiesService.getData(USAGE_CODE, (data) => {
      this.properties = data ? data.result.items : [];
    });

    // dynamic grid config
    // do the request to obtain properties and categories

  }



  ngOnInit() {
    // this.localData = employeesData;
    // this.remoteData = this.remoteService.remoteData;
    // this.remoteData = this.remoteService.remoteData.asObservable();
    // this.propertyList = this.propertiesService.remoteData.asObservable();
    // this.categoryList = this.categoriesService.remoteData.asObservable();

  }

  ngOnDestroy(): void {
    if (this.zipsubs) {
      this.zipsubs.unsubscribe();
    }
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
        this.totalCount = data ? data.result.size : 0;
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

  private getCategoryValue(catCode: string, catElemCode: string): string {

    if (catCode && catElemCode && this.categories && this.categories.length > 0) {
      const category = this.categories.find(cat => cat.code === catCode);
      if (category) {
        const idx = category.categoryElements.findIndex(catElem => catElem.code === catElemCode);
        if (idx >= 0) {
          return category.categoryElements[idx].detailedDescription['en-en']; // replace with the current locale code
        }
      }
    }
    return '';
  }

  public formatDate(val) {
    if (val !== 'Select All') {
      return new Intl.DateTimeFormat('en-en').format(val);
    } else {
      return val;
    }
  }

  public columnValuesStrategy = (column: IgxColumnComponent,
    columnExprTree: IFilteringExpressionsTree,
    done: (uniqueValues: any[]) => void) => {
    // Get specific column data.
    this.remoteValuesService.getColumnData(column, columnExprTree, this.customers, uniqueValues => done(uniqueValues), this.categories);
  }

  public doubleClick(event) {
    alert('Double Click!!');
  }

  public addItem() {
    alert('New Item');
  }

}
