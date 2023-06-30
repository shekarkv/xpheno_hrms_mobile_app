import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { ActivatedRoute, NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.page.html',
  styleUrls: ['./manager-dashboard.page.scss'],
})
export class ManagerDashboardPage implements OnInit {
  loginData: any;
  details: any;
  type: any;
  empData: any;
  employee: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController, 
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router,
    private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData'));  
    this.employee = this.loginData['fw_emp_int_code'];
    this.activatedroute.queryParams.subscribe(params => {
    this.type = params["type"];
    this.GetDailyEmployeeDetails();
  });
}

  GetDailyEmployeeDetails() {
    let postData = {
      'employee': this.loginData['fw_emp_int_code'],
      'fw_repmgr_code':  this.loginData['fw_repmgr_code'],
      'type': this.type,    
    }
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.http.post(this.appCommon.baseAppUrl + "GetDailyEmployeeDetailsFromMobile", postData)
      .subscribe(response => {

        console.table(response) 

        if (response['error_code'] == '0') {

          this.details = response['data']

        } else {
          this.details = [];
          console.log(this.details)
          this.appCommon.presentToast("No Records Found")
        }

      }, error => {  
        this.details = [];
        this.appCommon.presentAlert(error)
      });
  }

  OpenEmployeeDetails(employee) {  
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'employee': employee,
      }
  };
    this.route.navigate(['/manager-dash-employee-details'],navigationExtras);
    
  }

}
