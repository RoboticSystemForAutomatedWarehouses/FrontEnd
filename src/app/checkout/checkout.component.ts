import { Component, OnInit } from '@angular/core';
import { StorageSpace } from '../our-services/our-services.component';
import { HttpClient } from '@angular/common/http';
import { RemoteUrl } from '../models/remote-url';
import { ServerResponse } from '../models/server-response';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public order: Array<StorageSpace>;
  public message: string;
  public checkResults: Array<CheckEntry>;
  public canPay: boolean;
  public success: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.success = null;
    this.canPay = false;
    this.checkResults = null;
    const data = localStorage.getItem('order');
    if (!data || data === '[]') {
      this.message = 'there\'s no order to process...';
      this.order = null;
      return;
    }
    this.order = JSON.parse(data);
    this.validateWithServer();
  }

  validateWithServer() {
    this.message = 'validating order, please wait ☺';
    this.http.post<ServerResponse<Array<CheckEntry>>>(RemoteUrl.Orders.Check, this.order)
      .subscribe(res => {
        console.log(res);
        if (!res.success) {
          this.message = res.message;
          return;
        }
        this.checkResults = res.result;
        this.canPay = !!res.message;
      });
  }

  confirm() {
    this.success = undefined;
    this.http.post<ServerResponse<any>>(RemoteUrl.Orders.Confirm, '').subscribe(res => {
      console.log(res);
      this.success = res.success;
      if (res.success) {
        this.order = [];
        this.saveOrder();
      }
    });
  }
  removeEntry(idx: number) {
    this.order.splice(idx, 1);
    this.saveOrder();
    this.checkResults.splice(idx, 1);
    this.canPay = false;
  }

  private saveOrder() {
    localStorage.setItem('order', JSON.stringify(this.order));
  }
}

class CheckEntry {
  public item1: string;
  public item2: number;
}
