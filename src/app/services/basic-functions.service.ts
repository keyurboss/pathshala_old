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
  constructor(private http : HttpClient,private window: Window,hhh :HttpService) {
    this.appVariables = new Variables();
    this.window['demo'] = this;
  }
  isLogin(){
    return new Promise((resolve,reject)=>{
      let token = localStorage.getItem('token');
      if(token && token !== null){
        this.http.get(this.appVariables.getApiUrl()+"/islogin")
                  .subscribe(console.log,console.log);
        // console.log(a);
      }else{
        // reject();
      }
    });
  }
}
