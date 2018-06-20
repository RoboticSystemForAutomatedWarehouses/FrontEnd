import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  constructor() {
    this.load();
  }

  public get isAuthenticated(): boolean {
    return !!this.Id;
  }

  private _Id: string;
  public get Id(): string {
    return this._Id;
  }
  public set Id(v: string) {
    this._Id = v;
    this.save();
  }

  private save() {
    localStorage.setItem('Id', this.Id);
  }

  private load() {
    this._Id = localStorage.getItem('Id');
  }
}
