import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  constructor() { }

  public get isAuthenticated(): boolean {
    return !!this.Id;
  }

  public isAdmin: boolean;
  public Id: string;

}
