import { Transition, StateService } from '@uirouter/core';
import {BasicFunctionsService} from './services/basic-functions.service';
export function logincheck(transition : Transition,state:StateService , basic:BasicFunctionsService){
    basic.isLogin();
    return new Promise((resolve,reject)=>{
        resolve();
        // setTimeout(()=>{
        //     reject();
        //     state.go('404');
        // },5000);
    });
}