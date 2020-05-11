import { Injectable } from '@angular/core';
import { Variables } from '../variables';
import { HttpService } from './http.service';
import {VanillaFunctionsService} from './vanilla.service';
@Injectable({
  providedIn: 'root',
})
export class BasicFunctionsService {
  area = 'asdasd';
  private appVariables: Variables;
  constructor(private http: HttpService, private window: Window,private vanill:VanillaFunctionsService) {
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
          let dob = new Date(Number(data.data.dob) * 1000);
          let b = {
            Gender: data.data.gender,
            'Mobile No.': data.data.mobile_no,
            'D.O.B':
              dob.getDate() + '/' + dob.getMonth() + '/' + dob.getFullYear(),
            City: data.data.city,
          };
          let extraData = JSON.parse(data.data.user_data);
          if (extraData.alternate_no) {
            b['Alternate No.'] = extraData.alternate_no;
          }
          if (extraData.email) {
            b['Email ID'] = extraData.email;
          }
          if (data.data.unique_id) {
            extraData['unique_id'] = data.data.unique_id;
          }else{
            extraData['unique_id'] = false;
          }
          b['extra'] = extraData;
          b['extra']['sangh_name'] = data.data.sangh_name;
          resolve(b);
        })
        .catch(reject);
    });
  }
  login(userName:String,password:String): Promise<any>{
    return new Promise((resolve,reject)=>{
      let a = {
        "id":userName,
        "password":this.vanill.MD5(password)
      };
      this.http.getLoginHttp('/login',a).then((data)=>{
        if(data.success && data.success == 1 && data.data.accessToken){
          localStorage.setItem('accessToken',data.data.accessToken);
            delete data.data.accessToken;
            localStorage.setItem('refreshToken',data.data.refreshToken);
            delete data.data.refreshToken;
            localStorage.setItem('user',JSON.stringify(data.data));
            resolve();
        }else{
          reject();
        }
      }).catch(reject);
    });
  }
  clearhistoryGotoLink(url='',fullUrl=false){
    let locationToGO = location.origin + url;
    if(fullUrl){
      locationToGO = url;
    }
    setTimeout(()=>{
      console.log(locationToGO);
      location.replace(locationToGO);
    });
    let step = history.length -1;
    console.log(step);
    history.go(-step);
  }
}
