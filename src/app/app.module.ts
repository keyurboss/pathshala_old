import { BrowserModule,HammerGestureConfig, HAMMER_GESTURE_CONFIG, HammerModule} from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './auth/httpIntercepter.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileComponent } from './profile/profile.component';
import { LostPagesComponent } from './lost-pages/lost-pages.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Routes } from './app.route';
import { TabsComponent } from './tabs/tabs.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import * as Hammer from 'hammerjs';
import { PointsOverViewComponent } from './points-over-view/points-over-view.component';
export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      // override hammerjs default configuration
      swipe: { direction: Hammer.DIRECTION_ALL  },
      // touchAction:'auto'
  }
}
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    TabsComponent,
    LostPagesComponent,
    LoginComponent,
    PointsOverViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Routes,
    HammerModule,
    MatTabsModule,
    FormsModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatCardModule,
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
      useClass: MyHammerConfig 
  },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

