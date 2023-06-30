import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-view-on-duty-request',
  templateUrl: './view-on-duty-request.page.html',
  styleUrls: ['./view-on-duty-request.page.scss'],
})
export class ViewOnDutyRequestPage implements OnInit {
  loginData: any;
  employee: any;
  gedit_int_code: string;
  on_duty_request_list: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController, 
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router,) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.employee = this.loginData['fw_emp_int_code'];
    this.OnDutyRequestData();
  }

  clearFields() {
    this.gedit_int_code = '0';
    this.ngOnInit();
  }

  OnDutyRequestData() {

    let postData = {
      'employee':  this.loginData['fw_emp_int_code']
    }
 
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    this.http.post(this.appCommon.baseAppUrl + "GetOnDutyRequestDataFromMobile", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {

          this.on_duty_request_list = response['data'];     
          
        } else {
          this.on_duty_request_list = [];
          console.log(this.on_duty_request_list)
          this.appCommon.presentToast("No Records Found")
        }

      }, error => {
        this.on_duty_request_list = [];
        this.appCommon.presentAlert(error)
      });
  }

  async chooseAction(internal_code) {
    const alert = await this.alertController.create({
      message: 'You Want to Delete?',
      buttons: [
        {
          text: 'Delete', 
          cssClass: 'secondary',
          handler: data => { 
            console.log('Confirm Okay');
            action :("remove(id)");
            this.Delete(internal_code); 
          }
        },
            {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
      ]
    });
    await alert.present();
  }


  remove(id){ 
    (this.on_duty_request_list).splice(id,1);
  };

  Delete(internal_code){  
    let postData = { 
      "module_id": "1089",
      "module_name": "on_duty_request",  
      "gedit_int_code": this.gedit_int_code,
      "ea_int_code": internal_code,
      "user_id": this.loginData['login_int_code'],    
    }     
  
    if (navigator.onLine) {
      //CONTINUE
    } else { 
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
  
    this.http.post(this.appCommon.baseAppUrl + "DeleteOnDutyRequestDataFromMobile", postData)   
      .subscribe(response => { 
        this.appCommon.presentToast(response['status']);
        this.OnDutyRequestData(); 
      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
      console.log(internal_code); 
  }

  GoBackOnDutyReqPage() {
    this.route.navigate(['/on-duty-request']);
  }

}
