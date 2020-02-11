import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilteringLogic, SortingDirection } from 'igniteui-angular';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

// const DATA_URL = 'https://services.odata.org/V4/Northwind/Northwind.svc/Products';
const DATA_URL = 'http://192.168.1.35:51024/api/v1/parties/customers/search';
const EMPTY_STRING = '';
const NULL_VALUE = null;
export enum FILTER_OPERATION {
    CONTAINS = '=in=',
    STARTS_WITH = 'startswith',
    ENDS_WITH = 'endswith',
    EQUALS = '==',
    DOES_NOT_EQUAL = '!=',
    DOES_NOT_CONTAIN = '=out=',
    GREATER_THAN = '=gt=',
    LESS_THAN = '=lt=',
    LESS_THAN_EQUAL = ' =le=',
    GREATER_THAN_EQUAL = '=ge='
}

@Injectable()
export class RemoteFilteringService {
    public remoteData: BehaviorSubject<any[]>;
    // private _remoteData: BehaviorSubject<any[]>;

    constructor(private _http: HttpClient) {
        // this._remoteData = new BehaviorSubject([]);
        // this.remoteData = this._remoteData.asObservable();
        this.remoteData = new BehaviorSubject([]);
    }

    public getData(
        paging?: any,
        filteringArgs?: any,
        sortingArgs?: any, cb?: (any) => void): any {

        let filterQuery = EMPTY_STRING;
        let filter = EMPTY_STRING;

        if (filteringArgs && filteringArgs.length > 0) {
            filteringArgs.forEach((columnFilter) => {
                if (filter !== EMPTY_STRING) {
                    filter += ` ${FilteringLogic[FilteringLogic.And].toLowerCase()} `;
                }

                filter += this._buildAdvancedFilterExpression(
                    columnFilter.filteringOperands,
                    columnFilter.operator);
            });

            filterQuery = `${filter}`;
        }

        let headers = new HttpHeaders({

            'Content-type': 'application/json',
            locale: 'pt-pt',
            entity_code: '1',
            rank_order: '1'
        });

        if (filterQuery.length > 0) {
            headers = headers.append('query', filterQuery);
        }

        return this._http.get(this.buildDataUrl(
            paging, filteringArgs, sortingArgs, headers), { headers }).pipe(map((resp: any) => {

                resp.result.items.forEach( item =>{
                    item.birthday = new Date(item.birthday);     // moment(item.birthday, 'YYYY-MM-DD');
                    return item;
                });
                // console.log(item.birthDay);
                return resp;
            })).subscribe((data: any) => {
                // console.dir(data);
                // data.result.items.pipe(map((item: any) => {
                //     console.log(item.birthDay);
                //     item.birthDay = moment(item.birthDay);
                //     return item;
                // }));
                this.remoteData.next(data.result.items);
                if (cb) {
                    cb(data);
                }
            });
    }

    private buildDataUrl(pagingArgs: any, filteringArgs: any, sortingArgs: any, header: HttpHeaders): string {
        // let baseQueryString = `${DATA_URL}?$count=true`;
        let baseQueryString = `${DATA_URL}?`;
        let scrollingQuery = EMPTY_STRING;
        let orderQuery = EMPTY_STRING;
        // let filterQuery = EMPTY_STRING;
        let query = EMPTY_STRING;
        // let filter = EMPTY_STRING;

        console.dir(sortingArgs);

        if (sortingArgs) {
            orderQuery = this._buildSortExpression(sortingArgs);
        }

        // if (filteringArgs && filteringArgs.length > 0) {
        //     filteringArgs.forEach((columnFilter) => {
        //         if (filter !== EMPTY_STRING) {
        //             filter += ` ${FilteringLogic[FilteringLogic.And].toLowerCase()} `;
        //         }

        //         filter += this._buildAdvancedFilterExpression(
        //             columnFilter.filteringOperands,
        //             columnFilter.operator);
        //     });

        //     filterQuery = `query=${filter}`;
        // }
        // if (filterQuery.length > 0) {
        //     header.set('query', filterQuery);
        // //    header =  header.append('query', filterQuery);
        // }

        if (pagingArgs) {
            scrollingQuery = this._buildScrollExpression(pagingArgs);
        }

        query += (orderQuery !== EMPTY_STRING) ? `&${orderQuery}` : EMPTY_STRING;
        // query += (filterQuery !== EMPTY_STRING) ? `&${filterQuery}` : EMPTY_STRING;
        query += (scrollingQuery !== EMPTY_STRING) ? `&${scrollingQuery}` : EMPTY_STRING;

        baseQueryString += query;

        return baseQueryString;
    }

    private _buildAdvancedFilterExpression(operands, operator): string {
        let filterExpression = EMPTY_STRING;
        operands.forEach((operand) => {
            const value = operand.searchVal;
            const isNumberValue = (typeof (value) === 'number') ? true : false;
            const filterValue = (isNumberValue) ? value : `'${value}'`;
            const fieldName = operand.fieldName;
            let filterString;

            if (filterExpression !== EMPTY_STRING) {
                filterExpression += ` ${FilteringLogic[operator].toLowerCase()} `;
            }

            switch (operand.condition.name) {
                case 'contains': {
                    filterString = `${FILTER_OPERATION.CONTAINS}(${fieldName}, ${filterValue})`;
                    break;
                }
                case 'startsWith': {
                    filterString = `${FILTER_OPERATION.STARTS_WITH}(${fieldName},${filterValue})`;
                    break;
                }
                case 'endsWith': {
                    filterString = `${FILTER_OPERATION.ENDS_WITH}(${fieldName},${filterValue})`;
                    break;
                }
                case 'equals': {
                    filterString = `${fieldName} ${FILTER_OPERATION.EQUALS} ${filterValue} `;
                    break;
                }
                case 'doesNotEqual': {
                    filterString = `${fieldName} ${FILTER_OPERATION.DOES_NOT_EQUAL} ${filterValue} `;
                    break;
                }
                case 'doesNotContain': {
                    filterString = `${FILTER_OPERATION.DOES_NOT_CONTAIN}(${fieldName},${filterValue})`;
                    break;
                }
                case 'greaterThan': {
                    filterString = `${fieldName} ${FILTER_OPERATION.GREATER_THAN} ${filterValue} `;
                    break;
                }
                case 'greaterThanOrEqualTo': {
                    filterString = `${fieldName} ${FILTER_OPERATION.GREATER_THAN_EQUAL} ${filterValue} `;
                    break;
                }
                case 'lessThan': {
                    filterString = `${fieldName} ${FILTER_OPERATION.LESS_THAN} ${filterValue} `;
                    break;
                }
                case 'lessThanOrEqualTo': {
                    filterString = `${fieldName} ${FILTER_OPERATION.LESS_THAN_EQUAL} ${filterValue} `;
                    break;
                }
                case 'empty': {
                    filterString = `length(${fieldName}) ${FILTER_OPERATION.EQUALS} 0`;
                    break;
                }
                case 'notEmpty': {
                    filterString = `length(${fieldName}) ${FILTER_OPERATION.GREATER_THAN} 0`;
                    break;
                }
                case 'null': {
                    filterString = `${fieldName} ${FILTER_OPERATION.EQUALS} ${NULL_VALUE}`;
                    break;
                }
                case 'notNull': {
                    filterString = `${fieldName} ${FILTER_OPERATION.DOES_NOT_EQUAL} ${NULL_VALUE}`;
                    break;
                }
            }

            filterExpression += filterString;
        });

        return filterExpression;
    }

    private _buildSortExpression(sortingArgs): string {
        let sortingDirection: string;
        switch (sortingArgs.dir) {
            case SortingDirection.None: {
                sortingDirection = EMPTY_STRING;
                break;
            }
            default: {
                sortingDirection = SortingDirection[sortingArgs.dir].toLowerCase();
                break;
            }
        }

        return `sort=${sortingArgs.fieldName},${sortingDirection.toUpperCase()}`;
    }

    private _buildScrollExpression(pagingArgs): string {

        const skip = pagingArgs.skip;
        const top = pagingArgs.top;

        return `real_size=true&offset=${skip}&limit=${top}`;
    }

}
