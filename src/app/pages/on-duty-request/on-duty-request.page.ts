import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-on-duty-request',
  templateUrl: './on-duty-request.page.html',
  styleUrls: ['./on-duty-request.page.scss'],
})
export class OnDutyRequestPage implements OnInit {

  travel_type: any;
  place_of_visit: any;
  travel_start_date: any;
  travel_end_date: any;
  reason_for_travel: any;
  loginData: any;
  saveClicked: boolean = false;
  gedit_int_code: any;
  employee: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.employee = this.loginData['fw_emp_int_code'];
  }

  clearFields() {
    this.gedit_int_code = '0';
    this.ngOnInit();
  }

  finalSave() {

    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.saveClicked = true;
    let postData = {

      "module_id": "1089",
      "module_name": "on_duty_request",
      "gedit_int_code": this.gedit_int_code,
      "user_id": this.loginData['login_int_code'],
      'login_counter': this.loginData['login_counter'],
      "general": {
        employee: this.employee,
        travel_type: this.travel_type, 
        place_of_visit: this.place_of_visit,    
        travel_start_date: this.travel_start_date,
        travel_end_date: this.travel_end_date, 
        reason_for_travel: this.reason_for_travel, 
        entry_type:"Mobile",
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
          this.appCommon.presentToast(response['status']);
        }

      }, error => {
        this.saveClicked = false;
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

  nextpage() {
    this.route.navigate(['/view-on-duty-request']);
  }

}
