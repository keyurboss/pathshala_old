import { Transition, StateService } from '@uirouter/core';
import { BasicFunctionsService } from './services/basic-functions.service';
export function logincheck(
  transition: Transition,
  state: StateService,
  basic: BasicFunctionsService
) {
  return new Promise((resolve, reject) => {
    basic
      .isLogin()
      .then(()=>{
          resolve();
      })
      .catch(() => {
        setTimeout(() => {
          reject();
          state.go('login');
        }, 100);
      });
  });
}
