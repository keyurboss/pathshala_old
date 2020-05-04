import { UIRouterModule,UIRouter, Transition, StateService } from '@uirouter/angular';
import { LostPagesComponent } from './lost-pages/lost-pages.component';
import { TabsComponent } from './tabs/tabs.component';
import { Injector } from '@angular/core';
import {logincheck} from './resolveFun';
import { from } from 'rxjs';
const state = [
  {
    name: 'home',
    url: '/home',
	component: TabsComponent,
	resolve:[
		{
			token: "person",
			deps: [Transition,StateService],
			resolveFn: logincheck
		  }
	]
  },
  {
	  name:'404',
	  url:'lostPgae',
	  component: LostPagesComponent,
  }
];
const defaultConfigFun = function (router: UIRouter, injector: Injector){
	router.urlService.rules.initial({ state: "home" });
	router.urlService.rules.otherwise({state:"404"});
}
export const Routes = UIRouterModule.forRoot({ 
	states: state, 
	useHash: true,
	config:defaultConfigFun
});
