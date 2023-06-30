import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-attendance-regularization',
  templateUrl: './attendance-regularization.page.html',
  styleUrls: ['./attendance-regularization.page.scss'],
})
export class AttendanceRegularizationPage implements OnInit {

  d_date: any;
  in_time: any;
  out_time: any;
  reason: any;
  loginData: any;
  saveClicked: boolean = false;
  gedit_int_code: any;
  employee: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router,) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.employee = this.loginData['fw_emp_int_code'];
  }

  clearFields() {
    this.gedit_int_code = '0';
    this.d_date = ''
    this.in_time = ''
    this.out_time = ''
    this.reason = ''
    this.ngOnInit();
  }

  SaveAttendanceReguralization() {

    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.saveClicked = true;
    let postData = {

      "module_id": "1097",
      "module_name": "attendance_regularization",  
      "gedit_int_code": this.gedit_int_code,
      "user_id": this.loginData['login_int_code'],
      'login_counter': this.loginData['login_counter'],
      "general": {
        employee: this.employee,
        date: this.d_date, 
        in_time: this.in_time,    
        out_time: this.out_time,
        reason: this.reason, 
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

  nextpage() {
    this.route.navigate(['/view-regularization-register']);
  }

}
