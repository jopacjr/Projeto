import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class AuthComponent {
OnSubmit() {
throw new Error('Method not implemented.');
}
toggleMode() {
throw new Error('Method not implemented.');
}
isLoginMode: any;
form: any;
  constructor(private authService: Auth, private router: Router) {}

  onLogin(): void {
    this.authService.login();
    this.router.navigate(['/home']);
  }
}