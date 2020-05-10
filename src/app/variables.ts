import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class Variables {
    private baseUrl = 'http://localhost:3030';
    constructor(){  
        if(environment.production){
            this.baseUrl = "http://server.rpsoftech.xyz:3030";
        }
    }
    getBaseUrl():String{
        return this.baseUrl;
    }
    getApiUrl():String{
        return this.baseUrl+"/api";
    }
    getLoginUrl():String{
        return this.baseUrl+"/loginserver";
    }
}
