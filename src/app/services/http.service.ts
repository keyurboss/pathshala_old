import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Variables } from '../variables';
import { rejects } from 'assert';
import { StateService } from '@uirouter/core';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl;
  private loginUrl;
  constructor(
    private variabbles: Variables,
    private httpclient: HttpClient,
    private state: StateService
  ) {
    this.apiUrl = variabbles.getApiUrl();
    this.loginUrl = variabbles.getLoginUrl();
  }
  private http(url, type: 'get' | 'post', params = {}) {
    if (type === 'get') {
      return this.httpclient.get(url, params);
    } else {
      return this.httpclient.post(url, params);
    }
  }
  getApiHttp(url: string, type: 'get' | 'post', params = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http(this.apiUrl + url, type, params).subscribe(
        (response) => {
          resolve(response);
        },
        (err: HttpErrorResponse) => {
          if (err.status === 403 || err.status === 401) {
            this.refreshToken()
              .then(() => {
                this.getApiHttp(url, type, params).then(resolve).catch(reject);
              })
              .catch(reject);
          }
        }
      );
    });
  }
  getLoginHttp(url: string, type: 'get' | 'post', params = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http(this.loginUrl + url, type, params).subscribe(resolve, reject);
    });
  }
  refreshToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      const a = localStorage.getItem('refreshToken');
      if (a && a !== null && typeof a !== 'undefined') {
        this.getLoginHttp('/refreshaceesstoken', 'get', { token: a })
          .then((data: any) => {
            if (data.success && data.success === 1 && data.data.accessToken) {
              localStorage.setItem('accessToken', data.data.accessToken);
              delete data.data.accessToken;
              localStorage.setItem('user', JSON.stringify(data.data));
              resolve();
            } else {
              //// GOTO LOgin Page
              this.state.go('login');
              reject();
            }
          })
          .catch(() => {
            //// GOTO LOgin Page
            this.state.go('login');
            reject();
          });
      } else {
        reject();
      }
    });
  }
}
