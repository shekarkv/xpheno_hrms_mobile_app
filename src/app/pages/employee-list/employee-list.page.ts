import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.page.html',
  styleUrls: ['./employee-list.page.scss'],
})
export class EmployeeListPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  
  login_real_name: any;
  in_time: any;
  out_time: any;
  gedit_int_code: any;
  login_email: any;
  loginData: any;
  // photo: string;
  onFavorite: any;
  name: string;
  internal_code: any;
  reject_reason: any;
  module: any;
  employee: any;
  employee_data: any;
  isEndTripModalOpen:boolean = false;

  constructor( public alertController: AlertController,
    public navCtrl: NavController, 
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router,) { }

  ngOnInit() {    
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.login_real_name = this.loginData['login_real_name'];
    this.login_email = this.loginData['login_email'];
    // this.getProfileData(); 
    this.getEmployeeList();
  }
  clearFields() {
    this.gedit_int_code = '0';
    this.ngOnInit();
  }

  getEmployeeList() {
    let postData = {
      "user_id": this.loginData['login_int_code'],  
      'employee':  this.loginData['fw_emp_int_code'],
      'fw_repmgr_code':  this.loginData['fw_repmgr_code'],
    }
    
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.http.post(this.appCommon.baseAppUrl + "ApproveRejectEmployeeListFromMobile", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {

            this.employee_data = response['data'];     

        } else {
          this.appCommon.presentToast(response['status']);
        }

      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

  remove(id){ 
    (this.employee_data).splice(id,1);
  };

  
  Approve(internal_code){  
    let postData = { 
      "module_name": "emp_attendance",  
      "module_int_code": internal_code,
      "user_id": this.loginData['login_int_code'],  
      'login_counter': this.loginData['login_counter'],
      'employee':  this.loginData['fw_emp_int_code'],
      'fw_repmgr_code':  this.loginData['fw_repmgr_code'],
    }  
  
    if (navigator.onLine) {
      //CONTINUE
    } else { 
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
  
    this.http.post(this.appCommon.baseAppUrl + "updateEmpApprovalFromMobile", postData)   
      .subscribe(response => { 
   
        console.table(response) 
  
     
        if (response['error_code'] == '0') {

        }  
        else 
        {
          this.appCommon.presentToast(response['status']);
        }
      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Approved',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async closeModule(internal_code) {

    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to Reject?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Reject', 
          handler: data => { 
            if(data.reject_reason == null || data.reject_reason == '')
            {
              this.appCommon.presentToast("Please enter the reason!");
              return false;
            }
            console.log('Confirm Okay');
            action :("remove(id)");
            this.rejectfun(data.reject_reason,internal_code);
            // this.navCtrl.navigateRoot('/home');
            
          } 
        }   
      ],
      inputs: [
        {
          type: 'textarea',
          placeholder: 'Reason For Reject',
          name:'reject_reason',
        },
      ],
    });

    await alert.present();
  }

  rejectfun(reject_reason: any,internal_code: any) {

    let postData = {
      "module_name": "emp_attendance",  
      "reject_reason": reject_reason, 
      "module_int_code": internal_code,
      "user_id": this.loginData['login_int_code'],  
      'employee':  this.loginData['fw_emp_int_code'],
      'fw_repmgr_code':  this.loginData['fw_repmgr_code'],
    }  

    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    this.http.post(this.appCommon.baseAppUrl + "updateEmpRejectionFromMobile", postData) 
      .subscribe(response => {
        this.appCommon.presentSuccessToast(response['status']);
        this.getEmployeeList(); 
      }, error => { 
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
    console.log(reject_reason,internal_code);  
  }

  ApproveAll(){  
    let postData = { 
      "user_id": this.loginData['login_int_code'],  
      "module_name": "emp_attendance",   
      'employee':  this.loginData['fw_emp_int_code'],
      'fw_repmgr_code':  this.loginData['fw_repmgr_code'],
    }  
  
    if (navigator.onLine) {
      //CONTINUE
    } else { 
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
     
    this.http.post(this.appCommon.baseAppUrl + "GetApproveAllFromMobile", postData)   
      .subscribe(response => { 
   
        console.table(response) 
        this.getEmployeeList(); 
      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

  async Location(in_location,out_location) {

    const alert = await this.alertController.create({
      header: '',
      message: in_location + '<br>' + '<br>' + out_location ,
      // subHeader: in_location, 
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, 
      ],
    });

    await alert.present();
  }

  back() {
    this.route.navigate(['/home'])
    .then(() => {
      // window.location.reload();
    });
  }

}


