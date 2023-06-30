import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-exit-employees-register',
  templateUrl: './exit-employees-register.page.html',
  styleUrls: ['./exit-employees-register.page.scss'],
})
export class ExitEmployeesRegisterPage implements OnInit {


  tabs: string;
  loginData: any;
  empData: any;
  employee_data: any;
  employee: any;
  d_date: any;

  constructor(
    public http: HttpClient, 
    public appCommon: AppCommon,
  ) { }

  ngOnInit() {
    this.tabs = 'pending'
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData'));    
    this.employee = this.loginData['fw_emp_int_code'];
    this.GetApproveRegister();
  }

  GetApproveRegister() {
    let postData = {
      "user_id": this.loginData['login_int_code'],
      'employee':  this.loginData['fw_emp_int_code'], 
      'fw_cand_emp_type':  this.loginData['fw_cand_emp_type'],  
      'fw_repmgr_code':  this.loginData['fw_repmgr_code'],   
      'date' : this.d_date,
    }
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.http.post(this.appCommon.baseAppUrl + "GeExitEmployeesListFromMobile", postData)
      .subscribe(response => {

        console.table(response) 

        if (response['error_code'] == '0') {

          this.employee_data = response['data']['exit_data'];   

          // alert(response['data']['date']); 
          
          if(response['data']['date'] != '')
            this.d_date = response['data']['date']       

        } else {
          this.employee_data = [];
          this.appCommon.presentToast("No Records Found")
        }

      }, error => {  
        this.employee_data = [];
        this.appCommon.presentAlert(error)
      });
  }


  GetMonthWiseData() {
    this.GetApproveRegister();
  }


}
