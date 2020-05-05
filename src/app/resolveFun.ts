import { Transition, StateService } from '@uirouter/core';
import {BasicFunctionsService} from './services/basic-functions.service';
export function logincheck(transition : Transition,state:StateService , basic:BasicFunctionsService){
    console.log("executed   ",basic.area);
    console.log(basic);
    basic.isLogin();
    return new Promise((resolve,reject)=>{
        resolve();
        // setTimeout(()=>{
        //     reject();
        //     state.go('404');
        // },5000);
    });
}