import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'demo-form',
    loadChildren: () => import('./pages/demo-form/demo-form.module').then( m => m.DemoFormPageModule) 
  },
  {
    path: 'employee',
    loadChildren: () => import('./pages/employee/employee.module').then( m => m.EmployeePageModule)
  },
  {
    path: 'employee-list',
    loadChildren: () => import('./pages/employee-list/employee-list.module').then( m => m.EmployeeListPageModule)
  },
  {
    path: 'apply-leave',
    loadChildren: () => import('./pages/apply-leave/apply-leave.module').then( m => m.ApplyLeavePageModule)
  },
  {
    path: 'monthly-attandence-list',
    loadChildren: () => import('./pages/monthly-attandence-list/monthly-attandence-list.module').then( m => m.MonthlyAttandenceListPageModule)
  },
  {
    path: 'profile-changes',
    loadChildren: () => import('./pages/profile-changes/profile-changes.module').then( m => m.ProfileChangesPageModule)
  },
  {
    path: 'employee-profile-edit',
    loadChildren: () => import('./pages/employee-profile-edit/employee-profile-edit.module').then( m => m.EmployeeProfileEditPageModule)
  },
  {
    path: 'on-duty-request',
    loadChildren: () => import('./pages/on-duty-request/on-duty-request.module').then( m => m.OnDutyRequestPageModule)
  },
  {
    path: 'holiday-list',
    loadChildren: () => import('./pages/holiday-list/holiday-list.module').then( m => m.HolidayListPageModule)
  },
  {
    path: 'wfh-request',
    loadChildren: () => import('./pages/wfh-request/wfh-request.module').then( m => m.WFHRequestPageModule)
  },
  {
    path: 'trip-list',
    loadChildren: () => import('./pages/trip-list/trip-list.module').then( m => m.TripListPageModule)
  },
  {
    path: 'comp-off-request',
    loadChildren: () => import('./pages/comp-off-request/comp-off-request.module').then( m => m.CompOffRequestPageModule)
  },
  {
    path: 'comp-off-leave',
    loadChildren: () => import('./pages/comp-off-leave/comp-off-leave.module').then( m => m.CompOffLeavePageModule)
  },
  {
    path: 'theme-settings',
    loadChildren: () => import('./pages/theme-settings/theme-settings.module').then(m => m.ThemeSettingsPageModule)
  },
  {
    path: 'leave-balance',
    loadChildren: () => import('./pages/leave-balance/leave-balance.module').then( m => m.LeaveBalancePageModule)
  },
  // {
  //   path: 'maps',
  //   loadChildren: () => import('./pages/maps/maps.module').then( m => m.MapsPageModule)
  // },
  // {
  //   path: 'maps/:type',
  //   loadChildren: () => import('./pages/maps/maps.module').then(m => m.MapsPageModule)
  // },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'approvals',
    loadChildren: () => import('./pages/approvals/approvals.module').then( m => m.ApprovalsPageModule)
  },
  {
    path: 'approvals-level-two',
    loadChildren: () => import('./pages/approvals-level-two/approvals-level-two.module').then( m => m.ApprovalsLevelTwoPageModule)
  },
  {
    path: 'approvals-level-three',
    loadChildren: () => import('./pages/approvals-level-three/approvals-level-three.module').then( m => m.ApprovalsLevelThreePageModule)
  },
  {
    path: 'view-apply-leave',
    loadChildren: () => import('./pages/view-apply-leave/view-apply-leave.module').then( m => m.ViewApplyLeavePageModule)
  },
  {
    path: 'view-wfh-request',
    loadChildren: () => import('./pages/view-wfh-request/view-wfh-request.module').then( m => m.ViewWFHRequestPageModule)
  },
  {
    path: 'view-on-duty-request',
    loadChildren: () => import('./pages/view-on-duty-request/view-on-duty-request.module').then( m => m.ViewOnDutyRequestPageModule)
  },
  {
    path: 'leave-details',
    loadChildren: () => import('./pages/leave-details/leave-details.module').then( m => m.LeaveDetailsPageModule)
  },
  {
    path: 'attendance-regularization',
    loadChildren: () => import('./pages/attendance-regularization/attendance-regularization.module').then( m => m.AttendanceRegularizationPageModule)
  },
  {
    path: 'demo-attachments',
    loadChildren: () => import('./pages/demo-attachments/demo-attachments.module').then( m => m.DemoAttachmentsPageModule)
  },
  {
    path: 'claim-entry',
    loadChildren: () => import('./pages/claim-entry/claim-entry.module').then( m => m.ClaimEntryPageModule)
  },
  {
    path: 'claim-entry-details',
    loadChildren: () => import('./pages/claim-entry-details/claim-entry-details.module').then( m => m.ClaimEntryDetailsPageModule)
  },
  {
    path: 'view-claim-entry',
    loadChildren: () => import('./pages/view-claim-entry/view-claim-entry.module').then( m => m.ViewClaimEntryPageModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('./pages/maps/maps.module').then( m => m.MapsPageModule)
  },
  {
    path: 'maps/:type',
    loadChildren: () => import('./pages/maps/maps.module').then(m => m.MapsPageModule)
  },   {
    path: 'payslip',
    loadChildren: () => import('./pages/payslip/payslip.module').then( m => m.PayslipPageModule)
  },
  {
    path: 'it-computation',
    loadChildren: () => import('./pages/it-computation/it-computation.module').then( m => m.ITComputationPageModule)
  },
  {
    path: 'ytd-statement',
    loadChildren: () => import('./pages/ytd-statement/ytd-statement.module').then( m => m.YTDStatementPageModule)
  },
  {
    path: 'id-card',
    loadChildren: () => import('./pages/id-card/id-card.module').then( m => m.IDCardPageModule)
  },
  {
    path: 'esic-card',
    loadChildren: () => import('./pages/esic-card/esic-card.module').then( m => m.ESICCardPageModule)
  },
  {
    path: 'insurance-card',
    loadChildren: () => import('./pages/insurance-card/insurance-card.module').then( m => m.InsuranceCardPageModule)
  },
  {
    path: 'attendance-register',
    loadChildren: () => import('./pages/attendance-register/attendance-register.module').then( m => m.AttendanceRegisterPageModule)
  },
  {
    path: 'claims-register',
    loadChildren: () => import('./pages/claims-register/claims-register.module').then( m => m.ClaimsRegisterPageModule)
  },
  {
    path: 'leave-register',
    loadChildren: () => import('./pages/leave-register/leave-register.module').then( m => m.LeaveRegisterPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'view-help',
    loadChildren: () => import('./pages/view-help/view-help.module').then( m => m.ViewHelpPageModule)
  },
  {
    path: 'help-items',
    loadChildren: () => import('./pages/help-items/help-items.module').then( m => m.HelpItemsPageModule)
  },
  {
    path: 'induction-deck',
    loadChildren: () => import('./pages/induction-deck/induction-deck.module').then( m => m.InductionDeckPageModule)
  },
  {
    path: 'manager-dashboard',
    loadChildren: () => import('./pages/manager-dashboard/manager-dashboard.module').then( m => m.ManagerDashboardPageModule)
  },
  {
    path: 'manager-dash-employee-details',
    loadChildren: () => import('./pages/manager-dash-employee-details/manager-dash-employee-details.module').then( m => m.ManagerDashEmployeeDetailsPageModule)
  },
  {
    path: 'resignation-request',
    loadChildren: () => import('./pages/resignation-request/resignation-request.module').then( m => m.ResignationRequestPageModule)
  },
  {
    path: 'new-password',
    loadChildren: () => import('./pages/new-password/new-password.module').then( m => m.NewPasswordPageModule)
  },
  {
    path: 'regularization-register',
    loadChildren: () => import('./pages/regularization-register/regularization-register.module').then( m => m.RegularizationRegisterPageModule)
  },
  {
    path: 'exit-employees-register',
    loadChildren: () => import('./pages/exit-employees-register/exit-employees-register.module').then( m => m.ExitEmployeesRegisterPageModule)
  },
  {
    path: 'letters',
    loadChildren: () => import('./pages/letters/letters.module').then( m => m.LettersPageModule)
  },
  {
    path: 'view-regularization-register',
    loadChildren: () => import('./pages/view-regularization-register/view-regularization-register.module').then( m => m.ViewRegularizationRegisterPageModule)
  },
  {
    path: 'policy-documents',
    loadChildren: () => import('./pages/policy-documents/policy-documents.module').then( m => m.PolicyDocumentsPageModule)
  },
  {
    path: 'photo-viewer',
    loadComponent: () => import('./pages/photo-viewer/photo-viewer.page').then( m => m.PhotoViewerPage)
  },
  {
    path: 'weekly-off',
    loadChildren: () => import('./pages/weekly-off/weekly-off.module').then( m => m.WeeklyOffPageModule)
  },
  {
    path: 'view-weekly-off',
    loadChildren: () => import('./pages/view-weekly-off/view-weekly-off.module').then( m => m.ViewWeeklyOffPageModule)
  },
  // {
  //   path: 'upcoming-employee-leave',
  //   loadChildren: () => import('./pages/').then( m => m.UpcomingEmployeeLeavePageModule)
  // },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule] 
})
export class AppRoutingModule {}
