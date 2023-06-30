import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavParams, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { RadioButtonService } from 'src/app/services/radio-button-service';
import { ToastService } from 'src/app/services/toast-service';
import { FrameworkGridViewPage } from '../framework-grid-view/framework-grid-view.page';
import { FrameworkReferenceFieldPage } from '../framework-reference-field/framework-reference-field.page';

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.page.html',
  styleUrls: ['./demo-form.page.scss'],
})
export class DemoFormPage implements OnInit {

  firstname: any;
  address: any;
  zipcode: any;
  d_date: any;
  male: any;
  female: any;
  degree: any;
  entry_no: any;
  employee_name: any;
  txt_ref_schema_employee_name: any;
  city: any;
  loginData: any;
  gedit_int_code: any;
  saveClicked: boolean = false;
  module: any = 'demo_form';
  isModal: boolean = false;
  employee: any;

  constructor(  public alertController: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public appCommon: AppCommon,
    private toastCtrl: ToastService,
    private service: RadioButtonService,
    public modalController: ModalController,) {

      this.isModal = this.navParams.get('isModal');
     }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.employee = this.loginData['fw_emp_int_code'];
  }

  clearFields() {
    this.gedit_int_code = '0';
    this.firstname = ''
    this.address = ''
    this.zipcode = ''
    this.d_date = ''
    this.male = ''
    this.female = ''
    this.degree = ''
    this.entry_no = ''
    this.city = ''
    this.employee_name = '0'
    this.txt_ref_schema_employee_name = ''
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
        calling_table_name: 'demo_form',
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
        this.employee_name = dataReturned['data']['internal_code'];
        this.txt_ref_schema_employee_name = dataReturned['data']['value'];
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

      "module_id": "1079",
      "module_name": "demo_form",
      "gedit_int_code": this.gedit_int_code,
      "user_id": this.loginData['login_int_code'],
      'login_counter': this.loginData['login_counter'],
      "general": {
        firstname: this.firstname,
        address: this.address,
        zipcode: this.zipcode,
        date: this.d_date,
        male: this.male,
        female: this.female,
        degree: this.degree,
        entry_no: this.entry_no,
        employee_name: this.employee_name,
        city: this.city,
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
          this.appCommon.presentToast(response['status']);
        }

      }, error => {
        this.saveClicked = false;
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

  async viewData() {

    const modal = await this.modalController.create({
      component: FrameworkGridViewPage,
      // cssClass: 'my-custom-modal-css',
      componentProps: { 
        "module_id": "1079",
        "table_name": "demo_form"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      this.gedit_int_code = dataReturned['data']['internal_code']
      console.log('Data Received:', this.gedit_int_code);
      this.editRecord();
    });

    return await modal.present();

  }

  editRecord() {

    let postData = {
      'internal_code': this.gedit_int_code
    }

    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    this.http.post(this.appCommon.baseAppUrl + "appGetFormDataFromDB", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {

          this.firstname = response['data']['firstname']
          this.address = response['data']['address']
          this.zipcode = response['data']['zipcode']
          this.d_date = response['data']['date']
          this.male = response['data']['male']
          this.female = response['data']['female']
          this.female = response['data']['degree']
          this.entry_no = response['data']['entry_no']
          this.employee_name = response['data']['employee_name']
          this.txt_ref_schema_employee_name = response['data']['txt_ref_schema_employee_name']
          this.city = response['data']['city']
          
        } else {
          this.appCommon.presentToast(response['status']);
        }

      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }
  
  onItemClick(params): void {
    this.toastCtrl.presentToast("onItemClick:" + JSON.stringify(params));
  }

  onItemClickFun(params): void {
    this.toastCtrl.presentToast("onItemClickFun:" + JSON.stringify(params));
  }

  close() {
    this.modalController.dismiss();
  }
}  
