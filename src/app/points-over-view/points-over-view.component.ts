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
  fetch_to_display: boolean;
}
export interface TableOfpoints {
  approved: number;
  rejected: number;
  total: number;
  timestamp?: number;
}
export interface FetchReponse {
  points: number;
  status: number;
  approved: number;
  rejected: number;
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
  streambroken = false;
  reqData: FetchpointRequestInterFace = {
    stream: 1,
    limit: 3,
    fetch_to_display: true,
    order_by: 'desc',
  };
  format = '';
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
      this.format = 'd/M/yyyy';
    } else {
      this.header = a;
      if (a === 'month') {
        this.format = 'MMM';
      } else if (a === 'year') {
        this.format = 'yyyy';
      }
    }
    this.header = this.header.toUpperCase();
    this.reqData.stream = 1;
    this.reqData.group_by = {
      month: a === 'month' ? true : false,
      year: a === 'year' ? true : false,
      day: a === 'daily' ? true : false,
    };
    this.tableData = [];
    this.streambroken = false;
    this.FetchAndProcessData();
  }
  private FetchAndProcessData() {
    this.isloading = true;
    this.getData(this.reqData).then((d) => {
      if (d.length < this.reqData.limit) {
        console.log(d);
        this.streambroken = true;
      }
      this.proceessData(d);
    });
  }
  private proceessData(data: FetchReponse[]) {
    const tempData: TableOfpoints[] = data.map((c) => {
      return {
        approved: c.approved,
        timestamp: c.timestamp * 1000,
        rejected: c.rejected,
        total: c.approved + c.rejected,
      };
    });
    this.tableData = this.tableData.concat(tempData);
    this.isloading = false;
  }
  viewMore() {
    this.reqData.stream++;
    this.FetchAndProcessData();
  }
  private getData(data: FetchpointRequestInterFace): Promise<[]> {
    if (typeof data.group_by === 'object') {
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
