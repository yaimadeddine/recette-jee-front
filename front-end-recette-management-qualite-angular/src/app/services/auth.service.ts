import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const userRef = localStorage.getItem('refUser');

    if (userRef) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }}
