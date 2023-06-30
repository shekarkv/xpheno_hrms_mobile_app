import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-resignation-request',
  templateUrl: './resignation-request.page.html',
  styleUrls: ['./resignation-request.page.scss'],
})
export class ResignationRequestPage implements OnInit {
  loginData: any;
  empData: any;
  employee: any;
  saveClicked: boolean = false;
  d_date: any;
  request_no: any;
  last_working_day: any;  
  reason_for_exit: any;
  gedit_int_code: any;
  current_date: any;

  constructor(   
    public http: HttpClient,
    public appCommon: AppCommon,) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData'));
    this.employee = this.loginData['fw_emp_int_code'];
    this.current_date = this.loginData['fw_current_date'];
  }

  clearFields() {
    this.gedit_int_code = '0';
    this.d_date = '';
    this.request_no = '';
    this.last_working_day = '';
    this.reason_for_exit = '';
    this.ngOnInit(); 
  }

  SubmitHelp() {
 
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.saveClicked = true;

    let postData = {
 
      "module_id": "1124",
      "module_name": "resignation_request",
      "gedit_int_code": this.gedit_int_code,
      "user_id": this.loginData['login_int_code'],
      'login_counter': this.loginData['login_counter'],    
      "general": {
          employee: this.employee,
          date: this.d_date,
          request_no: this.request_no,
          last_working_day: this.last_working_day,
          reason_for_exit: this.reason_for_exit,
          // entry_type:"Mobile",
      }
    };
    console.log(JSON.stringify(postData))

    this.http.post(this.appCommon.baseAppUrl + "appInsertUpdateModuleDetails", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {

          this.saveClicked = false;
          this.appCommon.presentAlert(response['data'])
          this.clearFields();
          this.ngOnInit();

        } else {
          this.saveClicked = false;
          this.appCommon.presentToast(response['data']); 
        }

      }, error => {
        this.saveClicked = false;
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
      
  }

}
