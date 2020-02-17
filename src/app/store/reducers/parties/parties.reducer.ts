import { Action, createReducer, on } from '@ngrx/store';
import { PaginationRequest } from 'src/app/models/common/paginationRequest';
import { CustomerPartyDTO } from 'src/app/models/Party/customerPartyDTO';
import { EmployeePartyDTO } from 'src/app/models/Party/employeePartyDTO';
import { PartyDTO } from 'src/app/models/Party/partyDTO';
import { PartySalutationDTO } from 'src/app/models/Party/partySalutationDTO';
import { SupplierPartyDTO } from 'src/app/models/Party/supplierPartyDTO';
import * as PartiesActionTypes from '../../actions/parties/parties.actions';
import { CountryDTO } from 'src/app/models/Country/countryDTO';
import { CategoryDTO } from 'src/app/models/Categories/categoryDTO';
import { CategoryElementDTO } from 'src/app/models/Categories/categoryElementDTO';


export interface PartiesState {

    salutations: PartySalutationDTO[];
    countries: CountryDTO[];
    partyList?: PartyDTO[];
    party: any;
    customerParty: CustomerPartyDTO;
    supplierParty: SupplierPartyDTO;
    employeeParty: EmployeePartyDTO;
    isLoading: boolean;
    error: Error;
    totalRecords: number;
    pageReq: PaginationRequest;
    categories: CategoryDTO[];
    categoryElements: CategoryElementDTO[];
}

export const initialState: PartiesState = {

    salutations: null,
    countries: null,
    partyList: null,
    party: null,
    customerParty: null,
    supplierParty: null,
    employeeParty: null,
    isLoading: false,
    error: null,
    totalRecords: 0,
    pageReq: null,
    categories: null,
    categoryElements:null
};

const partiesReducer = createReducer(
    initialState,
    on(PartiesActionTypes.getSalutations, (state, { pageReq }) => (<PartiesState>{
        ...state, error: null, pageReq: pageReq
    })),
    on(PartiesActionTypes.loadSalutations, (state, { response }) => {
        let currentOffset = state.pageReq ? state.pageReq.offset : 0;
        let totalRecords = Math.max(currentOffset + (<any>response).result.size, state.totalRecords);
        return {
            ...state, salutations: (<any>response).result.items || [], isLoading: false, error: null, totalRecords: totalRecords
        }
    }),
    on(PartiesActionTypes.loadCountries, (state, { response }) => {
        let currentOffset = state.pageReq ? state.pageReq.offset : 0;
        let totalRecords = Math.max(currentOffset + (<any>response).result.size, state.totalRecords);
        return {
            ...state, countries: (<any>response).result.items || [], isLoading: false, error: null, totalRecords: totalRecords
        }
    }),
    on(PartiesActionTypes.loadCategories, (state, { response }) => {
        let currentOffset = state.pageReq ? state.pageReq.offset : 0;
        let totalRecords = Math.max(currentOffset + (<any>response).result.size, state.totalRecords);
        return {
            ...state, categories: (<any>response).result.items || [], isLoading: false, error: null, totalRecords: totalRecords
        }
    }),
    on(PartiesActionTypes.setParty, (state, { party }) => ({
        ...state, party: (<any>party).result, error: null
    })),
    on(PartiesActionTypes.setCustomerParty, (state, { party }) => ({
        ...state, party: (<any>party).result, error: null
    })),
    on(PartiesActionTypes.setSupplierParty, (state, { party }) => ({
        ...state, party: (<any>party).result, error: null
    })),
    on(PartiesActionTypes.setEmployeeParty, (state, { party }) => ({
        ...state, party: (<any>party).result, error: null
    })),
    on(PartiesActionTypes.loadCategoryElements, (state, { response }) => ({
        ...state, categoryElements: (<any>response).result, error: null
    })),
);

export function reducer(state: PartiesState | undefined, action: Action) {

    return partiesReducer(state, action);
}