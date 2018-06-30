import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public displayImage: boolean;
  constructor(public authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

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
