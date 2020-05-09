import { Injectable } from '@angular/core';
import { Variables } from '../variables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from './http.service';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BasicFunctionsService {
  area = 'asdasd';
  private appVariables: Variables;
  constructor(private http: HttpService, private window: Window) {
    this.appVariables = new Variables();
    this.window['demo'] = this;
  }
  isLogin() {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('accessToken');
      let refreshToken = localStorage.getItem('refreshToken');
      if (
        (token && token !== null) ||
        (refreshToken && refreshToken !== null)
      ) {
        this.http
          .getApiHttp('/islogin')
          .then((data: any) => {
            if (data.success == 1) {
              resolve();
            } else {
              reject();
            }
          })
          .catch(reject);
      } else {
        reject();
      }
    });
  }
  getUserDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .getApiHttp('/mydetails')
        .then((data) => {
          let dob = new Date(Number(data.data.dob)*1000);
          let b = {
            'Gender' : data.data.gender,
            "Mobile No." : data.data.mobile_no,
            "D.O.B" : dob.getDate()+'/'+dob.getMonth()+'/'+dob.getFullYear(),
            'City':data.data.city
          };
          let extraData = JSON.parse(data.data.user_data);
          if(extraData.alternate_no){
            b['Alternate No.'] = extraData.alternate_no;
          }
          if(extraData.email){
            b['Email ID'] = extraData.email;
          }
          b['extra'] = extraData;
          b['extra']['sangh_name'] = data.data.sangh_name;
          resolve(b);
        })
        .catch(reject);
    });
  }
  
}
