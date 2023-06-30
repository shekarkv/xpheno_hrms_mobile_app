import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  {
    path: '',
    component: MenuPage,
    children: [ 
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'demo-form',
        loadChildren: () => import('../demo-form/demo-form.module').then( m => m.DemoFormPageModule)
      },
      {
        path: 'employee',
        loadChildren: () => import('../employee/employee.module').then( m => m.EmployeePageModule)
      },
      {
        path: 'employee-list',
        loadChildren: () => import('../employee-list/employee-list.module').then( m => m.EmployeeListPageModule)
      },
      {
        path: 'apply-leave',
        loadChildren: () => import('../apply-leave/apply-leave.module').then( m => m.ApplyLeavePageModule)
      },
      {
        path: 'monthly-attandence-list',
        loadChildren: () => import('../monthly-attandence-list/monthly-attandence-list.module').then( m => m.MonthlyAttandenceListPageModule)
      },
      {
        path: 'profile-changes',
        loadChildren: () => import('../profile-changes/profile-changes.module').then( m => m.ProfileChangesPageModule)
      },
      {
        path: 'employee-profile-edit',
        loadChildren: () => import('../employee-profile-edit/employee-profile-edit.module').then( m => m.EmployeeProfileEditPageModule)
      },
      {
        path: 'on-duty-request',
        loadChildren: () => import('../on-duty-request/on-duty-request.module').then( m => m.OnDutyRequestPageModule)
      },
      {
        path: 'holiday-list',
        loadChildren: () => import('../holiday-list/holiday-list.module').then( m => m.HolidayListPageModule)
      },
      {
        path: 'wfh-request',
        loadChildren: () => import('../wfh-request/wfh-request.module').then( m => m.WFHRequestPageModule)
      },
      {
        path: 'trip-list',
        loadChildren: () => import('../trip-list/trip-list.module').then( m => m.TripListPageModule)
      },
      {
        path: 'comp-off-request',
        loadChildren: () => import('../comp-off-request/comp-off-request.module').then( m => m.CompOffRequestPageModule)
      },
      {
        path: 'comp-off-leave',
        loadChildren: () => import('../comp-off-leave/comp-off-leave.module').then( m => m.CompOffLeavePageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('../menu/menu.module').then( m => m.MenuPageModule)
      },
      {
        path: 'theme-settings',
        loadChildren: () => import('../theme-settings/theme-settings.module').then(m => m.ThemeSettingsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
