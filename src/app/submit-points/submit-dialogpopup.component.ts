import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
interface GathaTypeInter {
  value: string;
  viewValue: string;
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
  date = new FormControl(new Date());
  minDate: Date;
  maxDate: Date;
  gathatype: GathaTypeInter[] = [
    { value: 'new', viewValue: 'New' },
    { value: 'old', viewValue: 'Old' },
  ];
  selectedGath = this.gathatype[0].value;
  foods: GathaTypeInter[] = [
    { value: 'new', viewValue: 'New' },
    { value: 'old', viewValue: 'Old' },
  ];

  selectedFood = this.foods[0].value;


  ngOnInit(): void {
    this.minDate = new Date(1589241600000);
    console.log(this.minDate);
    this.maxDate = new Date();
    // console.log(this.data, '   from Parent');
    // this.dialogRef.close({ sdfu: 'sdfsdfsfsfadfs' });
  }
}
