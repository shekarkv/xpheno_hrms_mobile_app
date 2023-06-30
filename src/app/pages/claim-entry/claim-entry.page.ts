import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { FrameworkReferenceFieldPage } from '../framework-reference-field/framework-reference-field.page';
import {OnChanges, Output, EventEmitter } from "@angular/core";
import { FrameworkGridViewPage } from '../framework-grid-view/framework-grid-view.page';
import { ClaimEntryDetailsPage } from '../claim-entry-details/claim-entry-details.page';

@Component({
  selector: 'app-claim-entry',
  templateUrl: './claim-entry.page.html',
  styleUrls: ['./claim-entry.page.scss'],
})
export class ClaimEntryPage implements OnInit {

  tabs: any;
  entry_no: any;
  txt_ref_schema_leave_type: any;  
  d_date: any;
  client: any;
  txt_ref_schema_client: any;
  claim_type: any;
  city_category: any;
  start_date: any;
  end_date: any;
  show_city_cat: boolean = true;
  show_date: boolean = true;
  payload = {
    claim_entry_details_group: []
  }
  gedit_int_code: any;
  group_int_code: any;
  module: any = 'claim_entry';
  claim_date: any;
  component: any;
  txt_ref_schema_component: any;
  kilometers: any;
  from_place: any;
  to_place: any;
  amount: any;
  saveClicked: boolean = false;
  loginData: any;
  employee: any;
  txt_ref_schema_employee: any;
  items_clicked: boolean;
  getting_item_data: boolean;
  look_up_value_list: any;
  date: any;
  remarks: any;
  empData: any;
  internal_code: any;
  attachment1: any;
  claim_list: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    ) { } 

  ngOnInit() {
    this.tabs = 'claims'
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData'));   
    this.employee = this.loginData['fw_emp_int_code'];
    this.txt_ref_schema_employee = this.loginData['fw_emp_name'];

    this.activatedRoute.queryParams.subscribe(params => {
      this.gedit_int_code = params["internal_code"];
      if((this.gedit_int_code)>=0){
        this.GetClaimEntryEditDetails(); 
        // alert(this.gedit_int_code);
      }
      
    });
    
    // this.getLookUpValueList(); 
    this.GetClaimCatagoryList();
  }

  clearFields() {
    this.gedit_int_code = '0';
    this.d_date = '';
    this.start_date = '';
    this.end_date = '';
    this.entry_no = '';
    this.claim_type = '';
    this.city_category = '';
    this.payload.claim_entry_details_group = [];
    this.ngOnInit();
  }

  async getClientReferenceData() {
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    const modal = await this.modalController.create({
      component: FrameworkReferenceFieldPage,
      componentProps: {
        pop_up_table_name: 'client_master',
        calling_table_name: 'claim_entry',
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
        this.client = dataReturned['data']['internal_code'];
        this.txt_ref_schema_client = dataReturned['data']['value'];
      }
    });
    return await modal.present();
  }

  
  getLookUpValueList() {
    
    let postData = {
      'login_int_code': this.loginData['login_int_code'],
      'login_counter': this.loginData['login_counter'],
      'module': this.module,
      'claim_type': this.claim_type,
      'employee': this.loginData['fw_emp_int_code'],
    }

    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    this.http.post(this.appCommon.baseAppUrl + "appGetCityCatagory", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {

          this.look_up_value_list = response['data']['look_up_value_list']
          // this.date = response['data']['current_time']

        } else {
          this.appCommon.presentToast(response['status']);
        }

      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

    async chooseAction(data: any, id: any) {
    const alert = await this.alertController.create({
      message: 'Are Sure You Want To Delete',
      buttons: [
        {
          text: 'Delete',
          cssClass: 'secondary',
          handler: () => {
            this.deleteItem(id);
          }
        },
        //  {
        //   text: 'Edit',
        //   handler: () => {
        //     this.editItems(data, id);
        //   }
        // }
      ]
    });
    await alert.present();
  }

  deleteItem(index: any) {
    this.payload.claim_entry_details_group.splice(index, 1);
  }

  async editItems(row_data: any, index: any) {
    const modal = await this.modalController.create({
      component: ClaimEntryDetailsPage,
      componentProps: {
        "group_int_code": row_data['group_int_code'],
        "claim_date": row_data['claim_date'],
        "component": row_data['component'],
        "txt_ref_schema_component": row_data['txt_ref_schema_component'],
        "kilometers": row_data['kilometers'],
        "from_place": row_data['from_place'],
        "to_place": row_data['to_place'],
        "amount": row_data['amount'],
        "remarks": row_data['remarks'],
        "attachment1": row_data['attachment1'],
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      console.log('Data Received:', dataReturned);
     {
        this.payload.claim_entry_details_group.splice(index, 1);

        this.payload.claim_entry_details_group.push({
          group_int_code: dataReturned['data']['group_int_code'],
          claim_date: dataReturned['data']['claim_date'],
          component: dataReturned['data']['component'],
          txt_ref_schema_component: dataReturned['data']['txt_ref_schema_component'],
          kilometers: dataReturned['data']['kilometers'],
          from_place: dataReturned['data']['from_place'],
          to_place: dataReturned['data']['to_place'],
          amount: dataReturned['data']['amount'],
          remarks: dataReturned['data']['remarks'],
          attachment1: dataReturned['data']['attachment1'],
        });
        this.component = '0';
        this.txt_ref_schema_component = '';
        this.kilometers = '';
        this.from_place = '';
        this.to_place = '';
        this.amount = '';
        this.remarks = '';
        this.attachment1 = '';
        console.log(this.payload.claim_entry_details_group);
      }
    });
    return await modal.present();
  }

  SaveClaimEntry() {

    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    this.saveClicked = true;

    let postData = {
      "module_id": "1065",
      "module_name": "claim_entry",
      "gedit_int_code": this.gedit_int_code,
      "user_id": this.loginData['login_int_code'],
      'login_counter': this.loginData['login_counter'],
      "general": {
        employee: this.loginData['fw_emp_int_code'],
        // date: this.d_date,
        // date: this.loginData['current_time'],
        entry_no: this.entry_no,
        client: this.loginData['fw_client_int_code'],
        claim_type: this.claim_type,
        city_category: this.city_category,
        start_date: this.start_date,
        end_date: this.end_date,
        entry_type: 'Mobile'
      },
      "group_details": {
        claim_entry_details_group: this.payload.claim_entry_details_group
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

  GetClaimEntryEditDetails() {
    let postData = {
      'internal_code': this.gedit_int_code,
      "user_id": this.loginData['login_int_code'],
      'login_counter': this.loginData['login_counter'],
      'employee': this.loginData['fw_emp_int_code'],
    }

    if (navigator.onLine) {
      //CONTINUE 
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
      // 
    this.http.post(this.appCommon.baseAppUrl + "appGetClaimEntryEditFromMobile", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {
         

          this.d_date = response['data']['date']
          this.entry_no = response['data']['entry_no']
          this.employee = response['data']['employee']
          this.txt_ref_schema_employee =response['data']['txt_ref_schema_employee']
          this.client = response['data']['client']
          this.txt_ref_schema_client =response['data']['txt_ref_schema_client']
          this.claim_type = response['data']['claim_type']
          this.city_category = response['data']['city_category']
          this.start_date = response['data']['start_date']
          this.end_date = response['data']['end_date']
          this.payload.claim_entry_details_group = response['data']['claim_entry_details_group']

        } else { 
          this.appCommon.presentToast(response['data']);
        }

      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

  ViewClaimEntryPage() {
    this.route.navigate(['/view-claim-entry']);
  }


  async ClaimEntryDetailsPage() {
    const modal = await this.modalController.create({
      component: ClaimEntryDetailsPage,
      componentProps: {
        claim_type:this.claim_type,
        city_category:this.city_category
      }
      
    });

    modal.onDidDismiss().then((dataReturned) => {
      console.log('Data Received:', dataReturned);
     {
        // this.payload.claim_entry_details_group.splice(index, 1);

        this.payload.claim_entry_details_group.push({
          group_int_code: dataReturned['data']['group_int_code'],
          claim_date: dataReturned['data']['claim_date'],
          component: dataReturned['data']['component'],
          txt_ref_schema_component: dataReturned['data']['txt_ref_schema_component'],
          kilometers: dataReturned['data']['kilometers'],
          from_place: dataReturned['data']['from_place'],
          to_place: dataReturned['data']['to_place'],
          amount: dataReturned['data']['amount'],
          remarks: dataReturned['data']['remarks'],
          attachment1: dataReturned['data']['attachment1'],
        });
        this.component = '0';
        this.txt_ref_schema_component = '';
        this.kilometers = '';
        this.from_place = '';
        this.to_place = '';
        this.amount = '';
        this.remarks = '';
        this.attachment1 = '';
        console.log(this.payload.claim_entry_details_group);
      }
    });
    return await modal.present();
  }

  ShowDetails()
  {
    this.tabs = 'details';
  }

  CheckClaimType()
  {
    this.show_city_cat = true;
    this.show_date = false;
    if(this.claim_type == 'Local Travel' || this.claim_type == 'Reimbursement')
      this.show_city_cat = false;
    if(this.claim_type == 'Overnight Stay')
      this.show_date = true;
  }

  GetClaimCatagoryList() {
    let postData = {
      'employee': this.loginData['fw_emp_int_code'],
    }
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.http.post(this.appCommon.baseAppUrl + "GetClaimCatagoryListFromMobile", postData)
      .subscribe(response => {

        console.table(response) 

        if (response['error_code'] == '0') {

          this.claim_list = response['data']['lov_array']
          console.log(this.claim_list);
        } else {
          this.appCommon.presentToast(response['status']);
        }

      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }
 
}
