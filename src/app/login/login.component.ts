import { Component, OnInit } from '@angular/core';
import { UserLoginModel } from '../models/user-login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public model: UserLoginModel;
  constructor() { }

  ngOnInit() {
    this.model = new UserLoginModel('', '', true);
  }

  public submit() {
    console.log(this.model);
  }
}
