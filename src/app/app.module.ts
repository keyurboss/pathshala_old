import {
  BrowserModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
  HammerModule,
} from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './auth/httpIntercepter.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PointsOverViewComponent } from './points-over-view/points-over-view.component';
import { SubmitPointsComponent } from './submit-points/submit-points.component';
import { SubmitDialogComponent } from './submit-points/submit-dialogpopup.component';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import 'firebase/messaging';

import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import {
  AngularFireAnalyticsModule,
  AngularFireAnalytics,
} from '@angular/fire/analytics';
import {
  AngularFirePerformanceModule,
  AngularFirePerformance,
} from '@angular/fire/performance';

import {
  AngularFireMessagingModule,
  AngularFireMessaging,
} from '@angular/fire/messaging';

import { StateService } from '@uirouter/core';
import { LoadingComponent } from './loading/loading.component';
@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    // override hammerjs default configuration
    swipe: { direction: 6 },
    // touchAction:'auto'
  };
}
const firebaseConfig: FirebaseAppConfig = {
  apiKey: 'AIzaSyAYGFnYEXMrcDvICWHLcpSqeVYMfVilfc4',
  authDomain: 'pathshala-9a06d.firebaseapp.com',
  databaseURL: 'https://pathshala-9a06d.firebaseio.com',
  projectId: 'pathshala-9a06d',
  storageBucket: 'pathshala-9a06d.appspot.com',
  messagingSenderId: '1079147185431',
  appId: '1:1079147185431:web:defd50ffb1567becf5a352',
  measurementId: 'G-NMX2YFM97C',
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
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    HammerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    Routes,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireMessagingModule,
    AngularFireAnalyticsModule,
    AngularFirePerformanceModule,
    MatTabsModule,
    FormsModule,
    MatDividerModule,
    MatRadioModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatCardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
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
      useClass: MyHammerConfig,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private state: StateService,
    private swUpdate: SwUpdate,
    private snackbar: MatSnackBar,
    private analytics: AngularFireAnalytics
  ) {
    // this.angularFireMessaging.messages.subscribe((_messaging) => {
    //   console.log(_messaging);
    // });
    this.initFirebase();
    this.initApp();
    this.Update();
  }
  initApp() {
    // window['aaaaa'] = this;
    this.state.defaultErrorHandler((error) => {
      if (environment.production === false) {
        console.log(error);
      }
    });
  }
  initFirebase() {
    this.angularFireMessaging
      .usePublicVapidKey(
        'BD6MvUZOOe62tjGvUJBcj3q06855aoh4P9FBGqP63jsuNmzMmp4amIjsGq1K3iTJvqm1P_rnTul3aBx-VH76YQw'
      )
      .then(() => {
        this.angularFireMessaging.getToken.subscribe(console.log, console.log);
      });
  }
  cachedAnalytics() {
    caches.open('analytics').then((ca) => {
      ca.keys().then((keys) => {
        keys.forEach((key) => {
          caches.match(key).then((res) => {
            res.json().then((d) => {
              this.analytics.logEvent(d.event, d.data);
              ca.delete(key);
            });
          });
        });
      });
    });
  }
  Update(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.swUpdate.available.subscribe((evt) => {
          const snack = this.snackbar.open('Update Available', 'Reload', {
            duration: 3000,
          });
          snack.onAction().subscribe(() => {
            snack.dismiss();
            // window.location.reload();
          });
        });
      });
    } else {
      console.log('not enabled');
    }
    // angularFireMessaging
    //   .usePublicVapidKey(
    //     'BD6MvUZOOe62tjGvUJBcj3q06855aoh4P9FBGqP63jsuNmzMmp4amIjsGq1K3iTJvqm1P_rnTul3aBx-VH76YQw'
    //   )
    //   .then(() => {
    //     // angularFireMessaging.getToken.subscribe(console.log);
    //   });
    // window['a'] = firebase.initializeApp(firebaseConfig);
    console.log('executed');
    // Firemessages.
    // window['aa'] = angularFireMessaging;
  }
}
