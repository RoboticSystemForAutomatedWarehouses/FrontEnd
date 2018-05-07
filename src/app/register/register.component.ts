import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegisterModel, Gender } from '../models/user-register-model';
import { NgForm, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.model = new UserRegisterModel();
    this.valid_confirm_password = this.valid_email = this.valid_gender = this.valid_name = this.valid_password = true;
  }

  public register(): void {
    console.log(this.model);
    console.log(this.valid_name = this.model.ValidateName());
    console.log(this.valid_email = this.model.ValidateEmail());
    console.log(this.valid_gender = this.model.ValidateGender());
    console.log(this.valid_password = this.model.ValidatePassword());
    console.log(this.valid_confirm_password = this.model.ValidatePasswordConfirmation());
    if (this.valid_name && this.valid_email && this.valid_gender && this.valid_password && this.valid_confirm_password) {
      console.log('valid');
    }
  }
}
