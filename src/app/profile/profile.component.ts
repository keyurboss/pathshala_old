import { Component, OnInit } from '@angular/core';
import {
  BasicFunctionsService,
  PointsDetailsInterface,
} from '../services/basic-functions.service';
interface points {
  [key: string]: PointsDetailsInterface;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileDetails: any = {};
  userExtraDetails = [];
  profileDetailsKeys = [];
  TaskList: points = {};
  isloading: boolean;
  constructor(private basicFunction: BasicFunctionsService) {
    this.init();
  }
  async init() {
    this.isloading = true;
    const profile = await this.basicFunction.getUserDetails();
    const g = Object.assign({}, profile);
    this.userExtraDetails = g.extra;
    this.profileDetails = g;
    this.profileDetailsKeys = Object.keys(this.profileDetails);
    if (this.profileDetailsKeys.indexOf('Name') > -1) {
      this.profileDetailsKeys.splice(
        this.profileDetailsKeys.indexOf('Name'),
        1
      );
    }
    if (this.profileDetailsKeys.indexOf('extra') > -1) {
      this.profileDetailsKeys.splice(
        this.profileDetailsKeys.indexOf('extra'),
        1
      );
    }
    this.TaskList = {};
    let tempPoints = [];
    if (this.basicFunction.PointsDetails.length === 0) {
      tempPoints = await this.basicFunction.getpointsbasicDetails();
    } else {
      tempPoints = this.basicFunction.PointsDetails;
    }
    tempPoints.forEach((i) => {
      this.TaskList[i.id] = i;
    });
    this.isloading = false;
  }
  ngOnInit(): void {}
}
