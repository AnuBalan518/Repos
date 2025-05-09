import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
//
// const routes: Routes = [
//     {
//         path: '', component: AppLayoutComponent,
//         children: [
//             { path: 'dashboard', loadChildren: () => import('./demo/components/dashboards/dashboards.module').then(m => m.DashboardsModule) },
//             { path: 'uikit', data: { breadcrumb: 'UI Kit' }, loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
//             { path: 'utilities', data: { breadcrumb: 'Utilities' }, loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
//             { path: 'pages', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
//             { path: 'profile', data: { breadcrumb: 'Product Management' }, loadChildren: () => import('./demo/components/profile/profile.module').then(m => m.ProfileModule) },
//             { path: 'documentation', data: { breadcrumb: 'Documentation' }, loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
//             { path: 'blocks', data: { breadcrumb: 'Prime Blocks' }, loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
//             { path: 'ecommerce', data: { breadcrumb: 'E-Commerce' }, loadChildren: () => import('./demo/components/ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
//             { path: 'apps', data: { breadcrumb: 'Apps' }, loadChildren: () => import('./demo/components/apps/apps.module').then(m => m.AppsModule) }
//         ]
//     },
//     // Login & standalone routes (OUTSIDE layout)
//     { path: 'login', loadChildren: () => import('./demo/components/auth/login/login.module').then(m => m.LoginModule) },
//
//     { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
//     { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
//     { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
//     //{ path: '', loadChildren: () => import('./demo/components/auth/login/login.module').then(m => m.LoginModule) },
//     //{ path: 'login', redirectTo: '/login' },
//
//     // Default route should redirect to /login
//     { path: '', redirectTo: 'login', pathMatch: 'full' },
//
//     // Proper /login route loads login module
//     //{ path: 'login', loadChildren: () => import('./demo/components/auth/login/login.module').then(m => m.LoginModule) },
//
//     // Wildcard fallback
//     { path: '**', redirectTo: 'notfound' }
// ];
//
// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })
// export class AppRoutingModule { }



const routes: Routes = [
  {
    path: '', redirectTo: 'auth/login', pathMatch: 'full' // Default route
  },
  {
    path: 'auth',
    loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule)
  },
  {
      path: '',
      component: AppLayoutComponent,
      children: [
          { path: 'dashboard', loadChildren: () => import('./demo/components/dashboards/dashboards.module').then(m => m.DashboardsModule) },
          { path: 'profile', loadChildren: () => import('./demo/components/profile/profile.module').then(m => m.ProfileModule) },
          { path: 'pages', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
          { path: 'uikit', data: { breadcrumb: 'UI Kit' }, loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
          { path: 'utilities', data: { breadcrumb: 'Utilities' }, loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
          { path: 'documentation', data: { breadcrumb: 'Documentation' }, loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
          { path: 'blocks', data: { breadcrumb: 'Prime Blocks' }, loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
          { path: 'ecommerce', data: { breadcrumb: 'E-Commerce' }, loadChildren: () => import('./demo/components/ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
          { path: 'apps', data: { breadcrumb: 'Apps' }, loadChildren: () => import('./demo/components/apps/apps.module').then(m => m.AppsModule) },
          { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
          //{ path: 'employee', loadChildren: () => import('./demo/components/master/master.module').then(m => m.MasterModule) },
          { path: 'master', loadChildren: () => import('./demo/components/master/master.module').then(m => m.MasterModule) },
          { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
      ]
    },
  {
    path: '**', redirectTo: 'auth/login' // Wildcard fallback
  }
];

 @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
