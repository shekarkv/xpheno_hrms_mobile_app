import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.page.html',
  styleUrls: ['./leave-details.page.scss'],
})
export class LeaveDetailsPage implements OnInit {
  loginData: any;
  empData: any;
  employee: any;
  from_date: any;
  leave_details: any;
  leave_int_code: any;
  page_name: string;
  short_name: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController, 
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData'));  
    this.employee = this.loginData['fw_emp_int_code'];
    this.route.queryParams.subscribe(params => {
    this.leave_int_code = params["leave_int_code"];
    this.short_name =params["short_name"];
    this.GetLeaveDetailsForLeaveType();
  });
  
  }

  GetLeaveDetailsForLeaveType() {  
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    // this.saveClicked = true;
    let postData = {
      'employee': this.employee,  
      'leave_int_code': this.leave_int_code,    
      
    };
    this.http.post(this.appCommon.baseAppUrl + "GetLeaveDetailsForLeaveTypeFromMobile", postData)
      .subscribe(response => { 
   
        console.table(response)

        if (response['error_code'] == '0') {

            this.leave_details = response['data'];     

          }   else {
            this.leave_details = [];
            console.log(this.leave_details)
            this.appCommon.presentToast("No Records Found")
          }
  
        }, error => {
          this.leave_details = [];
          this.appCommon.presentAlert(error)
      });
  }

}
