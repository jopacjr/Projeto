import { CanActivateFn, Router, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth';
import { HomeComponent } from './pages/home/home';
import { inject } from '@angular/core';

const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  return localStorage.getItem('token')
    ? true
    : router.createUrlTree(['/auth']);
};

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [authGuard] // 🔒 Proteção ativada
  },
  { path: '**', redirectTo: 'auth' }
];