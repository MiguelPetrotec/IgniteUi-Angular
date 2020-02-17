import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectComponent } from './language-select.component';
// import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgxFlagIconCssModule } from 'ngx-flag-icon-css';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    // DropdownModule,
    FormsModule,
    NgxFlagIconCssModule,
    TranslateModule
  ],
  exports: [LanguageSelectComponent],
  declarations: [LanguageSelectComponent]
})
export class LanguageSelectModule { }
