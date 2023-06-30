import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { LoadingService } from 'src/app/services/loading-service';

@Component({
  selector: 'app-manager-dash-employee-details',
  templateUrl: './manager-dash-employee-details.page.html',
  styleUrls: ['./manager-dash-employee-details.page.scss'],
})
export class ManagerDashEmployeeDetailsPage implements OnInit {
  details: any[];
  loginData: any;
  empData: any;
  employee: any;
  name: any;
  email: any;
  mobile: any;
  father_name: any;
  blood_group: any;
  ec_address: any;
  ec_phone: any;
  pan_number: any;
  aadhar_number: any;
  photo: any;
  eisc_number: any;
  leave_taken: any;
  no_of_days_checked_in: any;

  constructor( private navParams: NavParams,
    public appCommon: AppCommon,
    private modalController: ModalController,
    public http: HttpClient,
    private loadingService: LoadingService,
    public alertController: AlertController,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData'));  
    // this.employee = this.loginData['fw_emp_int_code'];
    this.route.queryParams.subscribe(params => {
    this.employee = params["employee"];
    this.GetEmployeeDetails();
  });
  }
 
  GetEmployeeDetails() {
 
    let postData = {
      'employee': this.employee,
    }; 

    this.http.post(this.appCommon.baseAppUrl + "GetEmployeeDashboardDetailsFromMobile", postData)
      .subscribe(response => {

        if (response['error_code'] == '0') { 
          this.details = response['data']; 
        }
        else {
          this.details = [];
          // this.closeModal();
        }

      }, error => {
        this.appCommon.presentAlert(error)
      });
  }

}
