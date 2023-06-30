import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-weekly-off',
  templateUrl: './weekly-off.page.html',
  styleUrls: ['./weekly-off.page.scss'],
})
export class WeeklyOffPage implements OnInit {

  weekly_off_date: any;
  notes: any;
  loginData: any;
  saveClicked: boolean = false;
  gedit_int_code: any;
  employee: any;
  empData: any;
  fw_emp_name: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData')); 
    this.employee = this.loginData['fw_emp_int_code'];
    this.fw_emp_name = this.loginData['fw_emp_name'];
  }

  clearFields() {
    this.gedit_int_code = '0';
    this.weekly_off_date = '';
    this.notes = '';
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
      "module_name": "emp_weekly_off",
      "gedit_int_code": this.gedit_int_code,
      "user_id": this.loginData['login_int_code'],
      'login_counter': this.loginData['login_counter'],
      "general": {
        employee: this.employee,
        weekly_off_date: this.weekly_off_date, 
        notes: this.notes, 
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
          this.clearFields();

        } else {
          this.saveClicked = false;
          this.appCommon.presentToast(response['data']);
          // this.clearFields();
        }

      }, error => {
        this.saveClicked = false;
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

  viewweeklyoffpage() {
    this.route.navigate(['/view-weekly-off']);
  }

}
