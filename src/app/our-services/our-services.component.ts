import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RemoteUrl } from '../models/remote-url';
import { ServerResponse } from '../models/server-response';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {

  public message: string;
  public data: Array<Warehouse>;
  public order: Array<StorageSpace>;
  public model: StorageSpace;
  public editing: boolean;
  public minEndDay: string;
  public maxUnits: number;

  constructor(private http: HttpClient, public auth: AuthenticationService) {
    this.message = 'Loading... Please wait';
    this.order = (JSON.parse(localStorage.getItem('order')) || []).map(s => {
      return Object.assign(new StorageSpace(), s);
    });
  }

  ngOnInit() {
    this.data = null;
    this.http.get<ServerResponse<Array<Warehouse>>>(RemoteUrl.Warehouse).subscribe(res => {
      console.log(res);
      if (!res.success) {
        this.message = 'Error while loading, please check developer console for more details, or try refreshing page.';
        return;
      }
      if (!res.result) {
        this.message = 'Empty result... no warehouse found.';
      }
      this.data = res.result;
    });
  }

  public get today() {
    return new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  }
  public startDayChange() {
    console.log(this.model);
    if (this.model && this.model.startDate) {
      this.minEndDay = new Date(new Date(this.model.startDate).getTime() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    } else {
      this.minEndDay = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    }
  }

  private saveOrder() {
    localStorage.setItem('order', JSON.stringify(this.order));
    this.model = null;
  }

  cancel() {
    this.model = null;
  }

  createOrder(warehouse: Warehouse) {
    console.log(this.data);
    this.editing = false;
    this.model = new StorageSpace();
    this.model.warehouseId = warehouse.id;
    this.maxUnits = warehouse.available;
    this.model.priceSchema = warehouse.priceSchema;
  }

  addOrder(storage: StorageSpace, add: boolean) {
    if (add) {
      if (storage.quantity > 0) {
        this.order.push(storage);
      }
    } else {
      if (storage.quantity === 0) {
        this.order.splice(this.order.indexOf(storage), 1);
      }
    }
    this.saveOrder();
    this.model = null;
  }

  editOrder(idx: number) {
    this.editing = true;
    this.model = this.order[idx];
    this.maxUnits = this.data.filter((w) => w.id === this.model.warehouseId)[0].available;
  }

  removeOrder(idx: number) {
    this.order.splice(idx, 1);
    this.saveOrder();
  }
}

class Warehouse {
  public name: string;
  public id: number;
  public priceSchema: PriceSchema;
  public available: number;
}

class PriceSchema {
  public baseCost: number;
  public taxPercent: number;
  public dailyRate: number;
}

export class StorageSpace {
  public warehouseId: number;
  public quantity: number;
  public startDate: Date;
  public endDate: Date;
  public priceSchema: PriceSchema;

  public get price(): number {
    return (this.priceSchema.baseCost
      + this.priceSchema.dailyRate * (Math.round((<any>new Date(this.endDate) - <any>new Date(this.startDate)) / (1000 * 60 * 60 * 24))))
      * this.priceSchema.taxPercent;
  }
}
