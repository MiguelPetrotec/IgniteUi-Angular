import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import {
  IgxButtonModule, IgxCheckboxModule, IgxComboModule, IgxDatePickerModule, IgxBadgeModule, IgxToastModule,
  IgxDropDownModule, IgxGridModule, IgxIconModule, IgxInputGroupModule, IgxLayoutModule,
  IgxNavbarModule, IgxNavigationDrawerModule, IgxRippleModule, IgxSelectModule, IgxTimePickerModule, IgxToggleModule
} from 'igniteui-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropDownComponent } from './dropdown/dropdown.component';
import { Grid1Component } from './grid1/grid1.component';
import { HomeComponent } from './home/home.component';
import { InputGroupComponent } from './inputgroup/inputgroup.component';
import { LanguageTranslationModule } from './language-translation/language-translation.module';
import { LoginComponent } from './login/login.component';
import { NgxFlagIconCssModule } from 'ngx-flag-icon-css';
import { registerLocaleData } from '@angular/common';
import localePtPt from '@angular/common/locales/pt-PT';
import { RemoteFilteringService } from './grid1/services/remoteFilteringService';
import { HttpClientModule } from '@angular/common/http';



registerLocaleData(localePtPt);

@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    Grid1Component,
    LoginComponent,
    InputGroupComponent,
    DropDownComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
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
    IgxToastModule
  ],
  providers: [RemoteFilteringService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
