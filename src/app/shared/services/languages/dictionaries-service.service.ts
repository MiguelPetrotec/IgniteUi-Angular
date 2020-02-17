import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from 'src/app/models/common/baseResponse';
import { PageResponse } from 'src/app/models/common/pageResponse';
import { IDictionaryKeyEntryDTO, DictionaryKeyEntryDTO } from 'src/app/models/languages-management/dictionary-key-entry-dto';
import { PaginationRequest } from 'src/app/models/common/paginationRequest';
import { DictionaryTranslatedDTO } from 'src/app/models/languages-management/dictionaryTranslatedDTO';

@Injectable({ providedIn: 'root' })
export class DictionariesService {
    private BASE_URL = environment.apiGatewayUrl + '/api/v1/dictionaries';

    constructor(private httpClient: HttpClient) { }

    getLanguages(pageReq: PaginationRequest): Observable<BaseResponse<PageResponse<IDictionaryKeyEntryDTO>>> {
        const headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8' });
        let params = new HttpParams();

        if (pageReq) {
            pageReq.offset ? params = params.append('offset', pageReq.offset.toString()) : null;
            pageReq.realSize ? params = params.append('realSize', pageReq.realSize.toString()) : null;
            pageReq.limit ? params = params.append('limit', pageReq.limit.toString()) : null;
            pageReq.query ? params = params.append('query', pageReq.query) : null;
            pageReq.sort ? params = params.append('sort', pageReq.sort) : null;
        }

        const url = `${this.BASE_URL}/management`;
        return this.httpClient.get<BaseResponse<PageResponse<IDictionaryKeyEntryDTO>>>(url, { headers, params });
    }

    addKey(key: DictionaryKeyEntryDTO): Observable<BaseResponse<IDictionaryKeyEntryDTO>> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.BASE_URL}/management`;
        const data = JSON.stringify(key);
        return this.httpClient.post<BaseResponse<IDictionaryKeyEntryDTO>>(url, data, { headers });
    }

    editKey(origKey: DictionaryKeyEntryDTO, key: DictionaryKeyEntryDTO): Observable<BaseResponse<IDictionaryKeyEntryDTO>> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        let params = new HttpParams().set('namespace', origKey.namespace).set('dictionaryKey', origKey.dictionaryKey);

        const url = `${this.BASE_URL}/management`;
        const data = JSON.stringify(key);
        return this.httpClient.put<BaseResponse<IDictionaryKeyEntryDTO>>(url, data, { headers, params });
    }

    deleteKey(key: DictionaryKeyEntryDTO): Observable<BaseResponse<void>> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const params = new HttpParams()
            .set('namespace', key.namespace)
            .set('dictionaryKey', key.dictionaryKey);

        const url = `${this.BASE_URL}/management`;
        return this.httpClient.delete<BaseResponse<void>>(url, { headers, params });
    }

    getNamespacesDictionary(namespace: string[], lang: string): Observable<BaseResponse<PageResponse<DictionaryTranslatedDTO>>>{
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('locale', (lang+'-'+lang));
        let params = new HttpParams();

        namespace.forEach(name =>{
            params = params.append('namespace', name);
        });

        const url = `${this.BASE_URL}`;
        return this.httpClient.get<BaseResponse<PageResponse<DictionaryTranslatedDTO>>>(url, { headers, params });

    }
}