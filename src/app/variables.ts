import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class Variables {
    
    private baseUrl;
    constructor(){  
        let protocol = 'http:'
        let url = 'localhost';
        let port = '3030';
        if (location.protocol === 'https:') {
            protocol='https:';
            port='3443';
        }
        if(environment.production){
            url = "server.rpsoftech.xyz";
        }
        this.baseUrl = protocol+'//'+url+':'+port;
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
