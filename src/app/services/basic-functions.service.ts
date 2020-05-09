import { Injectable } from '@angular/core';
import {Variables} from '../variables';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {HttpService} from  './http.service';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BasicFunctionsService {
  area = "asdasd";
  private appVariables:Variables;
  constructor(private http : HttpService,private window: Window) {
    this.appVariables = new Variables();
    this.window['demo'] = this;
  }
  isLogin(){
    return new Promise((resolve,reject)=>{
      let token = localStorage.getItem('accessToken');
      let refreshToken = localStorage.getItem('refreshToken');
      if((token && token !== null) || (refreshToken && refreshToken !== null)){
        this.http.getApiHttp('/islogin').then((data:any)=>{
          if(data.success == 1){
            resolve();
          }else{
            reject();
          }
        }).catch(reject);
      }else{
        reject();
      }
    });
  }
}
