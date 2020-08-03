import { Component, OnInit } from '@angular/core';
import { BasicFunctionsService } from '../services/basic-functions.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileDetails;
  userExtraDetails = [];
  profileDetailsKeys = [];
  constructor(private basicFunction: BasicFunctionsService) {}
  ngOnInit(): void {
    this.basicFunction.getUserDetails().then((profile) => {
      const g = Object.assign({},profile);
      this.userExtraDetails = g.extra;
      delete g.extra;
      this.profileDetails = g;
      this.profileDetailsKeys = Object.keys(this.profileDetails);
      console.log('test');
    });
  }
}
