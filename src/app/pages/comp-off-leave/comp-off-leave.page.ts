import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { FrameworkReferenceFieldPage } from '../framework-reference-field/framework-reference-field.page';

@Component({
  selector: 'app-comp-off-leave',
  templateUrl: './comp-off-leave.page.html',
  styleUrls: ['./comp-off-leave.page.scss'],
})
export class CompOffLeavePage implements OnInit {
  loginData: any;
  employee: any;
  txt_ref_schema_employee: any;
  leave_day: any;
  comp_off_request: any;
  txt_ref_schema_comp_off_request: any;
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
      this.leave_day = '';
      this.comp_off_request = '';
      this.txt_ref_schema_comp_off_request = '';
      this.reason = '';
      this.ngOnInit();
    }

    async getCompOffReferenceData() {
      if (navigator.onLine) {
        //CONTINUE
      } else {
        this.appCommon.presentNoInternetToast('No Network Connection');
        return false;
      }
  
      const modal = await this.modalController.create({
        component: FrameworkReferenceFieldPage,
        componentProps: {
          pop_up_table_name: 'comp_off_request',
          calling_table_name: 'comp_off_leave',
          system_name: 'comp_off_request',
          value: '',
          ref_search_value: 0, 
          search_ref_module_db_field: 0,
          all_data_obj:{employee:this.employee,leave_day:this.leave_day} 
        }
      });
      modal.onDidDismiss().then((dataReturned) => {   
  
        console.table('Ref Data Received' + JSON.stringify(dataReturned));
  
        if (dataReturned['data']['internal_code'] > 0) {
          this.comp_off_request = dataReturned['data']['internal_code'];
          this.txt_ref_schema_comp_off_request = dataReturned['data']['value'];
        }
      });
      return await modal.present();
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
  
        "module_id": "1093",
        "module_name": "comp_off_leave",
        "gedit_int_code": this.gedit_int_code,
        "user_id": this.loginData['login_int_code'],
        'login_counter': this.loginData['login_counter'],
        "general": {
            employee: this.employee,
            leave_day: this.leave_day,
            comp_off_request: this.comp_off_request,
            reason: this.reason,
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
