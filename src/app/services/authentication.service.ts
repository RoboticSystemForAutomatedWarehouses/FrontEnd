import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  constructor() { }

  public isAuthenticated: boolean;
  public isAdmin: boolean;

}
