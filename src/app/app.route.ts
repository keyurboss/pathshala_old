import { UIRouterModule,UIRouter } from '@uirouter/angular';
import { LostPagesComponent } from './lost-pages/lost-pages.component';
import { TabsComponent } from './tabs/tabs.component';
import { Injector } from '@angular/core';
const state = [
  {
    name: 'home',
    url: '/home',
    component: TabsComponent,
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
