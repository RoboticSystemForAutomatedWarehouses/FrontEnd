import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerResponse } from '../models/server-response';
import { RemoteUrl } from '../models/remote-url';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public news: Array<Array<News>>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.news = [];
    this.http.get<ServerResponse<Array<News>>>(RemoteUrl.News(6)).subscribe(res => {
      if (!res.success) {
        console.log(res);
        return;
      }
      while (res.result.length) {
        this.news.push(res.result.splice(0, 3));
      }
    });
  }
}

class News {
  public date: string;
  public id: number;
  public title: string;
  public content: string;
}
