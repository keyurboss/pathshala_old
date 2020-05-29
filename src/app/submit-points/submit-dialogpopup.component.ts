import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { StateService } from '@uirouter/core';
import { GlobalVariables } from '../variables';
import { HttpService } from '../services/http.service';
interface GathaTypeInter {
  value: string;
  viewValue: string;
}
interface GathSubmit {
  selectedGath: string;
  noGatha: number;
  description?: string;
}
@Component({
  selector: 'app-submit-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-points.component.scss'],
})
export class SubmitDialogComponent implements OnInit {
  // constructor(
  //   public dialogRef: MatDialogRef<SubmitDialogComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: {}
  // ) {}
  swal = GlobalVariables.swal;
  date = new FormControl(new Date());
  minDate: Date;
  maxDate: Date;
  gathatype: GathaTypeInter[] = [
    { value: 'new', viewValue: 'New' },
    { value: 'old', viewValue: 'Old' },
  ];
  gathaDetails: GathSubmit[] = [];
  constructor(private state: StateService, private http: HttpService) {}
  ngOnInit(): void {
    this.minDate = new Date(1589241600000);
    this.maxDate = new Date();
    this.AddBlankGatha();
  }
  AddBlankGatha() {
    if (this.gathaDetails.length !== 0) {
      const a = this.gathaDetails[this.gathaDetails.length - 1];
      console.log(a);
      if (a.noGatha === 0 || a.selectedGath === '') {
        this.swal.fire('Warning', 'Please Fill All the Details', 'warning');
        return;
      }
    }
    this.gathaDetails.push({
      noGatha: 0,
      selectedGath: this.gathatype[0].value,
      description: '',
    });
  }
  submit() {
    this.gathaDetails.forEach((value) => {
      if (value.noGatha === 0 || value.selectedGath === '') {
        this.swal.fire('Warning', 'Please Fill All the Details', 'warning');
        return;
      }
    });
  }
  dateChange() {
    const submitionDate = this.date.value as Date;
  }
}
