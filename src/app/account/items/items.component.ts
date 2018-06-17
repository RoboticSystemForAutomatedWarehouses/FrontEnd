import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RemoteUrl } from '../../models/remote-url';
import { ServerResponse } from '../../models/server-response';
import { INVALID } from '@angular/forms/src/model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  public isLoading: boolean;
  public message: string;
  public success: boolean; // true=success, false=fail, undefined=in progress, null=no operation.
  public result: Array<{ name: string, entry: Entry }>;
  public categories: Array<Category>;
  public count: number;
  public model: ItemViewModel;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.success = null;
    this.model = new ItemViewModel();
    this.count = 0;
    this.isLoading = true;
    this.message = null;
    const data = new Map<string, Entry>();
    this.http.get<ServerResponse<Array<Category>>>(RemoteUrl.Categories.List).subscribe(categories => {
      this.categories = categories.result;
      this.http.get<ServerResponse<Array<Response>>>(RemoteUrl.Orders.List).subscribe(res => {
        if (!res.success) {
          this.message = res.message;
          return;
        }
        for (const order of res.result) {
          for (const space of order.storageSpaces) {
            let entry = new Entry();
            entry.startDate = space.startDate;
            entry.endDate = space.endDate;
            if (!data.has(entry.name)) {
              entry.free = [];
              entry.used = [];
              entry.items = new Map();
              data.set(entry.name, entry);
            } else {
              entry = data.get(entry.name);
            }
            if (space.item) {
              entry.used.push({ orderId: order.id, storageId: space.id });
              const arr = (entry.items.get(space.item.name) || []);
              arr.push({ orderId: order.id, storageId: space.id });
              entry.items.set(space.item.name, arr);
            } else {
              entry.free.push({ orderId: order.id, storageId: space.id });
            }
          }
        }
        this.result = [];
        data.forEach((value, key) => {
          this.result.push({ name: key, entry: value });
        });
      });
    });
  }

  public submit(entry: Entry) {
    if (this.success === undefined) {
      alert('already processing another order. Please wait...');
      return;
    }
    this.success = undefined;
    console.log(this.count);
    console.log(this.model);
    console.log(entry);
    const quantity = this.count;
    this.sendRequest(entry, quantity);
  }

  sendRequest(entry: Entry, quantity: number) {
    if (quantity === 0) {
      this.success = true;
      return;
    }
    const ids = entry.free.pop();
    this.http.post<ServerResponse<any>>(RemoteUrl.Items.Insert(ids.orderId, ids.storageId), this.model).subscribe(res => {
      if (res.success) {
        this.sendRequest(entry, quantity - 1);
      } else {
        console.log(res);
        this.success = false;
      }
    });
  }
}

class Response { // Order
  id: number;
  placementDate: string;
  storageSpaces: Array<Space>;
}

class Entry {
  public startDate: string;
  public endDate: string;
  public free: Array<{ orderId: number, storageId: number }>;
  public used: Array<{ orderId: number, storageId: number }>;
  public items: Map<string, Array<{ orderId: number, storageId: number }>>;

  public get name(): string {
    return `${this.startDate.substr(0, 10)} :: ${this.endDate.substr(0, 10)}`;
  }
}

class Space {
  id: number;
  name: string; // warehouse name
  startDate: string;
  endDate: string;
  item: {
    id: number,
    name: string, // category name
    arriveDate: string,
    removeDate: string
  };
}

class Category {
  name: string;
  id: number;
}

class ItemViewModel {
  categoryId: number;
  ArriveDate: Date;
}
