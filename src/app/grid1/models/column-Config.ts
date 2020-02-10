import { DataType } from './enum/DataType.enum';


// tslint:disable-next-line:class-name
export interface columnConfig {

    field: string;
    header: string;
    dataType: DataType;
    sortable: boolean;
    resizable: boolean;
    filterable: boolean;
    movable: boolean;
    pinned: boolean;
    groupable: boolean;
    hidden: boolean;
    width: string;
    type: string;
    code?: string;
}
