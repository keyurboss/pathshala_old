import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import {GlobalVariables} from '../variables';
import { BasicFunctionsService } from '../services/basic-functions.service';
@Component({
  selector: 'app-submit-points',
  templateUrl: './submit-points.component.html',
  styleUrls: ['./submit-points.component.scss']
})
export class SubmitPointsComponent implements OnInit {

  constructor(private state:StateService,private basic:BasicFunctionsService) { }
  selected: string | boolean = false;
  types: string[] = ['Gatha','Daily','Weekly'];
  swal = GlobalVariables.swal;
  ngOnInit(): void {
    
  }

  submitbuttonClicked(){
    if(this.selected !== false){
      this.basic.clearhistoryGotoLink();
    }else{
      this.swal.fire('Warning','Please Select Point Type','warning');
    }
  }
}
