import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import Swal from 'sweetalert2';
@Injectable({
    providedIn: 'root'
})
export class Variables {
    
    private baseUrl;
    constructor(){  
        let protocol = 'http:'
        let url = location.hostname;
        let port = '3030';
        if (location.protocol === 'https:' && environment.production) {
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
export class GlobalVariables {
    public static swal = Swal;
}