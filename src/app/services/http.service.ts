import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Variables} from '../variables';
import { rejects } from 'assert';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl; 
  constructor(private variabbles : Variables,private httpclient : HttpClient) { 
    this.apiUrl = variabbles.getApiUrl();
  }
  private http(url,params={}){
    return this.httpclient.post(url,params);
  }
  getApiHttp(url,params={}){
    return new Promise((resolve,reject)=>{
      this.http(url,params).subscribe(()=>{
        
      },()=>{
        
      });
    });
  }

}
