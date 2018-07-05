import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  messages: Array<string>;
  public message: string;

  public displayImage: boolean;
  constructor(public authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router) {
    this.messages = [
      'عاملين ايه على الغدا؟',
      'كان فيه ماتش ايه اليوم؟',
      'الarm اتكسرت ولا لسا؟',
      'هنفطر ايه النهارده؟',
      'هنتقابل ايمتى مع التيم؟',
      'شهاب جاي ولا مش جاي؟',
      'كيف بدأ الخلق؟',
      'انا مين؟',
      'شرف فين؟'
    ];
    this.message = this.messages[0];
    let i = 0;
    setInterval(() => {
      this.message = this.messages[i];
      i = (i + 1) % this.messages.length;
    }, 3000);
  }

  ngOnInit() {
    this.displayImage = true;
    this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      this.displayImage = event.urlAfterRedirects === '/home' || event.urlAfterRedirects === '/';
      console.log(this.displayImage);
    });
  }

}
