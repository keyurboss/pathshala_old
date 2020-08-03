import { Component, OnInit } from '@angular/core';
import { BasicFunctionsService } from '../services/basic-functions.service';
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
        type?: boolean;
      };
  order_by?: true | 'desc';
  fetch_to_display?: boolean;
}
export interface TableOfpoints {
  approved: number;
  rejected: number;
  total: number;
  point?: number;
  sutra?: number;
  kavya?: number;
  week?: number;
  daily?: number;
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
    group_by: {
      type: true,
    },
    order_by: 'desc',
  };
  dataLoaded = false;
  format = '';
  header = '';
  // tslint:disable-next-line: variable-name
  get_allData: {
    user_id?: number;
    point?: number;
    sutra?: number;
    kavya?: number;
    week?: number;
    daily?: number;
    timestamp?: number;
  } = {
    daily: 0,
    week: 0,
    kavya: 0,
    point: 0,
    sutra: 0,
  };
  // tslint:disable-next-line: variable-name
  user_details: any = {};
  constructor(private http: HttpService, private basic: BasicFunctionsService) {
    this.init();
    this.selectedbutton = '';
  }
  async init() {
    this.isloading = true;
    if (this.basic.userDetails) {
      this.user_details = this.basic.userDetails;
    } else {
      await this.basic.getUserDetails().then((c) => (this.user_details = c));
    }
    await this.getData({
      stream: 1,
      limit: 1,
      group_by: {
        type: true,
      },
    }).then((a) => (a.length > 0 ? (this.get_allData = a[0]) : ''));
    this.dataLoaded = true;
    this.isloading = false;
  }
  ngOnInit(): void {}
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
      type: true,
    };
    this.tableData = [];
    this.streambroken = false;
    this.FetchAndProcessData();
  }
  private FetchAndProcessData() {
    this.isloading = true;
    this.getData(this.reqData).then((d) => {
      if (d.length < this.reqData.limit) {
        this.streambroken = true;
      }
      this.proceessData(d);
    });
  }
  private proceessData(data: FetchReponse[]) {
    // const tempData: TableOfpoints[] = data.map((c) => {
    //   return {
    //     approved: c.approved,
    //     timestamp: c.timestamp * 1000,
    //     rejected: c.rejected,
    //     total: c.approved + c.rejected,
    //   };
    // });
    this.tableData = this.tableData.concat(data as any);
    this.isloading = false;
  }
  viewMore() {
    this.reqData.stream++;
    this.FetchAndProcessData();
  }
  private getData(data: FetchpointRequestInterFace): Promise<any[]> {
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
