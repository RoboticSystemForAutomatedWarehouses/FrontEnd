import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegisterModel, Gender } from '../models/user-register-model';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { RemoteUrl } from '../models/remote-url';
import { ServerResponse } from '../models/server-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public model: UserRegisterModel;
  public valid_name: boolean;
  public valid_email: boolean;
  public valid_password: boolean;
  public valid_confirm_password: boolean;
  public valid_gender: boolean;
  public errors: Array<{ code, description }>;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.model = new UserRegisterModel();
    this.valid_confirm_password = this.valid_email = this.valid_gender = this.valid_name = this.valid_password = true;
  }

  public register(): void {
    console.log(this.model);
    this.valid_name = this.model.ValidateName();
    this.valid_email = this.model.ValidateEmail();
    this.valid_gender = this.model.ValidateGender();
    this.valid_password = this.model.ValidatePassword();
    this.valid_confirm_password = this.model.ValidatePasswordConfirmation();
    if (this.valid_name && this.valid_email && this.valid_gender && this.valid_password && this.valid_confirm_password) {
      this.http.post<ServerResponse<Array<{ code, description }>>>(RemoteUrl.Account.Register, this.model).subscribe((next) => {
        if (next.success) {
          this.router.navigate(['/home']);
        } else {
          this.errors = next.result;
        }
      });
    }
  }
}
