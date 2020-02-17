import { Sort } from './sort';

export interface PageAndSorting {
    offset: number;
    limit: number;
    realSize: boolean;
    sort: Sort[];
}
