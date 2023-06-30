import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { ApprovalsLevelThreePage } from '../approvals-level-three/approvals-level-three.page';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'app-approvals-level-two',
  templateUrl: './approvals-level-two.page.html',
  styleUrls: ['./approvals-level-two.page.scss'],
})
export class ApprovalsLevelTwoPage implements OnInit {

  loginData: any;
  system_module_table_name: any;
  module_id: any;
  display_module_name: any;
  module_data = [];
  app_hist_int_codes: any;
  third_level_required:boolean = true;

  constructor(
    private navParams: NavParams,
    public appCommon: AppCommon,
    private modalController: ModalController,
    public http: HttpClient,
    private loadingService: LoadingService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.system_module_table_name = this.navParams.data.system_module_table_name;
    this.module_id = this.navParams.data.module_id;
    this.display_module_name = this.navParams.data.display_module_name; 
  
    if(this.system_module_table_name == 'claim_entry')
      this.third_level_required = true;
    else
      this.third_level_required = false;

    this.getModuleData()
  }

  async closeModal() {
    const onClosedData: any = {};
    await this.modalController.dismiss(onClosedData);
  }

  getModuleData() {

    let postData = {
      'login_int_code': this.loginData['login_int_code'],
      'system_module_table_name': this.system_module_table_name,
      'module_id': this.module_id,
    };

    this.http.post(this.appCommon.baseAppUrl + "appGetApprovalsLevelTwoData", postData)
      .subscribe(response => {

        if (response['error_code'] == '0') {
          this.module_data = response['data']['approve_data']; 
          this.app_hist_int_codes = response['data']['app_hist_int_codes']; 
        }
        else {
          this.module_data = [];
          this.closeModal();
        }

      }, error => {
        this.appCommon.presentAlert(error)
      });
  }

  async openModule(approval_history_int_code: any, module_int_code: any) {

    const modal = await this.modalController.create({
      component: ApprovalsLevelThreePage,
      componentProps: {
        "approval_history_int_code": approval_history_int_code,
        "module_int_code": module_int_code,
        "system_module_table_name": this.system_module_table_name,
        "module_id": this.module_id,
        "display_module_name": this.display_module_name,
      }
    });

    modal.onDidDismiss().then(() => {
      this.getModuleData();
    });

    return await modal.present();
  }

  approveRejectRecord(status: any, approval_history_int_code: any, module_int_code: any, approval_remarks:any) {
    const that = this;
    that.loadingService.show();
    let postData = {
      'login_int_code': this.loginData['login_int_code'],
      'system_module_table_name': this.system_module_table_name,
      'module_id': this.module_id,
      'approval_history_int_code': approval_history_int_code,
      'module_int_code': module_int_code,
      'status': status,
      'approval_remarks': approval_remarks,
    };

    this.http.post(this.appCommon.baseAppUrl + "ApprovalsApproveRejectFromMobile", postData)
      .subscribe(response => {

        if (response['error_code'] == '0') {
          this.appCommon.presentSuccessToast(response['status'])
          // this.closeModal();
              this.getModuleData();
        }
        that.loadingService.hide();
      }, error => {
        this.appCommon.presentAlert(error)
        that.loadingService.hide();
      });
  }

  async rejectRecord(status: any, approval_history_int_code: any, module_int_code: any) {

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
            this.approveRejectRecord(status,approval_history_int_code,module_int_code,data.approval_remarks); 
            
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


  ApproveAll(){  

    if(this.display_module_name== 'Attendance Regularization')
    {
      let postData = { 
        "user_id": this.loginData['login_int_code'],  
        "module_name": "attendance_regularization",   
        'employee':  this.loginData['fw_emp_int_code'],
        'fw_repmgr_code':  this.loginData['fw_repmgr_code'],
      }  
    
      if (navigator.onLine) {
        //CONTINUE
      } else { 
        this.appCommon.presentNoInternetToast('No Network Connection');
        return false;
      }
       
      this.http.post(this.appCommon.baseAppUrl + "GetApproveAllRegularFromMobile", postData)   
        .subscribe(response => { 
     
          console.table(response) 
          this.getModuleData(); 
        }, error => {
          this.appCommon.presentToast("Error->" + JSON.stringify(error))
        });
    }
    if(this.display_module_name== 'Apply Leave')
    {
      let postData = { 
        "user_id": this.loginData['login_int_code'],  
        "module_name": "leave_entry",   
        'module_id': this.module_id,
        'employee':  this.loginData['fw_emp_int_code'],
        'fw_repmgr_code':  this.loginData['fw_repmgr_code'],
        "app_hist_int_codes": this.app_hist_int_codes.toString(),
      }  
    
      if (navigator.onLine) {
        //CONTINUE
      } else { 
        this.appCommon.presentNoInternetToast('No Network Connection');
        return false;
      }
       
      this.http.post(this.appCommon.baseAppUrl + "GetApproveAllLeaveFromMobile", postData)   
        .subscribe(response => { 
     
          console.table(response) 
          this.getModuleData(); 
        }, error => {
          this.appCommon.presentToast("Error->" + JSON.stringify(error))
        });
    }

  }

}
