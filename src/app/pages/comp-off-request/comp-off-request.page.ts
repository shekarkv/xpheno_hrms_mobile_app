import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-comp-off-request',
  templateUrl: './comp-off-request.page.html',
  styleUrls: ['./comp-off-request.page.scss'],
})
export class CompOffRequestPage implements OnInit {
  loginData: any;
  employee: any;
  txt_ref_schema_employee: any;
  holiday_date: any;
  half_day: any;
  reason: any;
  saveClicked: boolean = false;
  gedit_int_code: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,) { }

    ngOnInit() {
      this.loginData = JSON.parse(localStorage.getItem('loginData'));
  
      this.employee = this.loginData['fw_emp_int_code'];
      this.txt_ref_schema_employee = this.loginData['fw_emp_name'];
    }

    clearFields() {
      this.gedit_int_code = '0';
      this.holiday_date = '';
      this.half_day = '';
      this.reason = '';
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
  
      let half_day = "No"; 
      
      if(this.half_day){
        half_day = "Yes"; 
      }
      let postData = {
  
        "module_id": "1092",
        "module_name": "comp_off_request",
        "gedit_int_code": this.gedit_int_code,
        "user_id": this.loginData['login_int_code'],
        'login_counter': this.loginData['login_counter'],
        "general": {
            employee: this.employee,
            holiday_date: this.holiday_date,
            reason: this.reason,
            half_day: half_day,
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
