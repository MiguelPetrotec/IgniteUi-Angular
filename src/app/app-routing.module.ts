import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { ErrorRoutingModule } from './error-routing/error-routing.module';
import { Grid1Component } from './grid1/grid1.component';
import { LoginComponent } from './login/login.component';
import { InputGroupComponent } from './inputgroup/inputgroup.component';
import { DropDownComponent } from './dropdown/dropdown.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { text: 'Home' } },
  { path: 'error', component: UncaughtErrorComponent },
  { path: 'grid1', component: Grid1Component, data: { text: 'grid1' } },
  { path: 'login', component: LoginComponent, data: { text: 'login' } },
  { path: 'inputgroup', component: InputGroupComponent, data: { text: 'inputGroup' } },
  { path: 'dropdown', component: DropDownComponent, data: { text: 'dropDown' } },
  { path: 'reactiveform', component: ReactiveFormComponent, data: { text: 'reactive Form' } },
  { path: '**', component: PageNotFoundComponent } // must always be last
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ErrorRoutingModule],
  exports: [RouterModule, ErrorRoutingModule]
})
export class AppRoutingModule {
}
