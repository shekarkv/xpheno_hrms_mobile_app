import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(public alertController: AlertController,
    public navCtrl: NavController, 
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,) { }

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

}
