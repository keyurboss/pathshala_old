import {
  UIRouterModule,
  UIRouter,
  Transition,
  StateService,
} from '@uirouter/angular';
import { LostPagesComponent } from './lost-pages/lost-pages.component';
import { TabsComponent } from './tabs/tabs.component';
import { Injector } from '@angular/core';
import { BasicFunctionsService } from './services/basic-functions.service';
import { logincheck } from './resolveFun';
import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';
const state = [
  {
    name: 'home',
    url: '/home',
    component: TabsComponent,
    resolve: [
      {
        token: 'person',
        deps: [Transition, StateService, BasicFunctionsService],
        resolveFn: logincheck,
      },
    ],
  },
  {
    name: '404',
    url: '/lostPgae',
    component: LostPagesComponent,
    resolve: [
      {
        token: 'person',
        deps: [Transition, StateService, BasicFunctionsService],
        resolveFn: (traL:Transition)=>{
          console.log(traL.from());
          console.log(traL.to());
          console.log(traL);
          return true;
        },
      },
    ]
  },
  {
    name: 'login',
    url: '/login',
    component: LoginComponent,
  },
];
const defaultConfigFun = function (router: UIRouter, injector: Injector) {
  router.urlService.rules.initial({ state: 'home' });
  router.urlService.rules.otherwise({ state: '404' });
};
export const Routes = UIRouterModule.forRoot({
  states: state,
  useHash: true,
  config: defaultConfigFun,
});
