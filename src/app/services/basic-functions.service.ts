import { Injectable } from '@angular/core';
import {Variables} from '../variables';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BasicFunctionsService {
  area = "asdasd";
  private appVariables:Variables;
  constructor(private http : HttpClient,private window: Window) {
    this.appVariables = new Variables();
    this.window['demo'] = this;
  }
  isLogin(){
    console.log("method Callef");
    this.http.post("test",{});
  }
}
