import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-view-wfh-request',
  templateUrl: './view-wfh-request.page.html',
  styleUrls: ['./view-wfh-request.page.scss'],
})
export class ViewWFHRequestPage implements OnInit {
  loginData: any;
  reason: any;
  start_date: any;
  end_date: any;  
  wfh_list: any;
  employee: any;
  gedit_int_code: string;

  constructor(public alertController: AlertController,
    public navCtrl: NavController, 
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router,) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.employee = this.loginData['fw_emp_int_code'];
    this.WFHData();
  }

  clearFields() {
    this.gedit_int_code = '0';
    this.ngOnInit();
  }

  WFHData() {

    let postData = {
      'employee':  this.loginData['fw_emp_int_code']
    }
 
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    this.http.post(this.appCommon.baseAppUrl + "GetWFHDataFromMobile", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {

          this.wfh_list = response['data'];     
          
        } else {
          this.wfh_list = [];
          console.log(this.wfh_list)
          this.appCommon.presentToast("No Records Found")
        }

      }, error => {
        this.wfh_list = [];
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
    (this.wfh_list).splice(id,1);
  };

  Delete(internal_code){  
    let postData = { 
      "module_id": "1090",
      "module_name": "wfh_request",  
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
  
    this.http.post(this.appCommon.baseAppUrl + "DeleteWFHDataFromMobile", postData)   
      .subscribe(response => { 
        this.appCommon.presentToast(response['status']);
        this.WFHData(); 
      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
      console.log(internal_code); 
  }

  GoBackWFHPage() {
    this.route.navigate(['/wfh-request']);
  }

}
