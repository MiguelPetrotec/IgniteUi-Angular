import { Injectable } from '@angular/core';
import { FilteringStrategy, IFilteringExpressionsTree, IgxColumnComponent } from 'igniteui-angular';
import { SAMPLE_DATA } from '../models/employees';

@Injectable()
export class RemoteValuesService {
    private _filteringStrategy = new FilteringStrategy();

    public getRecordsData() {
        return SAMPLE_DATA;
    }

    public getColumnData(column: IgxColumnComponent,
                         columnExprTree: IFilteringExpressionsTree,
                         data: any[],
                         done: (colVals: any[]) => void,
                         subCatList?: any[], ) {
        setTimeout(() => {
            let field = '';
            const filteredData = this._filteringStrategy.filter(data, columnExprTree);
            let columnValues = [];

            if (column.field.toLowerCase().startsWith('properties')) {
                field = 'properties';
                const propertyCode = column.field.substring(
                    column.field.lastIndexOf('[') + 1,
                    column.field.lastIndexOf(']')
                );
                columnValues = filteredData.map(record => record[field]).filter(prop => {
                    if (prop[propertyCode]) {
                        return true;
                    }
                }
                ).map(x => x[propertyCode]);
            } else if (column.field.toLowerCase().startsWith('categories')) {
                field = 'categories';
                let tempValues: any[];
                const categoryCode = column.field.substring(
                    column.field.lastIndexOf('[') + 1,
                    column.field.lastIndexOf(']')
                );
                tempValues = filteredData.map(record => record[field]).filter(prop => {
                    if (prop[categoryCode]) {
                        return true;
                    }
                }
                ).map(x => x[categoryCode]);

                if (subCatList && subCatList.length > 0) {

                    columnValues = tempValues.map( subCat => {

                        const category = subCatList.find(cat => cat.code === categoryCode);
                        if (category) {
                          const idx = category.categoryElements.findIndex(catElem => catElem.code === subCat);
                          if (idx >= 0) {
                            return category.categoryElements[idx].detailedDescription['en-en']; // replace with the current locale code
                          }
                        }
                    });
                } else {
                    columnValues = tempValues;
                }


            } else {
                field = column.field;
                columnValues = filteredData.map(record => record[field]);
            }
            done(columnValues);
        }, 1000);
    }
}
