import { Component, OnInit } from '@angular/core';
import { AppCommon } from 'src/app/app.common';
import { HttpClient } from '@angular/common/http';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-framework-reference-field',
  templateUrl: './framework-reference-field.page.html',
  styleUrls: ['./framework-reference-field.page.scss'],
})
export class FrameworkReferenceFieldPage implements OnInit {

  loginData: any;

  pop_up_table_name: any
  calling_table_name: any;
  system_name: any;
  value: any;
  ref_search_value: any;
  search_ref_module_db_field: any;
  all_data_obj:any;
  search_val: any;

  data_list: any = [];

  constructor(
    public http: HttpClient,
    public appCommon: AppCommon,
    public navParams: NavParams,
    private modalController: ModalController,
  ) { }

  ngOnInit() {

    this.loginData = JSON.parse(localStorage.getItem('loginData'));

    console.table(this.navParams)
    this.pop_up_table_name = this.navParams.get('pop_up_table_name');
    this.calling_table_name = this.navParams.get('calling_table_name');
    this.system_name = this.navParams.get('system_name');
    this.value = this.navParams.get('value');
    this.ref_search_value = this.navParams.get('ref_search_value');
    this.search_ref_module_db_field = this.navParams.get('search_ref_module_db_field');
    this.all_data_obj= this.navParams.get('all_data_obj');
    this.search_val = '';

    this.getReferenceList(this.value);
  }

  getItems(ev: any) {
    this.search_val = ev.target.value;
    this.getReferenceList(this.search_val)
  }

  getReferenceList(search_string: any) {

    this.data_list = [];

    let postData = {
      'login_int_code': this.loginData['login_int_code'],
      'login_counter': this.loginData['login_counter'],
      'pop_up_table_name': this.pop_up_table_name,
      'calling_table_name': this.calling_table_name,
      'system_name': this.system_name,
      'value': search_string,
      'ref_search_value': this.ref_search_value,
      'search_ref_module_db_field': this.search_ref_module_db_field,
      'all_data_obj': this.all_data_obj,
    }

    this.http.post(this.appCommon.baseAppUrl + "appGetReferenceFieldDataValues", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {

          this.data_list = response['data'];

        } else {
          this.appCommon.presentToast(response['status']);
        }

      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

  async closeModal(internal_code: any, value: any) {

    const onClosedData: any = {
      'internal_code': ''
    };
    await this.modalController.dismiss(onClosedData);
  }

  async submitItemData(internal_code: any, value: any) {

    const onClosedData: any = {
      'internal_code': internal_code,
      'value': value
    };
    console.log("Selected Value->" + JSON.stringify(onClosedData))
    await this.modalController.dismiss(onClosedData);
  }

}
