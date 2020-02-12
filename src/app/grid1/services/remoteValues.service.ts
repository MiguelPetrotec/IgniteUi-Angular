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
        done: (colVals: any[]) => void) {
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
            } else {
                field = column.field;
                columnValues = filteredData.map(record => record[field]);
            }
            done(columnValues);
        }, 1000);
    }
}
