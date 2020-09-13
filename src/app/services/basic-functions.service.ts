import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { VanillaFunctionsService } from './vanilla.service';
import { Variables } from '../variables';
export interface PointsDetailsInterface {
  id: number;
  points_name: string;
  details: {
    points?: number;
    pre_approved?: boolean;
    display_name: string;
    display_extra?: {
      header?: string;
      details?: string;
    }[];
  };
  edited_on: number;
}
@Injectable({
  providedIn: 'root',
})
export class BasicFunctionsService {
  private appVariables: Variables;
  userDetails: any;
  PointsDetails: PointsDetailsInterface[] = [];
  BasicSiteDetails: any = {};
  constructor(
    private http: HttpService,
    private vanill: VanillaFunctionsService
  ) {
    this.appVariables = new Variables();
    this.init();
    // this.window['demo'] = this;
  }
  async init() {
    this.PointsDetails = await this.getpointsbasicDetails();
    this.BasicSiteDetails = await this.getSiteBasicDetails();
  }
  isLogin() {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (
        (token && token !== null) ||
        (refreshToken && refreshToken !== null)
      ) {
        this.http
          .getApiHttp('/islogin', 'get')
          .then((data: any) => {
            if (data.success === 1) {
              resolve('');
            } else {
              reject();
            }
          })
          .catch(reject);
      } else {
        reject();
      }
    });
  }
  getpointsbasicDetails(): Promise<PointsDetailsInterface[]> {
    return this.http.getHttp('/points_details', 'get');
  }
  getSiteBasicDetails(): Promise<any> {
    return this.http.getHttp('/basicdetails', 'get');
  }
  getUserDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .getApiHttp('/mydetails', 'get')
        .then((data) => {
          const dob = new Date(Number(data.data.dob) * 1000);
          const b: any = {
            Name: data.data.name,
            Gender: data.data.gender,
            'Mobile No.': data.data.mobile_no,
            'D.O.B':
              dob.getDate() + '/' + dob.getMonth() + '/' + dob.getFullYear(),
            City: data.data.city,
          };
          let extraData;
          if (typeof data.data.user_data === 'string') {
            extraData = JSON.parse(data.data.user_data);
          } else {
            extraData = data.data.user_data;
          }
          if (extraData.alternate_no) {
            b['Alternate No.'] = extraData.alternate_no;
          }
          if (extraData.email) {
            b['Email ID'] = extraData.email;
          }
          if (data.data.unique_id) {
            extraData.unique_id = data.data.unique_id;
          } else {
            extraData.unique_id = false;
          }
          b['Basic Points'] = extraData.basic_points || 0;
          extraData.basic_points = extraData.basic_points || 0;
          b.extra = extraData;
          b.extra.sangh_name = data.data.sangh_name;
          this.userDetails = b;
          resolve(b);
        })
        .catch(reject);
    });
  }
  login(
    userName: string,
    type: 'get' | 'post',
    password: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const a = {
        id: userName,
        password: this.vanill.MD5(password),
      };
      this.http
        .getLoginHttp('/login', type, a)
        .then((data) => {
          if (data.success && data.success === 1 && data.data.accessToken) {
            localStorage.setItem('accessToken', data.data.accessToken);
            delete data.data.accessToken;
            localStorage.setItem('refreshToken', data.data.refreshToken);
            delete data.data.refreshToken;
            localStorage.setItem('user', JSON.stringify(data.data));
            resolve('');
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  }
  clearhistoryGotoLink(url = '/', fullUrl = false) {
    let locationToGO = location.origin + url;
    if (fullUrl) {
      locationToGO = url;
    }
    setTimeout(() => {
      console.log(locationToGO);
      location.replace(locationToGO);
    });
  }
}
