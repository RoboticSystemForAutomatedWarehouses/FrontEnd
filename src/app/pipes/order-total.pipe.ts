import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderTotal',
  pure: false
})
export class OrderTotalPipe implements PipeTransform {

  transform(value: Array<any>, args?: any): any {
    const res = value.reduce((total, order) => {
      return total + order.price;
    }, 0);
    console.log(res);
    return res;
  }

}
