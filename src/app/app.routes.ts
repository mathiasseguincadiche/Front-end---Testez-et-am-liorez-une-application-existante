import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'students',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/student-list/student-list.component')
        .then(m => m.StudentListComponent)
  },
  {
    // ⚠️ Cette route DOIT être déclarée AVANT students/:id
    // Sinon Angular lirait "new" comme un id et chargerait le composant détail
    path: 'students/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/student-form/student-form.component')
        .then(m => m.StudentFormComponent)
  },
  {
    path: 'students/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/student-detail/student-detail.component')
        .then(m => m.StudentDetailComponent)
  },
  {
    path: 'students/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/student-form/student-form.component')
        .then(m => m.StudentFormComponent)
  }
];
