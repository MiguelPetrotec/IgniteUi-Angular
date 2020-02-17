import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  private BASE_URL = environment.apiGatewayUrl + '/api/v1/regions';

  constructor(private http: HttpClient, private store: Store<AppState>) { }


  getRegions(): Observable<any> {

    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    });

    const url = `${this.BASE_URL}/translated`;
    return this.http.get(url, { headers });

  }

}
