import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { FrameworkReferenceFieldPage } from '../framework-reference-field/framework-reference-field.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wfh-request',
  templateUrl: './wfh-request.page.html',
  styleUrls: ['./wfh-request.page.scss'],
})
export class WFHRequestPage implements OnInit {
  loginData: any;
  gedit_int_code: string;
  employee: any;
  txt_ref_schema_employee: any;
  start_date: any;
  end_date: any;
  reason: any;
  saveClicked: boolean = false;

  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.employee = this.loginData['fw_emp_int_code'];
    this.txt_ref_schema_employee = this.loginData['fw_emp_name'];
  }

  clearFields() {
    this.gedit_int_code = '0';
    this.ngOnInit();
  }

  async getEmployeeReferenceData() {
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    const modal = await this.modalController.create({
      component: FrameworkReferenceFieldPage,
      componentProps: {
        pop_up_table_name: 'employee',
        calling_table_name: 'wfh_request',
        system_name: '',
        value: '',
        ref_search_value: 0,
        search_ref_module_db_field: 0,
        all_data_obj:{employee:this.employee}
      }
    });
    modal.onDidDismiss().then((dataReturned) => {   

      console.table('Ref Data Received' + JSON.stringify(dataReturned));

      if (dataReturned['data']['internal_code'] > 0) {
        this.employee = dataReturned['data']['internal_code'];
        this.txt_ref_schema_employee = dataReturned['data']['value'];
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

      "module_id": "1090",
      "module_name": "wfh_request",
      "gedit_int_code": this.gedit_int_code,
      "user_id": this.loginData['login_int_code'],
      'login_counter': this.loginData['login_counter'],
      "general": {
        start_date: this.start_date,
        end_date: this.end_date, 
        reason: this.reason,
        entry_type:"Mobile",
        employee: this.employee,
      },
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
          this.appCommon.presentToast(response['status']);
        }

      }, error => {
        this.saveClicked = false;
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

  nextpage() {
    this.route.navigate(['/view-wfh-request']);
  }

}
