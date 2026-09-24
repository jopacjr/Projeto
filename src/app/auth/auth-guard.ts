import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  template: '',
})
export class AuthComponent {
  constructor(@Inject(Auth) private authService: Auth, private router: Router) {}

  onLogin(): void {
    this.authService.login();
    this.router.navigate(['/home']);
  }
}