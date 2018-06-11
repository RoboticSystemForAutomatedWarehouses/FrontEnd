import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RemoteUrl } from '../models/remote-url';
import { ServerResponse } from '../models/server-response';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {

  public message: string;
  public data: Array<Warehouse>;

  constructor(private http: HttpClient) {
    this.message = 'Loading... Please wait';
  }

  ngOnInit() {
    this.http.get<ServerResponse<Array<Warehouse>>>(RemoteUrl.Warehouse).subscribe(res => {
      console.log(res);
      if (!res.success) {
        console.error(res);
        this.message = 'Error while loading, please check developer console for more details, or try refreshing page.';
        return;
      }
      if (!res.result) {
        this.message = 'Empty result... no warehouse found.';
      }
      this.data = res.result;
    });
  }

  addOrder(warehouse: Warehouse) {
    console.log(warehouse);
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
