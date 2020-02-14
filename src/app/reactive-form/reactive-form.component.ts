import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IgxComboComponent, DataType, IComboSelectionChangeEventArgs } from 'igniteui-angular';
import { CategoriesService } from '../grid1/services/categories/categoriesService.service';
import { CITIES, ICity } from '../inputgroup/cities';
import { Observable, Subscription, zip } from 'rxjs';
import { CategoryDTO } from '../grid1/models/categories/CategoryDTO';
import { skip } from 'rxjs/operators';
import { CategoryElementDTO } from '../grid1/models/categories/categoryElementDTO';
import { element } from 'protractor';

const USAGE_CODE = 'CUSTOMER';

@Component({
  providers: [CategoriesService],
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit, OnDestroy {

  @ViewChild('withValueKey', { read: IgxComboComponent, static: true })
  public comboValueKey: IgxComboComponent;

  public date: Date;
  public cities: ICity[] = CITIES;
  public selectedValueKey: string[] = ['UK01', 'BG01'];

  public categoryList: Observable<CategoryDTO[]>;
  public categories: CategoryDTO[];
  public categoriesFlat: any[] = [];
  public zipsubs: Subscription;



  constructor(private categoriesService: CategoriesService) {

    this.categoryList = this.categoriesService.remoteData.asObservable();

    this.zipsubs = zip(
      this.categoryList.pipe(skip(1))
    ).subscribe(result => {
      // categories
      if (result[0] && result[0].length > 0) {
        result[0].forEach(cat => {
          if (cat.categoryElements) {
            // each category to be treated
            this.categoriesFlat[cat.code] = [];
            this.buildCategoriesFlat(cat.categoryElements, cat.code);
          }
        });
        console.dir(this.categoriesFlat);
      }
    });

    this.categoriesService.getData(USAGE_CODE, (data) => {
      this.categories = data ? data.result.items : [];

    });
  }

  private buildCategoriesFlat(catElements: CategoryElementDTO[], code: string) {

    catElements.forEach(catElem => {

      if (catElem.elements && catElem.elements.length > 0) {

        this.addCatFlat((code + ':' + catElem.code), catElem);

        this.buildCategoriesFlat(catElem.elements, (code + ':' + catElem.code));

      } else {

        this.addCatFlat(code, catElem);
        // const catCode = (code.split(':'))[0];

        // let elements: any[] = this.categoriesFlat[catCode];

        // if (elements.findIndex(item => item.itemCode === catElem.code) < 0) {

        //   elements = elements.concat({
        //     groupCode: code,
        //     itemCode: catElem.code,
        //     categoryCode: catCode
        //   });
        //   this.categoriesFlat[catCode] = elements;
        // }
      }
      return;
    });
  }

  private addCatFlat(grpCode: string, catElem: CategoryElementDTO) {

    const catCode = (grpCode.split(':'))[0];

    let elements: any[] = this.categoriesFlat[catCode];

    if (elements.findIndex(item => item.itemCode === catElem.code) < 0 && catElem.itemAllowed) {

      elements = elements.concat({
        groupCode: grpCode,
        itemCode: catElem.code,
        categoryCode: catCode
      });
      this.categoriesFlat[catCode] = elements;
    }

  }



  ngOnInit() {
  }

  public onDateSelection(value) {
    this.date.setDate((value as Date).getDate());
  }

  public handleSearchInputEvent(event: any) {


  }

  public singleSelection(event: IComboSelectionChangeEventArgs) {
    if (event.added.length) {
      event.newSelection = event.added;
    }
  }

  ngOnDestroy(): void {
    if (this.zipsubs) {
      this.zipsubs.unsubscribe();
    }
  }

}
