import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-view-regularization-register',
  templateUrl: './view-regularization-register.page.html',
  styleUrls: ['./view-regularization-register.page.scss'],
})
export class ViewRegularizationRegisterPage implements OnInit {
  loginData: any;
  empData: any;
  employee: any;
  regular_list: any;
  gedit_int_code: any;
  internal_code: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController, 
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router,) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData'));
    this.employee = this.loginData['fw_emp_int_code'];
    this.RegularizeData();
  }

  RegularizeData() {

    let postData = {
      'employee':  this.loginData['fw_emp_int_code'],
    }
 
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    this.http.post(this.appCommon.baseAppUrl + "GetAttendanceRegularizDataFromMobile", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {

          this.regular_list = response['data'];     
          
        } else {
          this.regular_list = [];
          console.log(this.regular_list)
          this.appCommon.presentToast("No Records Found")
        }

      }, error => {  
        this.regular_list = [];
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
    (this.regular_list).splice(id,1);
  };

  Delete(internal_code){  
    let postData = { 
      "module_id": "1097",
      "module_name": "attendance_regularization",  
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
  
    this.http.post(this.appCommon.baseAppUrl + "DeleteRegularizeEntryDataFromMobile", postData)   
      .subscribe(response => { 
        this.appCommon.presentToast(response['status']);
        this.RegularizeData(); 
      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
      console.log(internal_code); 
  }

  GoBack() {
    this.route.navigate(['/view-regularization-register']);
  }

}
