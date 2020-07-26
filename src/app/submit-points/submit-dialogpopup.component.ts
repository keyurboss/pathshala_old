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
  no_gatha: number;
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
  private selectedDate: Date;
  minDate: Date;
  maxDate: Date;
  gathatype: GathaTypeInter[] = [
    { value: 'new', viewValue: 'New' },
    { value: 'old', viewValue: 'Old' },
  ];
  gathaDetails: GathSubmit[] = [];
  constructor(
    private state: StateService,
    private http: HttpService,
    public dialogRef: MatDialogRef<SubmitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.minDate = new Date(1589241600000);
    this.maxDate = new Date();
    this.AddBlankGatha();
    this.selectedDate = this.date.value as Date;
    console.log(this.data.selected);
  }
  AddBlankGatha() {
    if (this.gathaDetails.length !== 0) {
      const a = this.gathaDetails[this.gathaDetails.length - 1];
      console.log(a);
      if (a.no_gatha === 0 || a.selectedGath === '') {
        this.swal.fire('Warning', 'Please Fill All the Details', 'warning');
        return;
      }
    }
    this.gathaDetails.push({
      no_gatha: 0,
      selectedGath: this.gathatype[0].value,
      description: '',
    });
  }
  async submit() {
    for (const value of this.gathaDetails) {
      if (value.no_gatha === 0 || value.selectedGath === '') {
        this.swal.fire('Warning', 'Please Fill All the Details', 'warning');
        return;
      }
    }

    const res = await this.http.getApiHttp('/submit', 'post', {
      day: this.selectedDate.getDate(),
      month: this.selectedDate.getMonth()+1,
      year: this.selectedDate.getFullYear(),
      point_type: this.data.selected,
      timestamp: Math.floor(this.selectedDate.getTime() / 1000),
      details: {
        gatha: this.gathaDetails,
      },
    });
    if (res.success && res.success === 1) {
      this.swal.fire('Points Submitted', '', 'success').then(() => {
        // this.dialogRef.close();
      });
    } else {
      this.swal.fire(
        'Error',
        'Request is submmited for selected date <br> Please select other date',
        'error'
      );
    }
  }
  dateChange() {
    this.selectedDate = this.date.value as Date;
    console.log({
      day: this.selectedDate.getDate(),
      month: this.selectedDate.getMonth(),
      year: this.selectedDate.getFullYear(),
    });
    console.log();
  }
}
