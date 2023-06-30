import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { FrameworkReferenceFieldPage } from '../framework-reference-field/framework-reference-field.page';

@Component({
  selector: 'app-employee-profile-edit',
  templateUrl: './employee-profile-edit.page.html',
  styleUrls: ['./employee-profile-edit.page.scss'],
})
export class EmployeeProfileEditPage implements OnInit {
  pe_anniversary: any; 
  saveClicked: boolean = false;
  gedit_int_code: any;
  loginData: any;
  mobile: any;
  name: any;
  pr_address: any;
  pr_pin: any;
  emergency_contact_name: any;
  ec_relation: any;
  ec_phone: any;
  ec_mail: any;
  ec_pincode: any;
  pe_bank_name: any;
  pe_bank_account: any;
  pe_bank_ifsc_code: any;
  pe_bank_branch: any;
  ec_address: any; 
  pe_marital_status: any;
  pr_city: any;
  txt_ref_schema_pr_city: any;
  pr_state: any;
  pr_country: any;
  ec_city: any;   
  ec_state: any;
  txt_ref_schema_ec_state: any;
  txt_ref_schema_pr_state: any;
  txt_ref_schema_pr_country: any;
  txt_ref_schema_ec_city: any;
  marital_status: any;
  bank_name: any;
  bank_account: any;
  bank_ifsc_code: any;
  bank_branch: any;
  anniversary: any;
  employee: any;
  txt_ref_schema_employee: any;
  empData: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData'));

    this.employee = this.loginData['fw_emp_int_code']; 
    this.txt_ref_schema_employee = this.loginData['fw_emp_name'];
    this.getData();
  }

  
  async getCityReferenceData() {
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    const modal = await this.modalController.create({
      component: FrameworkReferenceFieldPage,
      componentProps: {
        pop_up_table_name: 'pincode_master',
        calling_table_name: 'profile_changes',
        system_name: '',
        value: '',
        ref_search_value: 0,
        search_ref_module_db_field: 0
      }
    });
    modal.onDidDismiss().then((dataReturned) => {   

      console.table('Ref Data Received' + JSON.stringify(dataReturned));

      if (dataReturned['data']['internal_code'] > 0) {
        this.pr_city = dataReturned['data']['internal_code'];
        this.txt_ref_schema_pr_city = dataReturned['data']['value'];
      }
    });
    return await modal.present();
  }

  async getStateReferenceData() {
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    const modal = await this.modalController.create({
      component: FrameworkReferenceFieldPage,
      componentProps: {
        pop_up_table_name: 'state',
        calling_table_name: 'profile_changes',
        system_name: '',
        value: '',
        ref_search_value: 0,
        search_ref_module_db_field: 0
      }
    });
    modal.onDidDismiss().then((dataReturned) => {   

      console.table('Ref Data Received' + JSON.stringify(dataReturned));

      if (dataReturned['data']['internal_code'] > 0) {
        this.pr_state = dataReturned['data']['internal_code'];
        this.txt_ref_schema_pr_state = dataReturned['data']['value'];
      }
    });
    return await modal.present();
  }

  async getCountryReferenceData() {
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    const modal = await this.modalController.create({
      component: FrameworkReferenceFieldPage,
      componentProps: {
        pop_up_table_name: 'country',
        calling_table_name: 'profile_changes',
        system_name: '',
        value: '',
        ref_search_value: 0,
        search_ref_module_db_field: 0
      }
    });
    modal.onDidDismiss().then((dataReturned) => {   

      console.table('Ref Data Received' + JSON.stringify(dataReturned));

      if (dataReturned['data']['internal_code'] > 0) {
        this.pr_country = dataReturned['data']['internal_code'];
        this.txt_ref_schema_pr_country = dataReturned['data']['value'];
      }
    });
    return await modal.present();
  }

  async getEcCityReferenceData() {
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    const modal = await this.modalController.create({
      component: FrameworkReferenceFieldPage,
      componentProps: {
        pop_up_table_name: 'pincode_master',
        calling_table_name: 'profile_changes',
        system_name: '',
        value: '',
        ref_search_value: 0,
        search_ref_module_db_field: 0
      }
    });
    modal.onDidDismiss().then((dataReturned) => {   

      console.table('Ref Data Received' + JSON.stringify(dataReturned));

      if (dataReturned['data']['internal_code'] > 0) {
        this.ec_city = dataReturned['data']['internal_code'];
        this.txt_ref_schema_ec_city = dataReturned['data']['value'];
      }
    });
    return await modal.present();
  }

  async getEcStateReferenceData() {
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    const modal = await this.modalController.create({
      component: FrameworkReferenceFieldPage,
      componentProps: {
        pop_up_table_name: 'state',
        calling_table_name: 'profile_changes',
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
        this.ec_state = dataReturned['data']['internal_code'];
        this.txt_ref_schema_ec_state = dataReturned['data']['value'];
      }
    });
    return await modal.present();
  }

  getData(){

      this.anniversary = this.empData['anniversary'];
      this.mobile = this.empData['mobile'];
      this.name = this.empData['name'];
      this.pr_address = this.empData['pr_address'];
      this.pr_pin = this.empData['pr_pin']; 
      this.emergency_contact_name = this.empData['emergency_contact_name']; 
      this.ec_relation = this.empData['ec_relation'];
      this.ec_phone = this.empData['ec_phone']; 
      this.ec_mail = this.empData['ec_mail'];
      // this.ec_mail = this.empData['email']; 
      this.ec_pincode = this.empData['ec_pincode']; 
      this.ec_address = this.empData['ec_address'];
      this.marital_status = this.empData['marital_status'];
      this.bank_name = this.empData['bank_name'];
      this.bank_account = this.empData['bank_account']; 
      this.bank_ifsc_code = this.empData['bank_ifsc_code']; 
      this.bank_branch = this.empData['bank_branch']; 
      this.pr_city = this.empData['pr_city']; 
      this.txt_ref_schema_pr_city = this.empData['txt_ref_schema_pr_city'];
      this.pr_state = this.empData['pr_state'];
      this.txt_ref_schema_pr_state = this.empData['txt_ref_schema_pr_state']; 
      this.pr_country = this.empData['pr_country']; 
      this.txt_ref_schema_pr_country = this.empData['txt_ref_schema_pr_country'];
      this.ec_city = this.empData['ec_city'];
      this.txt_ref_schema_ec_city = this.empData['txt_ref_schema_ec_city'];
      this.ec_state = this.empData['ec_state'];
      this.txt_ref_schema_ec_state = this.empData['txt_ref_schema_ec_state']; 
   
  }

  Save() {

    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.saveClicked = true;
    let postData = {

      "module_id": "1088", 
      "module_name": "profile_changes",
      "gedit_int_code": this.gedit_int_code,
      "user_id": this.loginData['login_int_code'],
      'login_counter': this.loginData['login_counter'],
      "general": {
        mobile: this.mobile, 
        name: this.employee,    
        pe_marital_status: this.marital_status,
        pe_anniversary: this.anniversary, 
        pe_bank_name: this.bank_name, 
        pe_bank_account: this.bank_account,
        pe_bank_ifsc_code: this.bank_ifsc_code, 
        pe_bank_branch: this.bank_branch,  
        pr_address: this.pr_address,
        pr_pin: this.pr_pin,
        emergency_contact_name: this.emergency_contact_name,
        ec_relation: this.ec_relation,
        ec_phone: this.ec_phone,
        ec_mail: this.ec_mail,
        ec_address: this.ec_address,
        ec_pincode: this.ec_pincode,
        pr_city: this.pr_city,
        pr_state: this.pr_state,
        pr_country: this.pr_country,
        ec_city: this.ec_city,
        ec_state: this.ec_state,
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
  
  async close() {
    const onClosedData: any = {
      'internal_code': '0'
    };
    await this.modalController.dismiss(onClosedData);
  }

}
