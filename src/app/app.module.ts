import {
  BrowserModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
  HammerModule,
} from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './auth/httpIntercepter.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestureConfig } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileComponent } from './profile/profile.component';
import { LostPagesComponent } from './lost-pages/lost-pages.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Routes } from './app.route';
import { TabsComponent } from './tabs/tabs.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PointsOverViewComponent } from './points-over-view/points-over-view.component';
import { SubmitPointsComponent } from './submit-points/submit-points.component';
import { SubmitDialogComponent } from './submit-points/submit-dialogpopup.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule, AngularFireMessaging } from '@angular/fire/messaging'
import {PushServiceService} from './services/push-service.service';
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    // override hammerjs default configuration
    swipe: { direction: 6 },
    // touchAction:'auto'
  };
}
const firebaseConfig = {
  apiKey: "AIzaSyAYGFnYEXMrcDvICWHLcpSqeVYMfVilfc4",
  authDomain: "pathshala-9a06d.firebaseapp.com",
  databaseURL: "https://pathshala-9a06d.firebaseio.com",
  projectId: "pathshala-9a06d",
  storageBucket: "pathshala-9a06d.appspot.com",
  messagingSenderId: "1079147185431",
  appId: "1:1079147185431:web:defd50ffb1567becf5a352"
};
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    TabsComponent,
    LostPagesComponent,
    LoginComponent,
    PointsOverViewComponent,
    SubmitPointsComponent,
    SubmitDialogComponent,
  ],
  imports: [
    BrowserModule,
    HammerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Routes,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireMessagingModule,
    MatTabsModule,
    FormsModule,
    MatDividerModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatCardModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: Window, useValue: window },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: GestureConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private angularFireMessaging: AngularFireMessaging){
    this.angularFireMessaging.messages.subscribe((_messaging) => {
      console.log(_messaging);
    });
    console.log("executed");
    window['aa'] = angularFireMessaging;
  }
}
