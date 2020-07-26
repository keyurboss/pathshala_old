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
    if (location.protocol === 'https:' && environment.production) {
      protocol = 'https:';
      port = '3443';
    }
    if (environment.production) {
      url = 'server.rpsoftech.xyz';
      port = '3030';
    }
    this.baseUrl = protocol + '//' + url + ':' + port;
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
