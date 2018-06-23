import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RemoteUrl } from '../../models/remote-url';
import { ServerResponse } from '../../models/server-response';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  public success: boolean; // true=success, false=fail, undefined=in progress, null=no operation.
  public data: Map<string, Map<string, Array<Slot>>>;
  public categories: Array<Category>;
  public model: ItemViewModel;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.model = new ItemViewModel();
    this.model.quantity = 0;
    this.data = null;
    this.success = undefined;
    this.http.get<ServerResponse<Array<Category>>>(RemoteUrl.Categories.List).subscribe(categories => {
      this.categories = categories.result;
      this.http.get<ServerResponse<Array<Response>>>(RemoteUrl.Orders.List).subscribe(res => {
        this.success = res.success;
        if (!res.success) {
          return;
        }
        const result: Array<Slot> = [];
        for (const order of res.result) {
          for (const space of order.storageSpaces) {
            const spaceStartDate = new Date(space.startDate.split('T')[0]);
            const spaceEndDate = new Date(space.endDate.split('T')[0]);
            let slot = new Slot();
            slot.orderId = order.id;
            slot.storageId = space.id;
            slot.startDate = spaceStartDate;
            for (const item of space.item) {
              slot.endDate = new Date(item.arriveDate.split('T')[0]);
              if (slot.startDate.getTime() - slot.endDate.getTime() !== 0) {
                result.push(slot);
              }
              slot = new Slot();
              slot.orderId = order.id;
              slot.storageId = space.id;
              slot.startDate = new Date(item.arriveDate.split('T')[0]);
              slot.item = item;
              if (!item.removeDate) {
                break;
              }
              slot.endDate = new Date(item.removeDate.split('T')[0]);
              if (slot.startDate.getTime() - slot.endDate.getTime() !== 0) {
                result.push(slot);
              }
              slot = new Slot();
              slot.orderId = order.id;
              slot.storageId = space.id;
              slot.startDate = new Date(item.removeDate.split('T')[0]);
            }
            slot.endDate = spaceEndDate;
            if (slot.startDate.getTime() - slot.endDate.getTime() !== 0) {
              result.push(slot);
            }
          }
        }
        const data = new Map();
        for (const entry of result) {
          const period =
            entry.startDate.toISOString().slice(0, 10).split('-').reverse().join('-')
            + ' || '
            + entry.endDate.toISOString().slice(0, 10).split('-').reverse().join('-');
          if (!data.has(period)) {
            data.set(period, new Map());
          }
          const periodEntry = data.get(period);
          const name = entry.item ? entry.item.name : null;
          if (!periodEntry.has(name)) {
            periodEntry.set(name, []);
          }
          periodEntry.get(name).push(entry);
        }
        console.log(data);
        this.data = data;
      });
    });
  }

  public insertItem(arr: Array<Slot>) {
    if (this.model.quantity > arr.length) {
      alert('Not enough free space');
      return;
    }
    if (!this.model.arriveDate) {
      alert('Arrive date can\'t be empty');
      return;
    }
    if (new Date(this.model.arriveDate) < arr[0].startDate) {
      alert('Item can\'t arrive before contract start date.');
      return;
    }
    if (!this.model.categoryId) {
      alert('Category can\'t be empty.');
      return;
    }
    const count = this.model.quantity;
    this.success = undefined;
    this.sendInsertRequest(arr, this.model, count);
  }

  private sendInsertRequest(arr: Array<Slot>, item: ItemViewModel, quantity: number) {
    if (quantity < 1) {
      this.success = true;
      this.ngOnInit();
      return;
    }
    const slot = arr.pop();
    this.http.post<ServerResponse<any>>(
      RemoteUrl.Items.Insert(slot.orderId, slot.storageId), item)
      .subscribe(res => {
        if (res.success) {
          this.sendInsertRequest(arr, item, quantity - 1);
        } else {
          console.log(res);
          this.success = false;
          arr.push(slot);
        }
      });
  }
}


class Response { // Order
  id: number;
  placementDate: string;
  storageSpaces: Array<Space>;
}

class Slot {
  public startDate: Date;
  public endDate: Date;
  public item: Item;
  public storageId: number;
  public orderId: number;
  public get free(): boolean {
    return !this.item;
  }
}

class Space {
  id: number;
  name: string; // warehouse name
  startDate: string;
  endDate: string;
  item: Array<Item>;
}

class Item {
  id: number;
  name: string; // category name
  arriveDate: string;
  removeDate: string;
}

class Category {
  name: string;
  id: number;
}

class ItemViewModel {
  categoryId: number;
  arriveDate: Date;
  removeDate: Date;
  quantity: number;
}
