export interface PaginationRequest {
    offset: number;
    limit: number;
    realSize: boolean;
    query?: any;
    sort?: any;

}
