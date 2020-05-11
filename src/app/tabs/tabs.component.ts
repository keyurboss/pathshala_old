import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  tab_num = 3;
  selected = 2;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  constructor() { }

  ngOnInit(): void {
  }
  swipe(eType){
    console.log(eType);
    if(eType === this.SWIPE_ACTION.LEFT && this.selected > 0){
      this.selected--;
    }
    else if(eType === this.SWIPE_ACTION.RIGHT && this.selected < this.tab_num){
      this.selected++;
    }
  }
}
