import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { FrameworkReferenceFieldPage } from '../framework-reference-field/framework-reference-field.page';

@Component({
  selector: 'app-profile-changes',
  templateUrl: './profile-changes.page.html',
  styleUrls: ['./profile-changes.page.scss'],
})
export class ProfileChangesPage implements OnInit {

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
  login_real_name: any;
  employee_name: string;
  blood_group: any;
  pan_number: any;


  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData')); 
    this.GetEmployeeProfileChangesFromMobile();
  } 

  
  GetEmployeeProfileChangesFromMobile(){
    
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    // this.saveClicked = true;
    let postData = {

      'employee':  this.loginData['fw_emp_int_code']
      
    };
    

    this.http.post(this.appCommon.baseAppUrl + "GetEmployeeProfileChangesFromMobile", postData)
      .subscribe(response => {

        console.table(response) 

    
        if (response['error_code'] == '0') {

          this.saveClicked = false;
          this.employee_name = response['data']['employee_code'] + '-' + response['data']['employee_name']
          this.gedit_int_code = response['data']['gedit_int_code']
          this.mobile = response['data']['mobile']
          this.pr_address = response['data']['pr_address']
          this.pr_pin = response['data']['pr_pin']
          this.emergency_contact_name = response['data']['emergency_contact_name']
          this.marital_status = response['data']['marital_status']
          this.anniversary = response['data']['anniversary']
          this.bank_name = response['data']['bank_name']
          this.bank_account = response['data']['bank_account']
          this.bank_ifsc_code = response['data']['bank_ifsc_code']
          this.bank_branch = response['data']['bank_branch'] 
          this.ec_relation = response['data']['ec_relation']
          this.ec_phone = response['data']['ec_phone']
          this.ec_mail = response['data']['ec_mail']
          this.ec_address = response['data']['ec_address']
          this.ec_pincode = response['data']['ec_pincode']
          this.blood_group = response['data']['blood_group'] 
          this.pr_city = response['data']['pr_city']
          this.txt_ref_schema_pr_city = response['data']['txt_ref_schema_pr_city']
          this.pr_state = response['data']['pr_state']
          this.txt_ref_schema_pr_state = response['data']['txt_ref_schema_pr_state']
          this.pr_country = response['data']['pr_country']
          this.txt_ref_schema_pr_country = response['data']['txt_ref_schema_pr_country']
          this.ec_city = response['data']['ec_city']
          this.txt_ref_schema_ec_city = response['data']['txt_ref_schema_ec_city']  
          this.ec_state = response['data']['ec_state']
          this.txt_ref_schema_ec_state = response['data']['txt_ref_schema_ec_state']
          this.pan_number = response['data']['pan_number']
        
 
        } else {
          this.saveClicked = false;
         
        }

      }, error => {
        // this.saveClicked = false;
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
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
        search_ref_module_db_field: 0,
        all_data_obj:{employee:this.employee}
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
        search_ref_module_db_field: 0,
        all_data_obj:{employee:this.employee}
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
        search_ref_module_db_field: 0,
        all_data_obj:{employee:this.employee}
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
        search_ref_module_db_field: 0,
        all_data_obj:{employee:this.employee}
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

  SaveProfileChanges() {

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
        employee: this.loginData['fw_emp_int_code'],
        marital_status: this.marital_status,
        anniversary: this.anniversary, 
        bank_name: this.bank_name, 
        bank_account: this.bank_account,
        bank_ifsc_code: this.bank_ifsc_code, 
        bank_branch: this.bank_branch,  
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
        blood_group: this.blood_group, 
        pan_number: this.pan_number, 
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
          this.appCommon.presentToast(response['data']);
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

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.ngOnInit();
    }, 2000);
  };

}
