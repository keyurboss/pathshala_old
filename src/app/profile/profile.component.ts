import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileDetails={
    "Gender":"Male",
    "Mobile No.":"9428393489",
    "Alternate No.":"7016879936",
    "D.O.B" : "16/12/1997",
    "City":"Ahmedabad",
    "Email ID":"keyurshah3939@gmail.com"
  };
  profileDetailsKeys;
  constructor() { 
  }
  ngOnInit(): void {
    this.profileDetailsKeys = Object.keys(this.profileDetails);
  }

}
