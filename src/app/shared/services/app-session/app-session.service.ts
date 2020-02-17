import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfig } from 'src/app/models/app-config/app-configDto';
import { environment } from 'src/environments/environment';
import { catchError, tap, filter, distinctUntilChanged, mergeMap, first, map } from 'rxjs/operators';
import * as MessagesActionTypes from '../../../store/actions/messages/message.actions';
import { of, Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSessionService {
  // private _logo: any;
  // private _topNavColor: any;
  // private _sideNavColor: any;
  // private _backgroundColor: any;
  // private _appName: string;
  // private _isWhiteLabelInstance: boolean;
  // private _config: any;

  private _configuration: AppConfig;

  private BASE_URL = environment.apiGatewayUrl + '/api/v1';

  constructor(private http: HttpClient) {

    // this._logo = "url('http://www.galpenergia.com/Style%20Library/Images/twitter_share.jpg')";
    // this._topNavColor = 'blue';
  }

  // get logo() {
  //   return this._logo;
  // }

  // get topNavColor() {
  //   return this._topNavColor;
  // }

  get appName(): string {
    if (this._configuration) {
      return this._configuration.appName;
    }
  }


  ngOnInit() {
    console.log('App Session Service Init');
    // this._logo = "url('http://www.galpenergia.com/Style%20Library/Images/twitter_share.jpg')";
    // this._topNavColor = 'blue';

    // this.getConfig().subscribe((res) => {

    //   console.dir(res);
    // });

    this._configuration = this.getConfig();

    this.applyConfig();

  }

  getConfig() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    const url = `${this.BASE_URL}/appConfig`;

    return <AppConfig>{

      id: 1,
      logo: 'assets/images/galplogo.png',
      appName: 'Alarmistica',
      topNavColor: '#222',
      sideNavColor: '#222',
      backgroundColor: '#222',
      isWhiteLabelInstance: true
    };

    // return this.http.get(url, { headers }).pipe(
    //   tap(res => {
    //     return res;
    //   }),
    //   catchError(error => {
    //     return of(MessagesActionTypes.setMessage(
    //       {
    //         appMessage:
    //           { message: error ? (error.error ? error.message : error) : error, owner: 'App-Session', severity: 'error', timestamp: new Date().getTime() }
    //       }
    //     ))
    //   })
    // );
  }

  applyConfig() {

    // let opt2: string = "assets/images/galplogo.png";
    // let fullpath: string = "http://www.galpenergia.com/Style%20Library/Images/twitter_share.jpg";
    // let url = "url('" + fullpath + "')";
    if (this._configuration) {
      let url = "url('" + this._configuration.logo + "')";
      this._configuration.logo = url;//"url('"+ this._configuration.logo + "')";
      // console.log(this._configuration.logo);
      Object.keys(this._configuration).forEach(k => {

        if (typeof (this._configuration)[k] === 'string') {
          document.documentElement.style.setProperty('--' + k, this._configuration[k]);
        }

      });
    }
    // document.documentElement.style.setProperty('--url', this.logo);
    // document.documentElement.style.setProperty('--first-color', this.topNavColor);


    // let prefix: string = "/assets/images/";
    // let img = "grupo-petrotec-logo5.png";
    // let img: string = "galplogo.png";
    // let fullpath : string = "http://www.galpenergia.com/Style%20Library/Images/twitter_share.jpg";
    // let url = "url('"+ fullpath + "')";
    // let url = "url('"+ fullpath + "')";
    // console.dir(url);
    // document.documentElement.style.setProperty('--url', url);
    // document.documentElement.style.setProperty('--first-color', 'pink');

  }
}
