import { Injectable } from '@angular/core';
import { GetParams } from './to-do-list-get.model';

@Injectable({
  providedIn: 'root'
})
export class ParamsToArray {
  makeParamsAnArray(params: GetParams): Array<{name: string, value: string}> {
    const arrayParams = [];

    for (let [name, value] of Object.entries(params)) {
      arrayParams.push({name, value})
    }

    return arrayParams;
  }
}
