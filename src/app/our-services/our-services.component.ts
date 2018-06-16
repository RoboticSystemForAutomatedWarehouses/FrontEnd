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

  constructor(private http: HttpClient, public auth: AuthenticationService) {
    this.message = 'Loading... Please wait';
    this.order = JSON.parse(localStorage.getItem('order')) || [];
  }

  ngOnInit() {
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

  private saveOrder() {
    localStorage.setItem('order', JSON.stringify(this.order));
    this.model = null;
  }

  cancel() {
    this.model = null;
  }

  createOrder(warehouse: Warehouse) {
    this.editing = false;
    this.model = new StorageSpace();
    this.model.warehouseId = warehouse.id;
  }

  addOrder(storage: StorageSpace, add: boolean) {
    if (add) {
      this.order.push(storage);
    }
    this.saveOrder();
    this.model = null;
  }

  editOrder(idx: number) {
    this.editing = true;
    this.model = this.order[idx];
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
}
