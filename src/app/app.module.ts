import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxNavigationDrawerModule, IgxNavbarModule, IgxLayoutModule, IgxRippleModule, IgxGridModule, IgxCheckboxModule, IgxInputGroupModule, IgxIconModule, IgxButtonModule, IgxComboModule, IgxDatePickerModule, IgxTimePickerModule, IgxSelectModule, IgxDropDownModule, IgxToggleModule } from 'igniteui-angular';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Grid1Component } from './grid1/grid1.component';
import { LoginComponent } from './login/login.component';
import { InputGroupComponent } from './inputgroup/inputgroup.component';
import { DropDownComponent } from './dropdown/dropdown.component';

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
    IgxToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
