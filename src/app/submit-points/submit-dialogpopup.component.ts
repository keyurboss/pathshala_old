import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { StateService } from '@uirouter/core';
import { GlobalVariables } from '../variables';
import { HttpService } from '../services/http.service';
import {
  BasicFunctionsService,
  PointsDetailsInterface,
} from '../services/basic-functions.service';
interface GathaTypeInter {
  value: number;
  viewValue: string;
}
interface GathSubmit {
  selectedGath: string | number;
  no_gatha: number;
  description?: string;
}
// tslint:disable-next-line: class-name
interface pointsDetails {
  [key: string]: PointsDetailsInterface;
}
@Component({
  selector: 'app-submit-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-points.component.scss'],
})
export class SubmitDialogComponent implements OnInit, AfterViewInit {
  doneTask: boolean;
  swal = GlobalVariables.swal;
  pointsDetails: pointsDetails = {};
  date;
  private selectedDate: Date;
  minDate: Date;
  maxDate: Date;
  numberOfDays = 0;
  gathatype: GathaTypeInter[] = [
    { value: 1, viewValue: 'Sutra' },
    { value: 2, viewValue: 'Kavya' },
  ];
  gathaDetails: GathSubmit[] = [];
  dateFilter = (d: Date | null): boolean => {
    if (this.data.selected && this.data.selected === 3) {
      const day = (d || new Date()).getDay();
      // Prevent Saturday and Sunday from being selected.
      return day === 6;
    } else {
      return true;
    }
  };
  constructor(
    private http: HttpService,
    basic: BasicFunctionsService,
    public dialogRef: MatDialogRef<SubmitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const basicDetails = basic.BasicSiteDetails;
    console.log(basicDetails);
    if (basicDetails.min_timestamp) {
      this.minDate = new Date(Number(basicDetails.min_timestamp));
    }
    if (data.selected === 3) {
      this.date = new FormControl();
    } else {
      this.date = new FormControl(new Date());
    }
    basic.PointsDetails.forEach((i) => {
      this.pointsDetails[i.id] = i;
    });
  }
  ngAfterViewInit(): void {
    // this.date.disable({
    //   onlySelf: true,
    // });
  }
  ngOnInit(): void {
    if (typeof this.minDate === 'undefined') {
      this.minDate = new Date(1589241600000);
    }
    this.maxDate = new Date();
    this.AddBlankGatha();
    if (this.data.selected !== 3) {
      this.selectedDate = this.date.value as Date;
    }
    console.log(this.data.selected);
  }
  async TaskPointSubmition() {
    if (this.data.selected === 4) {
      this.SubmitDailyTaskPoint();
    } else if (this.data.selected === 3) {
      this.WeeklyTaskSubmit();
    }
  }
  private async WeeklyTaskSubmit() {
    if (!this.selectedDate) {
      this.swal.fire('Please Select Date', '', 'warning');
    } else if (this.numberOfDays === 0) {
      this.swal.fire(
        'Please Select Number Days You Have Done Task',
        '',
        'warning'
      );
    } else {
      const res = await this.SubmitData(
        {
          done: true,
          day: this.numberOfDays,
        },
        3
      );
      if (res.success && res.success === 1) {
        this.swal
          .fire('Daily Task Points Submitted', '', 'success')
          .then(() => {
            this.dialogRef.close();
          });
      } else {
        this.swal.fire(
          'Error',
          'Request is submmited for selected date <br> Please select other date',
          'error'
        );
      }
    }
  }
  private async SubmitDailyTaskPoint() {
    const res = await this.SubmitData(
      {
        done: this.doneTask,
      },
      4
    );
    if (res.success && res.success === 1) {
      this.swal.fire('Daily Task Points Submitted', '', 'success').then(() => {
        this.dialogRef.close();
      });
    } else {
      this.swal.fire(
        'Error',
        'Request is submmited for selected date <br> Please select other date',
        'error'
      );
    }
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
    let res: any = {};
    if (this.data.selected === 1) {
      const sutra = this.gathaDetails.filter((c) => c.selectedGath === 1);
      if (sutra.length > 0) {
        res = await this.SubmitData(sutra, 1);
      }
      const kavya = this.gathaDetails.filter((c) => c.selectedGath === 2);
      if (kavya.length > 0) {
        res = await this.SubmitData(kavya, 2);
      }
    }
    if (res.success && res.success === 1) {
      this.swal.fire('Gatha Points Submitted', '', 'success').then(() => {
        this.dialogRef.close();
      });
    } else {
      this.swal.fire(
        'Error',
        'Request is submmited for selected date <br> Please select other date',
        'error'
      );
    }
  }
  SubmitData(data, type) {
    return this.http.getApiHttp('/submit', 'post', {
      day: this.selectedDate.getDate(),
      month: this.selectedDate.getMonth() + 1,
      year: this.selectedDate.getFullYear(),
      point_type: type,
      timestamp: Math.floor(this.selectedDate.getTime() / 1000),
      details: data,
    });
  }
  dateChange() {
    this.selectedDate = this.date.value as Date;
  }
}
