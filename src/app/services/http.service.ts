import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Variables } from '../variables';
import { rejects } from 'assert';
import { StateService } from '@uirouter/core';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl;
  private loginUrl;
  constructor(private variabbles: Variables, private httpclient: HttpClient,private state:StateService) {
    this.apiUrl = variabbles.getApiUrl();
    this.loginUrl = variabbles.getLoginUrl();
  }
  private http(url, params = {}) {
    return this.httpclient.post(url, params);
  }
  getApiHttp(url:String, params = {}):Promise<any> {
    return new Promise((resolve, reject) => {
      this.http(this.apiUrl+url, params).subscribe(
        (response) => {
          resolve(response);
        },
        (err: HttpErrorResponse) => {
          if (err.status == 403 || err.status == 401) {
            this.refreshToken().then(()=>{
              this.getApiHttp(url,params).then(resolve).catch(reject);
            }).catch(reject);
          }
        }
      );
    });
  }
  getLoginHttp(url:String, params = {}):Promise<any> {
    return new Promise((resolve, reject) => {
      this.http(this.loginUrl+url, params).subscribe(resolve,reject);
    });
  }
  refreshToken():Promise<any> {
    return new Promise((resolve, reject) => {
      let a = localStorage.getItem('refreshToken');
      if(a && a !== null && typeof a !== 'undefined'){
        this.getLoginHttp('/refreshaceesstoken',{token:a}).then((data:any)=>{
          if(data.success && data.success == 1 && data.data.accessToken){
            localStorage.setItem('accessToken',data.data.accessToken);
            delete data.data.accessToken;
            localStorage.setItem('user',JSON.stringify(data.data));
            resolve();
          }else{
            ////GOTO LOgin Page
            // this.state.go()
          }
        }).catch(()=>{
             ////GOTO LOgin Page
            // this.state.go()
            reject();
        });
      }else{
        reject();
      }
    });
  }
}
