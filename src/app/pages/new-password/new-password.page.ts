import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage implements OnInit {

  loginData: any;
  saveClicked: boolean = false;
  old_password: any;
  new_password: any;
  confirm_password: any;  
  empData: any;

  constructor(    
    public alertController: AlertController,
    public navCtrl: NavController,
    public http: HttpClient,
    public appCommon: AppCommon,) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData'));
  }

  clearFields() {
    this.old_password = '';
    this.new_password = ''; 
    this.confirm_password = '';
    this.ngOnInit(); 
  }

  SubmitPsw() {
 
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.saveClicked = true;

    let postData = {

      'login_user_int_code': this.loginData['login_int_code'],
      'login_counter': this.loginData['login_counter'],
      'employee': this.loginData['fw_emp_int_code'],
      'old_password':this.old_password,
      'new_password':this.new_password,
      'confirm_password':this.confirm_password,
    };
    console.log(JSON.stringify(postData))

    this.http.post(this.appCommon.baseAppUrl + "ChangePasswordFromMobile", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {

          this.saveClicked = false;
          this.appCommon.presentAlert(response['data'])
          this.clearFields();
          setTimeout(() => {
            localStorage.clear();
            this.navCtrl.navigateRoot('login');
          }, 1000);

        } else {
          this.saveClicked = false;
          this.appCommon.presentToast(response['data']); 
        }

      }, error => {
        this.saveClicked = false;
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
      
      // this.leaveEntryData();
      
  }

}
