import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { ProfileComponent } from './profile/profile.component';
import {LostPagesComponent} from './lost-pages/lost-pages.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {Routes} from './app.route';
import { TabsComponent } from './tabs/tabs.component';
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    TabsComponent,
    LostPagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Routes,
    BrowserAnimationsModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatCardModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
