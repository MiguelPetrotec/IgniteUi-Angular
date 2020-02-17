import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable, of, merge, concat, EMPTY, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import * as _ from 'lodash';
import { DictionariesService } from '../shared/services/languages/dictionaries-service.service';
import { DictionaryTranslatedDTO } from '../models/languages-management/dictionaryTranslatedDTO';

@Injectable()
export class languageLoader implements TranslateLoader {

    namespaces: string[] = ['ABC'];

    constructor(private inej: Injector, private dictionaryService: DictionariesService) { }

    getTranslation(lang: string): Observable<any> {
        let http = this.inej.get(HttpClient);
        let localData: any;
        let translationSubject: ReplaySubject<any> = new ReplaySubject();
        // Call to obtain dictionary values

        if (lang === 'dev') {


            // this.languages = [
            //     {label: 'pt', value:{label: 'Languages.Portuguese', code: 'pt'}},
            //     {label: 'en', value:{label: 'Languages.English', code: 'en'}},
            //     {label: 'es', value:{label: 'Languages.Spanish', code: 'es'}},
            //     {label: 'dev', value:{label: 'Languages.Dev', code: 'dev'}}

            // ];



            return http.get(`./assets/i18n/${lang}.json`);
        }

        http.get(`./assets/i18n/${lang}.json`).subscribe(response => {

            if (response != null) {

                localData = response;
                this.dictionaryService.getNamespacesDictionary(this.namespaces, lang).subscribe(

                    result => {

                        if (result) {

                            let loadedData = this.formatToJson(result.result.items);

                            localData = _.merge(localData, loadedData);
                        }
                        translationSubject.next(localData);
                        translationSubject.complete();
                    },
                    error => {
                        console.log('failed loading');
                        translationSubject.next(localData);
                        translationSubject.complete();
                    }
                );
            } else {
                translationSubject.next({});
                translationSubject.complete();
            }
        },
            error => {
                console.log('failed local file');
            });

        return translationSubject.asObservable();
    }


    private formatToJson(elements: DictionaryTranslatedDTO[]): any {

        let result = {};
        if (elements && elements.length > 0) {

            elements.forEach(elem => {

                let key: string = elem.dictionaryKey;
                let value: string = elem.value;

                let keyParts = key.split('.');

                this.parseKey(result, keyParts, value);
            });
        }

        return result;
    }

    private parseKey(parent: any, keys: string[], value: string) {
        var propertyName: string = keys[0];
        if (keys.length == 0) {
            return value;
        } else {
            keys.shift();
            parent[propertyName] = this.parseKey((parent[propertyName] ? parent[propertyName] : {}), keys, value);
        }
        return parent;
    };
}