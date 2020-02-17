import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromLogin from './login/login.reducer';
// import * as fromUsers from './users/user.reducer';
// import * as fromSites from './sites/site.reducer';
// import * as fromNotifiables from './notifiables/notifiable.reducer';
// import * as fromSiteGroups from './site-group/site-group.reducer';
// import * as fromLanguagesManagement from './languages-management/languages-management.reducer';
import * as fromMessages from './messages/message.reducer';
import * as fromParties from './parties/parties.reducer';

export interface AppState {
  login: fromLogin.LoginState;
  // users: fromUsers.UsersState;
  // sites: fromSites.SitesState;
  // notifiables: fromNotifiables.NotifiablesState;
  messages: fromMessages.MessagesState;
  // siteGroup: fromSiteGroups.SiteGroupState;
  // languages: fromLanguagesManagement.LanguagesManagementState;
  parties: fromParties.PartiesState;
}

export const reducers: ActionReducerMap<AppState> = {


  login: fromLogin.reducer,
  // users: fromUsers.reducer,
  // sites: fromSites.reducer,
  // notifiables: fromNotifiables.reducer,
  messages: fromMessages.reducer,
  // siteGroup: fromSiteGroups.reducer,
  // languages: fromLanguagesManagement.reducer,
  parties: fromParties.reducer
};



// Login State
export const loginState = (state: AppState) => state.login;
export const loginStateisAuthenticated = createSelector(
  loginState,
  login => login.isAuthenticated
);
export const loginStateCurrentUser = createSelector(
  loginState,
  login => login.currentUser
);
export const loginStateIsLoading = createSelector(
  loginState,
  login => login.isLoading
);

// Users State
// export const userState = (state: AppState) => state.users;
// export const usersStateUsersList = createSelector(
//   userState,
//   users => users.userList
// );
// export const usersStateUser = createSelector(
//   userState,
//   users => users.user
// );
// export const usersStateUserProfiles = createSelector(
//   userState,
//   users => users.userProfilesList
// );

// export const usersStateLocaleList = createSelector(
//   userState,
//   users => users.localesList
// );

// export const usersStateListTotalRecords = createSelector(
//   userState,
//   users => users.totalRecords
// );

// export const usersStateIsLoading = createSelector(
//   userState,
//   users => users.isLoading
// );

// Sites State
// export const sitesState = (state: AppState) => state.sites;
// export const sitesStateSitesList = createSelector(
//   sitesState,
//   sites => sites.siteList
// );

// export const sitesStateSiteProfiles = createSelector(
//   sitesState,
//   sites => sites.siteProfilesList
// );

// export const sitesStateRegionList = createSelector(
//   sitesState,
//   sites => sites.regionsList
// );

// export const sitesStateListTotalRecords = createSelector(
//   sitesState,
//   sites => sites.totalRecords
// );

// export const sitesStateIsLoading = createSelector(
//   sitesState,
//   sites => sites.isLoading
// );

// Messages State
export const messagesState = (state: AppState) => state.messages;
export const messagesStateGetMessage = createSelector(
  messagesState,
  messages => messages.appMessage
);

// SiteGroups State
// export const siteGroupState = (state: AppState) => state.siteGroup;
// export const siteGroupStateGetSiteGroupList = createSelector(
//   siteGroupState,
//   siteGroups => siteGroups.siteGroupList
// );
// export const siteGroupStateEntitiesList = createSelector(
//   siteGroupState,
//   siteGroups => siteGroups.entitiesList
// );
// export const siteGroupStateSiteGroupItem = createSelector(
//   siteGroupState,
//   siteGroups => siteGroups.siteGroupItem
// );
// export const siteGroupStateSitesList = createSelector(
//   siteGroupState,
//   siteGroups => siteGroups.sitesList
// );

// export const siteGroupStateIsLoading = createSelector(
//   siteGroupState,
//   siteGroups => siteGroups.isLoading
// );

// export const siteGroupHistoryStatus = createSelector(
//   siteGroupState,
//   siteGroups => siteGroups.historyStatus
// );


// Notifiables State
// export const notifiableState = (state: AppState) => state.notifiables;
// export const notifiablesStateNotifiablesList = createSelector(
//   notifiableState,
//   notifiables => notifiables.notifiableList
// );
// export const notifiablesStateListTotalRecords = createSelector(
//   notifiableState,
//   notifiables => notifiables.totalRecords
// );
// export const notifiableStateNotifiableMethodsList = createSelector(
//   notifiableState,
//   notifiables => notifiables.notifiableMethods
// );
// export const notifiableStateseverityTypesList = createSelector(
//   notifiableState,
//   notifiables => notifiables.severityTypes
// );
// export const notifiableStateLocaleList = createSelector(
//   notifiableState,
//   notifiables => notifiables.localesList
// );
// export const notifiableStateEntitiesList = createSelector(
//   notifiableState,
//   notifiables => notifiables.entitiesList
// );
// export const notifiableStateSitesList = createSelector(
//   notifiableState,
//   notifiables => notifiables.sitesList
// );
// export const notifiableStateSiteGroupList = createSelector(
//   notifiableState,
//   notifiables => notifiables.siteGroupList
// );
// export const notifiableStateSiteGroupItem = createSelector(
//   notifiableState,
//   notifiables => notifiables.siteGroupItem

// );
// export const notifiableStateNotifiableSites = createSelector(
//   notifiableState,
//   notifiables => notifiables.notifiableSites

// );
// export const notifiableStateNotifiableSiteItems = createSelector(
//   notifiableState,
//   notifiables => notifiables.notifiableSiteItems

// );

// export const notifiableStateIsLoading = createSelector(
//   notifiableState,
//   notifiables => notifiables.isLoading
// );

// export const notifiableHistoryStatus = createSelector(
//   notifiableState,
//   notifiables => notifiables.historyStatus
// );

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];


// Language Management State
// export const languageManagementState = (state: AppState) => state.languages;
// export const languageManagementDictionaryEntries = createSelector(
//   languageManagementState,
//   languageState => languageState.dictionaryKeys
// );
// export const languageManagementDictionarySize = createSelector(
//   languageManagementState,
//   languageState => languageState.totalRecords
// );
// export const languageManagementLocales = createSelector(
//   languageManagementState,
//   languageState => languageState.locales
// );
// export const languageManagementLoading = createSelector(
//   languageManagementState,
//   languageState => languageState.isLoading
// );

// export const languageManagementError = createSelector(
//   languageManagementState,
//   languageState => languageState.error
// );

// Parties State
export const partiesState = (state: AppState) => state.parties;
export const partiesStateSalutations = createSelector(
  partiesState,
  parties => parties.salutations
);
export const partiesStateCountries = createSelector(
  partiesState,
  parties => parties.countries
);
export const loadedPartyState = createSelector(
  partiesState,
  parties => parties.party
);
export const loadedCustomerPartyState = createSelector(
  partiesState,
  parties => parties.customerParty
);
export const loadedSupplierPartyState = createSelector(
  partiesState,
  parties => parties.supplierParty
);
export const loadedEmployeePartyState = createSelector(
  partiesState,
  parties => parties.employeeParty
);
export const loadedCategoriesPartyState = createSelector(
  partiesState,
  parties => parties.categories
);
