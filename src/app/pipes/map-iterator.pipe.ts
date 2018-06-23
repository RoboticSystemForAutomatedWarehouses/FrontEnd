import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mapIterator'
})
export class MapIteratorPipe implements PipeTransform {

    transform(map: Map<any, any>): Array<{ key: any, val: any }> {
        const ret = [];
        if (map) {
            map.forEach((val, key) => {
                ret.push({
                    key: key,
                    val: val
                });
            });
        }
        return ret;
    }

}
