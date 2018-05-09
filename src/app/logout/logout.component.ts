import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RemoteUrl } from '../models/remote-url';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private auth_service: AuthenticationService) { }

  ngOnInit() {
    this.http.get(RemoteUrl.Account.Logout).subscribe(() => {
      this.auth_service.Id = '';
      this.router.navigate(['/home']);
    });
  }

}
