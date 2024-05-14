import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;

  constructor() { }

  setAuthenticated(status: boolean): void {
    this.isAuthenticated = status;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
