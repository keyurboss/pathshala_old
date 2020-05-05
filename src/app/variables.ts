export class Variables {
    private baseUrl = 'http://localhost:3000';
    constructor(){  
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
