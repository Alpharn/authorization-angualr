import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GraphComponent } from './components/graph/graph.component';
import { authGuard } from './auth/guard/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { graphGuard } from './guards/graph.guard';
import { RoutePath } from "../app/constants/routes";

const routes: Routes = [
  { path: '', redirectTo: `/${RoutePath.Login}`, pathMatch: 'full' },
  { path: RoutePath.Login, loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: RoutePath.Admin, component: AdminPageComponent, canActivate: [authGuard, adminGuard] },
  { path: RoutePath.Dashboard, component: DashboardComponent, canActivate: [authGuard] },
  { path: RoutePath.Graph, component: GraphComponent, canActivate: [authGuard, graphGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
