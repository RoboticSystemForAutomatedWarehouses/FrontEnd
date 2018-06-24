import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { RemoteUrl } from '../../models/remote-url';
import { ServerResponse } from '../../models/server-response';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public model: EditUserViewModel;

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  ngOnInit() {
    this.model = undefined;
    this.http.get<ServerResponse<EditUserViewModel>>(RemoteUrl.Account.Get(this.authService.Id)).subscribe(res => {
      if (res.success) {
        this.model = res.result;
      } else {
        this.model = null;
      }
    });
  }

  submit() {
    console.log(this.model);
    if (!this.model.newPassword || !this.model.newPasswordConfirmation || this.model.newPassword !== this.model.newPasswordConfirmation) {
      alert('Invalid password/confirmation.');
      return;
    }
    this.http.post<ServerResponse<any>>(RemoteUrl.Account.Update(this.authService.Id), this.model).subscribe(res => {
      console.log(res);
      if (res.success) {
        alert('Success!');
        this.ngOnInit();
      } else {
        alert('Fail to update: ' + res.message);
      }
    });
  }

}

class EditUserViewModel {
  public name: string;
  public id: number;
  public email: string;
  public gender: Gender;
  public oldPassword: string;
  public newPassword: string;
  public newPasswordConfirmation: string;
}

enum Gender {
  Male = 0,
  Female = 1
}
