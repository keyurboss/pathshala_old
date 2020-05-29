import { Injectable } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
@Injectable({
  providedIn: 'root',
})
export class FirebaseServicesService {
  public analytics: AngularFireAnalytics;
  constructor(private anaylyticas: AngularFireAnalytics) {
    this.analytics = anaylyticas;
  }
}
