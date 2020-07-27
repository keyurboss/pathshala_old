import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class Variables {
  private baseUrl;
  constructor() {
    let protocol = 'http:';
    let url = location.hostname;
    let port = '3000';
    if (environment.production) {
      port = '3030';
    }
    if (location.protocol === 'https:' && environment.production) {
      protocol = 'https:';
    }
    if (environment.production) {
      url = 'pathshalaserver.rpsoftech.net';
    }
    this.baseUrl = protocol + '//' + url + ':' + port;
    if (environment.production) {
      this.baseUrl = protocol + '//' + url;
    }
  }
  getBaseUrl(): string {
    return this.baseUrl;
  }
  getApiUrl(): string {
    return this.baseUrl + '/api';
  }
  getLoginUrl(): string {
    return this.baseUrl + '/loginserver';
  }
}
export class GlobalVariables {
  public static swal = Swal;
}
