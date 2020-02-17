import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {

  public selectedLanguage: any;
    public languages: any[];

    constructor(private translate: TranslateService) {
        this.languages = [
            {label: 'pt', value:{label: 'Languages.Portuguese', code: 'pt'}},
            {label: 'en', value:{label: 'Languages.English', code: 'en'}},
            {label: 'es', value:{label: 'Languages.Spanish', code: 'es'}},
            {label: 'dev', value:{label: 'Languages.Dev', code: 'dev'}}

        ];
    }

    ngOnInit() {
        let languages = this.languages.filter(lang => lang.label == this.translate.currentLang);
        // this.selectedLanguage = (this.languages.filter(lang => lang.label == this.translate.currentLang)[0]).value;
        this.selectedLanguage = languages && languages.length > 0 ? languages[0].value : [];
    }

    changeLang() {
        

        
        if(<any>this.selectedLanguage.code != 'dev'){
            this.translate.reloadLang(<any>this.selectedLanguage.code);
        }else{
            this.languages.forEach(lang =>{
                if(lang.value.code != 'dev'){
                    this.translate.resetLang(lang.value.code);
                }
            })
            this.translate.reloadLang(<any>this.selectedLanguage.code);
        }
        this.translate.use(<any>this.selectedLanguage.code);

        //TODO Moment js select locale should be here. Make moment injectable or a service like translate
        // moment.locale(this.selectedLanguage.value)
    }

}
