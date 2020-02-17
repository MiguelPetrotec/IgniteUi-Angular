import { NgModule, Injector, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import {
   IgxButtonModule, IgxCheckboxModule, IgxComboModule, IgxDatePickerModule, IgxBadgeModule, IgxToastModule,
   IgxDropDownModule, IgxGridModule, IgxIconModule, IgxInputGroupModule, IgxLayoutModule,
   IgxNavbarModule, IgxNavigationDrawerModule, IgxRippleModule, IgxSelectModule,
   IgxTimePickerModule, IgxToggleModule, IgxSwitchModule, IgxTabsModule
} from 'igniteui-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropDownComponent } from './dropdown/dropdown.component';
import { Grid1Component } from './grid1/grid1.component';
import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment';
import { InputGroupComponent } from './inputgroup/inputgroup.component';
import { LanguageTranslationModule } from './language-translation/language-translation.module';
import { LoginComponent } from './login/login.component';
import { NgxFlagIconCssModule } from 'ngx-flag-icon-css';
import { registerLocaleData } from '@angular/common';
import localePtPt from '@angular/common/locales/pt-PT';
import { RemoteFilteringService } from './grid1/services/remoteFilteringService';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PropertiesService } from './grid1/services/properties/propertiesService.service';
import { CategoriesService } from './grid1/services/categories/categoriesService.service';
import { RemoteValuesService } from './grid1/services/remoteValues.service';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { AppSessionService } from './shared/services/app-session/app-session.service';
import { AuthGuard } from './shared';
import { BasicAuthInterceptor } from './http-component/basic-authInterceptor';
import { OAuthModule } from 'angular-oauth2-oidc';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store/reducers';

registerLocaleData(localePtPt);

export function appInitializerFactory(injector: Injector) {
   return () => {
      return new Promise<boolean>((resolve, reject) => {
         const appSessionService: AppSessionService = injector.get(AppSessionService);
         // console.log('estou aqui');
         appSessionService.ngOnInit();
         resolve(true);
      });
   };
}

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      Grid1Component,
      LoginComponent,
      InputGroupComponent,
      DropDownComponent,
      ReactiveFormComponent,
      ReactiveFormComponent
   ],
   imports: [
      FormsModule,
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      StoreModule,
      !environment.production ? StoreDevtoolsModule.instrument() : [],
      StoreDevtoolsModule,
      EffectsModule.forRoot(
         [
            //  LoginEffects,
            //  UsersEffects,
            //  SitesEffects,
            //  SiteGroupEffects,
            //  MessagesEffects,
            //  NotifiablesEffects,
            //  LanguagesManagementEffects,
            //  PartiesEffects
         ]),
      StoreModule.forRoot(reducers, { metaReducers }),
      IgxNavigationDrawerModule,
      IgxNavbarModule,
      IgxLayoutModule,
      IgxRippleModule,
      IgxGridModule,
      IgxCheckboxModule,
      IgxInputGroupModule,
      IgxIconModule,
      IgxButtonModule,
      ReactiveFormsModule,
      IgxComboModule,
      IgxDatePickerModule,
      IgxTimePickerModule,
      IgxSelectModule,
      IgxDropDownModule,
      IgxToggleModule,
      TranslateModule.forRoot(),
      LanguageTranslationModule,
      NgxFlagIconCssModule,
      IgxBadgeModule,
      HttpClientModule,
      IgxToastModule,
      IgxSwitchModule,
      IgxTabsModule,
      OAuthModule
   ],
   providers: [
      RemoteFilteringService,
      PropertiesService,
      CategoriesService,
      RemoteValuesService,
      AuthGuard,
      {
         provide: APP_INITIALIZER,
         useFactory: appInitializerFactory,
         deps: [Injector],
         multi: true
      },
      {
         provide: LOCALE_ID,
         useValue: 'pt-PT'
         // useValue: 'es-US'
      },
      {
         provide: HTTP_INTERCEPTORS,
         useClass: BasicAuthInterceptor,
         multi: true
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {
}
