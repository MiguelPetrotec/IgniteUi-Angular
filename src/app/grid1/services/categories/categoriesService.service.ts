import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


// const DATA_URL = 'http://192.168.1.35:51024/api/v1/categories/elements?usageCode=CUSTOMER';
const DATA_URL = 'http://192.168.1.35:51024/api/v1/categories/elements';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public remoteData: BehaviorSubject<any[]>;


  constructor(private _http: HttpClient) {

    this.remoteData = new BehaviorSubject([]);
  }

  public getData(usageCode: string, cb?: (any) => void): any {

    const headers = new HttpHeaders({

      'Content-type': 'application/json',
      locale: 'pt-pt',
      entity_code: '1',
      rank_order: '1',
      // query: 'code=="00001"'
    });

    const baseQueryString = `${DATA_URL}?usageCode=${usageCode}`;

    return this._http.get(baseQueryString, { headers }).subscribe((data: any) => {
      // console.dir(data);
      this.remoteData.next(data.result.items);
      if (cb) {
        cb(data);
      }
    });
  }

}
