import { Transition, StateService } from '@uirouter/core';

export function logincheck(transition : Transition,state:StateService){
    console.log("executed");
    console.log(transition);
    return new Promise((resolve,reject)=>{
        resolve();
        // setTimeout(()=>{
        //     reject();
        //     state.go('404');
        // },5000);
    });
}