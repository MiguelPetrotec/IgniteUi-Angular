import { createAction, props } from '@ngrx/store';
import { PaginationRequest } from 'src/app/models/common/paginationRequest';
import { PartyDTO } from 'src/app/models/Party/partyDTO';
import { CustomerPartyDTO } from 'src/app/models/Party/customerPartyDTO';
import { EmployeePartyDTO } from 'src/app/models/Party/employeePartyDTO';
import { SupplierPartyDTO } from 'src/app/models/Party/supplierPartyDTO';

// Salutations
export const getSalutations = createAction('[Parties] Get All Parties Salutations Action', props<{ pageReq: PaginationRequest }>());
export const loadSalutations = createAction('[Parties] Load All Parties Salutations Action', props<{ response: any[] }>());
export const loadParties = createAction('[Parties] Load All Parties Action', props<{ response: any[] }>());
// Party Generic Type
export const createParty = createAction('[Parties] Create party Action', props<{ party: PartyDTO }>());
export const getParty = createAction('[Parties] Get a Party by code Action', props<{ partyCode: string }>());
export const setParty = createAction('[Parties] Set Party Action', props<{ party: PartyDTO }>());
// Customers Party Type
export const createCustomerParty = createAction('[CustomersParties] Create Customer party Action', props<{ party: CustomerPartyDTO }>());
export const getCustomerParty = createAction('[CustomersParties] Get a Customer party by code Action', props<{ partyCode: string }>());
export const setCustomerParty = createAction('[CustomersParties] Set Customer party Action', props<{ party: CustomerPartyDTO }>());
// Suppliers Party Type
export const createSupplierParty = createAction('[SuppliersParties] Create Supplier party Action', props<{ party: SupplierPartyDTO }>());
export const getSupplierParty = createAction('[SuppliersParties] Get a Supplier party by code Action', props<{ partyCode: string }>());
export const setSupplierParty = createAction('[SuppliersParties] Set Supplier party Action', props<{ party: SupplierPartyDTO }>());
// Employees Party Type
export const createEmployeeParty = createAction('[EmployeesParties] Create Employee party Action', props<{ party: EmployeePartyDTO }>());
export const getEmployeeParty = createAction('[EmployeesParties] Get a Employee party by code Action', props<{ partyCode: string }>());
export const setEmployeeParty = createAction('[EmployeesParties] Set Employee party Action', props<{ party: EmployeePartyDTO }>());
// Countries
export const getCountries = createAction('[Parties] Get All Countries Action', props<{ pageReq: PaginationRequest }>());
export const loadCountries = createAction('[Parties] Load All Countries Action', props<{ response: any[] }>());
// Categories
export const getCategoriesByUsage = createAction('[Parties] Get All Categories by Usage Action',
    props<{ pageReq: PaginationRequest, usageCode: string }>());
export const loadCategoriesByUsage = createAction('[Parties] Load All Categories by Usage Action', props<{ response: any[] }>());
export const getCategories = createAction('[Parties] Get All Categories by Category Code Action', props<{ categoryCode: string }>());
export const loadCategories = createAction('[Parties] Load All Categories by Category Code Action', props<{ response: any[] }>());
export const getCategoryElements = createAction('[Parties] Get All Category Elements by Category Code Action',
    props<{ categoryCode: string }>());
export const loadCategoryElements = createAction('[Parties] Load All Category Elements by Category Code Action',
    props<{ response: any[] }>());



