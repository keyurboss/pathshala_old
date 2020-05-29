import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root',
})
export class VanillaFunctionsService {
  constructor() {}
  MD5(stringData: string) {
    return Md5.hashStr(stringData);
  }
}
