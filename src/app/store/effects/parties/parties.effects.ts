import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { from, EMPTY } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
// import { PartiesService } from 'src/app/shared/services/parties/parties.service';
import * as MessagesActionTypes from '../../actions/messages/message.actions';
import * as PartiesActionTypes from '../../actions/parties/parties.actions';
import { AppState } from '../../reducers';
// import { CountriesService } from 'src/app/shared/services/countries/countries.service';
// import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

@Injectable()
export class PartiesEffects {

    // Get Party Salutations
    // getSalutations$ = createEffect(() =>
    //     this.actions$
    //         .pipe(
    //             ofType(PartiesActionTypes.getSalutations),
    //             exhaustMap((action) => this.partiesService.getSalutations(action.pageReq)
    //                 .pipe(
    //                     map(result => PartiesActionTypes.loadSalutations({ response: result })),
    //                     catchError((error) => {
    //                         console.log("Get parties salutations errors");
    //                         const actions = [
    //                             // UsersActionTypes.loadUsersLoadEnd(),
    //                             MessagesActionTypes.setMessage(
    //                                 {
    //                                     appMessage:
    //                                         { message: this.translate.instant('App.Errors.Error'), owner: 'PartyManagement', severity: 'error', timestamp: new Date().getTime() }
    //                                 }
    //                             )
    //                         ];
    //                         return from(actions);
    //                     }
    //                     )
    //                 )
    //             )
    //         )
    // );

    // Get Countries
    // getCountries$ = createEffect(() =>
    //     this.actions$
    //         .pipe(
    //             ofType(PartiesActionTypes.getCountries),
    //             exhaustMap((action) => this.countriesService.getCountries(action.pageReq)
    //                 .pipe(
    //                     map(result => PartiesActionTypes.loadCountries({ response: result })),
    //                     catchError((error) => {
    //                         console.log("Get Countries list errors");
    //                         const actions = [
    //                             // UsersActionTypes.loadUsersLoadEnd(),
    //                             MessagesActionTypes.setMessage(
    //                                 {
    //                                     appMessage:
    //                                         { message: this.translate.instant('App.Errors.Error'), owner: 'PartyManagement', severity: 'error', timestamp: new Date().getTime() }
    //                                 }
    //                             )
    //                         ];
    //                         return from(actions);
    //                     }
    //                     )
    //                 )
    //             )
    //         )
    // );

    // Create Party - Generic Type
    // createParty$ = createEffect(() =>
    //     this.actions$
    //         .pipe(
    //             ofType(PartiesActionTypes.createParty),
    //             exhaustMap((action) => this.partiesService.createParty(action)
    //                 .pipe(
    //                     map(
    //                         result => (PartiesActionTypes.loadParties(null))
    //                     ),
    //                     tap(() =>
    //                         this.store$.dispatch(MessagesActionTypes.setMessage({
    //                             appMessage: {
    //                                 message: 'PartyManagement.PartyCreated',
    //                                 owner: this.translate.instant('App.Success'),
    //                                 severity: 'success',
    //                                 timestamp: new Date().getTime()
    //                             }
    //                         })
    //                         )
    //                     ),
    //                     catchError((error) => {
    //                         const actions = [
    //                             // PartiesActionTypes.loadUsersLoadEnd(),
    //                             MessagesActionTypes.setMessage(
    //                                 {
    //                                     appMessage:
    //                                         { message: this.translate.instant('PartyManagement.UserCreateFailed'), owner: 'PartyManagement', severity: 'error', timestamp: new Date().getTime() }
    //                                 }
    //                             )
    //                         ];
    //                         return from(actions);
    //                     }
    //                     )
    //                 )
    //             )
    //         )
    // );

    // Create Customer Party
    // createCustomerParty$ = createEffect(() =>
    //     this.actions$
    //         .pipe(
    //             ofType(PartiesActionTypes.createCustomerParty),
    //             exhaustMap((action) => this.partiesService.createCustomersParty(action)
    //                 .pipe(
    //                     map(
    //                         result => (PartiesActionTypes.loadParties(null))
    //                     ),
    //                     tap(() =>
    //                         this.store$.dispatch(MessagesActionTypes.setMessage({
    //                             appMessage: {
    //                                 message: 'PartyManagement.PartyCreated',
    //                                 owner: this.translate.instant('App.Success'),
    //                                 severity: 'success',
    //                                 timestamp: new Date().getTime()
    //                             }
    //                         })
    //                         )
    //                     ),
    //                     catchError((error) => {
    //                         const actions = [
    //                             // PartiesActionTypes.loadUsersLoadEnd(),
    //                             MessagesActionTypes.setMessage(
    //                                 {
    //                                     appMessage:
    //                                         { message: this.translate.instant('PartyManagement.UserCreateFailed'), owner: 'PartyManagement', severity: 'error', timestamp: new Date().getTime() }
    //                                 }
    //                             )
    //                         ];
    //                         return from(actions);
    //                     }
    //                     )
    //                 )
    //             )
    //         )
    // );


    // Create Supplier Party
    // createSupplierParty$ = createEffect(() =>
    //     this.actions$
    //         .pipe(
    //             ofType(PartiesActionTypes.createSupplierParty),
    //             exhaustMap((action) => this.partiesService.createSuppliersParty(action)
    //                 .pipe(
    //                     map(
    //                         result => (PartiesActionTypes.loadParties(null))
    //                     ),
    //                     tap(() =>
    //                         this.store$.dispatch(MessagesActionTypes.setMessage({
    //                             appMessage: {
    //                                 message: 'PartyManagement.PartyCreated',
    //                                 owner: this.translate.instant('App.Success'),
    //                                 severity: 'success',
    //                                 timestamp: new Date().getTime()
    //                             }
    //                         })
    //                         )
    //                     ),
    //                     catchError((error) => {
    //                         const actions = [
    //                             // PartiesActionTypes.loadUsersLoadEnd(),
    //                             MessagesActionTypes.setMessage(
    //                                 {
    //                                     appMessage:
    //                                         { message: this.translate.instant('PartyManagement.UserCreateFailed'), owner: 'SupplierPartyManagement', severity: 'error', timestamp: new Date().getTime() }
    //                                 }
    //                             )
    //                         ];
    //                         return from(actions);
    //                     }
    //                     )
    //                 )
    //             )
    //         )
    // );

    // Create Employee Party
    // createEmployeeParty$ = createEffect(() =>
    //     this.actions$
    //         .pipe(
    //             ofType(PartiesActionTypes.createEmployeeParty),
    //             exhaustMap((action) => this.partiesService.createEmployeesParty(action)
    //                 .pipe(
    //                     map(
    //                         result => (PartiesActionTypes.loadParties(null))
    //                     ),
    //                     tap(() =>
    //                         this.store$.dispatch(MessagesActionTypes.setMessage({
    //                             appMessage: {
    //                                 message: 'PartyManagement.PartyCreated',
    //                                 owner: this.translate.instant('App.Success'),
    //                                 severity: 'success',
    //                                 timestamp: new Date().getTime()
    //                             }
    //                         })
    //                         )
    //                     ),
    //                     catchError((error) => {
    //                         const actions = [
    //                             // PartiesActionTypes.loadUsersLoadEnd(),
    //                             MessagesActionTypes.setMessage(
    //                                 {
    //                                     appMessage:
    //                                         { message: this.translate.instant('PartyManagement.UserCreateFailed'), owner: 'EmployeePartyManagement', severity: 'error', timestamp: new Date().getTime() }
    //                                 }
    //                             )
    //                         ];
    //                         return from(actions);
    //                     }
    //                     )
    //                 )
    //             )
    //         )
    // );

    // getParty$ = createEffect(() =>
    //     this.actions$
    //         .pipe(
    //             ofType(PartiesActionTypes.getParty),
    //             exhaustMap((action) => this.partiesService.getParty(action)
    //                 .pipe(
    //                     map(result => (PartiesActionTypes.setParty({ party: result }))
    //                     ),

    //                     catchError((error) => {
    //                         const actions = [
    //                             // PartiesActionTypes.loadUsersLoadEnd(),
    //                             MessagesActionTypes.setMessage(
    //                                 {
    //                                     appMessage:
    //                                         { message: this.translate.instant('App.Errors.Error'), owner: 'PartyManagement', severity: 'error', timestamp: new Date().getTime() }
    //                                 }
    //                             )
    //                         ];
    //                         return from(actions);
    //                     }
    //                     )
    //                 )
    //             )
    //         )
    // );

    // getCustomerParty$ = createEffect(() =>
    //     this.actions$
    //         .pipe(
    //             ofType(PartiesActionTypes.getCustomerParty),
    //             exhaustMap((action) => this.partiesService.getCustomersParty(action)
    //                 .pipe(
    //                     map(result => (PartiesActionTypes.setCustomerParty({ party: result }))
    //                     ),

    //                     catchError((error) => {
    //                         const actions = [
    //                             // PartiesActionTypes.loadUsersLoadEnd(),
    //                             MessagesActionTypes.setMessage(
    //                                 {
    //                                     appMessage:
    //                                         { message: this.translate.instant('App.Errors.Error'), owner: 'PartyManagement', severity: 'error', timestamp: new Date().getTime() }
    //                                 }
    //                             )
    //                         ];
    //                         return from(actions);
    //                     }
    //                     )
    //                 )
    //             )
    //         )
    // );

    // getSupplierParty$ = createEffect(() =>
    //     this.actions$
    //         .pipe(
    //             ofType(PartiesActionTypes.getSupplierParty),
    //             exhaustMap((action) => this.partiesService.getSuppliersParty(action)
    //                 .pipe(
    //                     map(result => (PartiesActionTypes.setSupplierParty({ party: result }))
    //                     ),

    //                     catchError((error) => {
    //                         const actions = [
    //                             // PartiesActionTypes.loadUsersLoadEnd(),
    //                             MessagesActionTypes.setMessage(
    //                                 {
    //                                     appMessage:
    //                                         { message: this.translate.instant('App.Errors.Error'), owner: 'PartyManagement', severity: 'error', timestamp: new Date().getTime() }
    //                                 }
    //                             )
    //                         ];
    //                         return from(actions);
    //                     }
    //                     )
    //                 )
    //             )
    //         )
    // );

    // getEmployeeParty$ = createEffect(() =>
    //     this.actions$
    //         .pipe(
    //             ofType(PartiesActionTypes.getEmployeeParty),
    //             exhaustMap((action) => this.partiesService.getEmployeesParty(action)
    //                 .pipe(
    //                     map(result => (PartiesActionTypes.setEmployeeParty({ party: result }))
    //                     ),

    //                     catchError((error) => {
    //                         const actions = [
    //                             // PartiesActionTypes.loadUsersLoadEnd(),
    //                             MessagesActionTypes.setMessage(
    //                                 {
    //                                     appMessage:
    //                                         { message: this.translate.instant('App.Errors.Error'), owner: 'PartyManagement', severity: 'error', timestamp: new Date().getTime() }
    //                                 }
    //                             )
    //                         ];
    //                         return from(actions);
    //                     }
    //                     )
    //                 )
    //             )
    //         )
    // );


    // Get Categories by Usage
    // getCategories$ = createEffect(() =>
    //     this.actions$
    //         .pipe(
    //             ofType(PartiesActionTypes.getCategoriesByUsage),
    //             exhaustMap((action) => this.categoriesService.getCategories(action.pageReq, action.usageCode)
    //                 .pipe(
    //                     map(result => PartiesActionTypes.loadCategoriesByUsage({ response: result })),
    //                     catchError((error) => {
    //                         console.log("Get Categories list errors");
    //                         const actions = [
    //                             // UsersActionTypes.loadUsersLoadEnd(),
    //                             MessagesActionTypes.setMessage(
    //                                 {
    //                                     appMessage:
    //                                         { message: this.translate.instant('App.Errors.Error'), owner: 'PartyManagement', severity: 'error', timestamp: new Date().getTime() }
    //                                 }
    //                             )
    //                         ];
    //                         return from(actions);
    //                     }
    //                     )
    //                 )
    //             )
    //         )
    // );

    // Get Category Elements by Category Code
    //        getCategoryElements$ = createEffect(() =>
    //        this.actions$
    //            .pipe(
    //                ofType(PartiesActionTypes.getCategoryElements),
    //                exhaustMap((action) => this.categoriesService.getCategoryElements(action.categoryCode)
    //                    .pipe(
    //                        map(result => PartiesActionTypes.loadCategoryElements({ response: result })),
    //                        catchError((error) => {
    //                            console.log("Get Category Elements list errors");
    //                            const actions = [
    //                                // UsersActionTypes.loadUsersLoadEnd(),
    //                                MessagesActionTypes.setMessage(
    //                                    {
    //                                        appMessage:
    //                                            { message: this.translate.instant('App.Errors.Error'), owner: 'PartyManagement',
    // severity: 'error', timestamp: new Date().getTime() }
    //                                    }
    //                                )
    //                            ];
    //                            return from(actions);
    //                        }
    //                        )
    //                    )
    //                )
    //            )
    //    );


    constructor(
        private actions$: Actions,
        private store$: Store<AppState>,
        // private partiesService: PartiesService,
        // private countriesService: CountriesService,
        // private categoriesService: CategoriesService,
        private router: Router,
        private translate: TranslateService
    ) { }



}