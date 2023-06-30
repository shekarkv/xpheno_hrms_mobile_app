import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/app/services/loading-service';

@Component({
  selector: 'app-approvals-level-three',
  templateUrl: './approvals-level-three.page.html',
  styleUrls: ['./approvals-level-three.page.scss'],
})
export class ApprovalsLevelThreePage implements OnInit {

  loginData: any;
  approval_history_int_code: any;
  module_int_code: any;
  system_module_table_name: any;
  module_id: any;
  display_module_name: any;
  header_data: any;
  items_data: any;
  footer_data: any;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    public appCommon: AppCommon,
    public http: HttpClient,
    private loadingService: LoadingService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.approval_history_int_code = this.navParams.data.approval_history_int_code;
    this.module_int_code = this.navParams.data.module_int_code;
    this.system_module_table_name = this.navParams.data.system_module_table_name;
    this.module_id = this.navParams.data.module_id;
    this.display_module_name = this.navParams.data.display_module_name;
    this.getModuleData()
  }

  async closeModal() {
    const onClosedData: any = {};
    await this.modalController.dismiss(onClosedData);
  }

  getModuleData() {

    let postData = {
      'login_int_code': this.loginData['login_int_code'],
      'login_counter': this.loginData['login_counter'],
      'employee_ref_int_code': this.loginData['employee_ref_int_code'],
      'system_module_table_name': this.system_module_table_name,
      'module_id': this.module_id,
      'approval_history_int_code': this.approval_history_int_code,
      'module_int_code': this.module_int_code,
    };

    this.http.post(this.appCommon.baseAppUrl + "appGetApprovalsLevelThreeData", postData)
      .subscribe(response => {

        if (response['error_code'] == '0') {

          this.header_data = response['data']['header']
          this.items_data = response['data']['items']
          this.footer_data = response['data']['footer']
          // alert(this.items_data);
        }

      }, error => {
        this.appCommon.presentAlert(error)
      });
  }

  approveRejectRecordFromLevelThree(status: any,approval_remarks: any) {
    const that = this;
    that.loadingService.show();
    let postData = {
      'login_int_code': this.loginData['login_int_code'],
      'system_module_table_name': this.system_module_table_name,
      'module_id': this.module_id,
      'approval_history_int_code': this.approval_history_int_code,
      'module_int_code': this.module_int_code,
      'status': status,
      'approval_remarks': approval_remarks,
    };

    this.http.post(this.appCommon.baseAppUrl + "ApprovalsApproveRejectFromMobile", postData)
      .subscribe(response => {

        if (response['error_code'] == '0') {
          this.appCommon.presentSuccessToast(response['status'])
          this.closeModal();
        }
        that.loadingService.hide();
      }, error => {
        this.appCommon.presentAlert(error)
        that.loadingService.hide();
      });
  }

  async RejectRecordFromLevelThree(status: any) {

    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to Reject?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Reject', 
          handler: data => {  
            if(data.approval_remarks == null || data.approval_remarks == '')
            {
              this.appCommon.presentToast("Please enter the reason!");
              return false;
            }
            this.approveRejectRecordFromLevelThree(status,data.approval_remarks); 
            
          } 
        }   
      ],
      inputs: [
        {
          type: 'textarea',
          placeholder: 'Reason For Rejecting',
          name:'approval_remarks',
        },
      ],
    });

    await alert.present();
  }
}
