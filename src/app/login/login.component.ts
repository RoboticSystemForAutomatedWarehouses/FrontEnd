import { Component, OnInit } from '@angular/core';
import { UserLoginModel } from '../models/user-login-model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RemoteUrl } from '../models/remote-url';
import { ServerResponse } from '../models/server-response';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public model: UserLoginModel;
  public errors: Array<{ code, description }>;
  constructor(private http: HttpClient, private router: Router, private auth_service: AuthenticationService) { }

  ngOnInit() {
    this.model = new UserLoginModel();
  }

  public submit() {
    console.log(this.model);
    this.http.post<ServerResponse<Array<{ code, description }>>>(RemoteUrl.Account.Login, this.model).subscribe((next) => {
      console.log(next);
      if (next.success) {
        this.auth_service.Id = next.message;
        this.router.navigate(['/account']);
      } else {
        this.errors = next.result;
      }
    });
  }
}
