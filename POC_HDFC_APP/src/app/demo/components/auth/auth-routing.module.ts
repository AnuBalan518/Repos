import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full' // When navigating to `/auth`, redirect to `/auth/login`
  },
  { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
  { path: 'access', loadChildren: () => import('./accessdenied/accessdenied.module').then(m => m.AccessdeniedModule) },
  { path: 'forgotpassword', loadChildren: () => import('./forgotpassword/forgotpassword.module').then(m => m.ForgotPasswordModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'newpassword', loadChildren: () => import('./newpassword/newpassword.module').then(m => m.NewPasswordModule) },
  { path: 'verification', loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule) },
  { path: 'lockscreen', loadChildren: () => import('./lockscreen/lockscreen.module').then(m => m.LockScreenModule) },
  {
    path: '**', redirectTo: 'login'
  }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
//     imports: [RouterModule.forChild([
//         { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
//         { path: 'access', loadChildren: () => import('./accessdenied/accessdenied.module').then(m => m.AccessdeniedModule) },
//         { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
//         { path: 'forgotpassword', loadChildren: () => import('./forgotpassword/forgotpassword.module').then(m => m.ForgotPasswordModule) },
//         { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
//         { path: 'newpassword', loadChildren: () => import('./newpassword/newpassword.module').then(m => m.NewPasswordModule) },
//         { path: 'verification', loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule) },
//         { path: 'lockscreen', loadChildren: () => import('./lockscreen/lockscreen.module').then(m => m.LockScreenModule) },
//         { path: '', redirectTo: 'login', pathMatch: 'full' },
//         { path: '**', redirectTo: '/notfound' }
//     ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
