import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
export interface FetchpointRequestInterFace {
  nolimit?: boolean;
  stream: number;
  limit: number;
  group_by?:
    | string
    | {
        month?: boolean;
        year?: boolean;
        status?: boolean;
        day?: boolean;
      };
  order_by?: true | 'desc';
}
export interface TableOfpoints {
  date: string | number;
  approved: number;
  rejected: number;
  total: number;
  timestamp: number;
}
export interface FetchReponse {
  points: number;
  status: number;
  day?: number;
  month?: number;
  year?: number;
  timestamp?: number;
}
@Component({
  selector: 'app-points-over-view',
  templateUrl: './points-over-view.component.html',
  styleUrls: ['./points-over-view.component.scss'],
})
export class PointsOverViewComponent implements OnInit {
  selectedbutton: string;
  isloading = false;
  tableData: TableOfpoints[] = [];
  reqData: FetchpointRequestInterFace = {
    stream: 1,
    limit: 5,
    group_by: {
      status: true,
    },
    order_by: 'desc',
  };
  header = '';
  constructor(private http: HttpService) {
    this.selectedbutton = '';
  }
  ngOnInit(): void {
    // this.getData({
    //   limit: 3,
    //   stream: 1,
    //   order_by: true,
    //   group_by: {
    //     month: true,
    //     status: true,
    //   },
    // }).then(console.log);
  }
  changeSelection(a: string) {
    this.selectedbutton = a;
    if (a === 'daily') {
      this.header = 'date';
    } else {
      this.header = a;
    }
    this.header = this.header.toUpperCase();
    this.reqData.stream = 1;
    this.reqData.group_by = {
      status: true,
      month: a === 'month' ? true : false,
      year: a === 'year' ? true : false,
      day: a === 'daily' ? true : false,
    };
    this.reqData.nolimit = true;
    this.getData(this.reqData).then((d) => this.proceessData(d));
  }
  private proceessData(data: FetchReponse[]) {
    let tempData = {};
    if (this.selectedbutton === 'daily') {
      data.forEach((c) => {
        if (tempData[c.day]) {
        } else {
        }
      });
    }
  }
  viewMore() {
    this.reqData.stream++;
  }
  private getData(data: FetchpointRequestInterFace): Promise<[]> {
    if (data.group_by) {
      data.group_by = JSON.stringify(data.group_by);
    }
    return this.http.getApiHttp('/mypoints', 'get', data).then((res) => {
      if (res && res.success === 1 && res.data) {
        return res.data;
      } else {
        return [];
      }
    });
  }
}
const monthtocall = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};
