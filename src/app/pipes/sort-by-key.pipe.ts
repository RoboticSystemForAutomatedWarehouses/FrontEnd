import { Pipe, PipeTransform } from '@angular/core';
import { Local } from 'protractor/built/driverProviders';

@Pipe({
  name: 'sortByKey'
})
export class SortByKeyPipe implements PipeTransform {

  transform(value: Array<{ key: string, val: any }>): Array<{ key: any, val: any }> {
    return value.sort((a, b) => a.key > b.key ? 1 : a.key === b.key ? 0 : -1);
  }

}
