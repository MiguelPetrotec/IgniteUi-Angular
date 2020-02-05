import { Component, OnInit, ViewChild } from '@angular/core';
import {
    IgxDropDownComponent, IgxInputGroupComponent, ConnectedPositioningStrategy
} from 'igniteui-angular';
import { data } from './local-data';
import { TranslateService } from '@ngx-translate/core';
// import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})

export class DropDownComponent implements OnInit {
    @ViewChild(IgxDropDownComponent, { static: true }) public igxDropDown: IgxDropDownComponent;
    @ViewChild('inputGroup', { read: IgxInputGroupComponent, static: true }) public inputGroup: IgxInputGroupComponent;

    public items: any[] = [];
    public languages: Array<{ label: string, value: { label: string, code: string } }>;
    public selectedLanguage: any;

    constructor(private translate: TranslateService) {

    //     this.languages = [
    //         { label: 'pt', value: { label: 'Languages.Portuguese', code: 'pt' } },
    //         { label: 'en', value: { label: 'Languages.English', code: 'en' } },
    //         { label: 'es', value: { label: 'Languages.Spanish', code: 'es' } },
    //         { label: 'dev', value: { label: 'Languages.Dev', code: 'dev' } }
    //     ];
    }

    checkLangChange() {
        console.dir(this.selectedLanguage);
        if (this.selectedLanguage && this.selectedLanguage.code !== this.igxDropDown.selectedItem.value.code) {
            this.selectedLanguage = this.igxDropDown.selectedItem.value;
            this.changeLang();
        }
    }

    changeLang() {

        if (this.selectedLanguage.code as any !== 'dev') {
            this.translate.reloadLang(this.selectedLanguage.code as any);
        } else {
            this.languages.forEach(lang => {
                if (lang.value.code !== 'dev') {
                    this.translate.resetLang(lang.value.code);
                }
            });
            this.translate.reloadLang(this.selectedLanguage.code as any);
        }
        this.translate.use(this.selectedLanguage.code as any);
    }

    public ngOnInit() {

        this.languages = [
            { label: 'pt', value: { label: 'Portuguese', code: 'pt' } },
            { label: 'en', value: { label: 'English', code: 'en' } },
            { label: 'es', value: { label: 'Spanish', code: 'es' } },
            { label: 'dev', value: { label: 'Dev', code: 'dev' } }
        ];
        this.items = data;
        this.igxDropDown.width = '400px';

        // console.dir(this.translate.currentLang);
        const languages = this.languages.filter(lang => lang.label === this.translate.currentLang);
        // const languages = this.languages.filter(lang => lang.label === 'pt');
        this.selectedLanguage = languages && languages.length > 0 ? languages[0].value : [];
    }

    public openDropDown() {
        if (this.igxDropDown.collapsed) {
            this.igxDropDown.open({
                modal: false,
                positionStrategy: new ConnectedPositioningStrategy({
                    target: this.inputGroup.element.nativeElement
                })
            });
        }
    }
}
