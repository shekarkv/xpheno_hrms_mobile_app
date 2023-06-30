import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavParams, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-monthly-attandence-list',
  templateUrl: './monthly-attandence-list.page.html',
  styleUrls: ['./monthly-attandence-list.page.scss'],
})
export class MonthlyAttandenceListPage implements OnInit {

  in_time: any;
  out_time: any;
  gedit_int_code: any;
  loginData: any;
  name: string;
  internal_code: any;
  employee_data: any;
  status: any;
  status_type: any;
  isModal: boolean = false;
  d_date: any;
  attend_data: any;
  current_time: any;
  date: any;

  constructor( public alertController: AlertController,
    public navCtrl: NavController, 
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    public navParams: NavParams) { 

      this.isModal = this.navParams.get('isModal');

    }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.date = this.loginData['fw_current_date']
    this.getAttendanceList();
  }

  getAttendanceList() {
    let postData = {
      "user_id": this.loginData['login_int_code'],
      'fw_emp_int_code':  this.loginData['fw_emp_int_code'],  
      'date' : this.date,
    }
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.http.post(this.appCommon.baseAppUrl + "GetMonthlyAttendanceListFromMobile", postData)
      .subscribe(response => {

        console.table(response) 

        if (response['error_code'] == '0') {
       
          this.employee_data = response['data'];  
          // alert(this.employee_data);
        } 
        else {
          this.employee_data = [];
          this.appCommon.presentToast("No Records Found")
        }

      }, error => {  
        this.employee_data = [];
        this.appCommon.presentAlert(error)
      });
  }

  // getAttendanceMonthList() {
  //   let postData = {
  //     'fw_emp_int_code': this.loginData['fw_emp_int_code'],
  //     'date' : this.d_date,
  //   }
  //   if (navigator.onLine) {
  //     //CONTINUE
  //   } else {
  //     this.appCommon.presentNoInternetToast('No Network Connection');
  //     return false;
  //   }
  //   this.http.post(this.appCommon.baseAppUrl + "GetMonthlyAttendanceListFromMobile", postData)
  //     .subscribe(response => {

  //       console.table(response) 

  //       if (response['error_code'] == '0') {
       
  //         this.attend_data = response['data'];  
  //         // alert(this.employee_data);
  //       } 
  //       else {
  //         this.attend_data = [];
  //         this.appCommon.presentToast("No Records Found")
  //       }

  //     }, error => {  
  //       this.attend_data = [];
  //       this.appCommon.presentAlert(error)
  //     });
  // }

  close() {
    this.modalController.dismiss();
  }
}
