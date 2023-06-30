import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.page.html',
  styleUrls: ['./holiday-list.page.scss'],
})
export class HolidayListPage implements OnInit {
  loginData: any;
  holiday_list: any;
  gedit_int_code: any;
  name: any;
  date: any;
  client: any;
  location: any;
  employee : any;
  empData: any;

  constructor( public alertController: AlertController,
    public navCtrl: NavController, 
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,) { }

  ngOnInit() {
    // this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData')); 
    this.getHolidayList();
  }

  getHolidayList() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    let postData = {
      "user_id": this.loginData['login_int_code'],  
      'employee': this.loginData['fw_emp_int_code'],
    }
    // alert(this.employee);

    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.http.post(this.appCommon.baseAppUrl + "GetHolidayListFromMobile", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {

            this.holiday_list = response['data'];     

        } else {
          this.holiday_list = [];
          console.log(this.holiday_list)
          this.appCommon.presentToast("No Records Found")
        }

      }, error => {  
        this.holiday_list = [];
        this.appCommon.presentAlert(error)
      });
  }


}
