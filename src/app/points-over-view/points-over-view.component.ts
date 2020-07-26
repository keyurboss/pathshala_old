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
      };
  order_by?: true | 'desc';
}
@Component({
  selector: 'app-points-over-view',
  templateUrl: './points-over-view.component.html',
  styleUrls: ['./points-over-view.component.scss'],
})
export class PointsOverViewComponent implements OnInit {
  constructor(private http: HttpService) {}
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
