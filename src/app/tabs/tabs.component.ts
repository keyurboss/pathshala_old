import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from '../variables';
import { StateService } from '@uirouter/core';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  tab_num = 3;
  swal = GlobalVariables.swal;
  selected = 2;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  constructor(private state:StateService) {}

  ngOnInit(): void {}
  swipe(eType) {
    if (eType === this.SWIPE_ACTION.RIGHT && this.selected > 0) {
      this.selected--;
    } else if (
      eType === this.SWIPE_ACTION.LEFT &&
      this.selected < this.tab_num
    ) {
      this.selected++;
    }
  }
  logout() {
    this.swal.fire({
      title: 'Are you sure?',
      text: "You want to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Log out',
      cancelButtonText:"cancel"
    }).then((result)=>{
      localStorage.clear();
      setTimeout(()=>{
        location.replace(location.origin);
      },1000);
      if(result.value){
        this.swal.fire({
          icon: 'success',
          title: 'Logged Out',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
}
