import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapIterator'
})
export class MapIteratorPipe implements PipeTransform {

  transform(map: Map<any, any>): any[] {
    const ret = [];

    map.forEach((val, key) => {
        ret.push({
            key: key,
            val: val
        });
    });
    console.log(ret);
    return ret;
}

}
