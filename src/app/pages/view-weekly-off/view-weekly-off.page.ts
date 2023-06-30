import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-view-weekly-off',
  templateUrl: './view-weekly-off.page.html',
  styleUrls: ['./view-weekly-off.page.scss'],
})
export class ViewWeeklyOffPage implements OnInit {
  loginData: any;
  empData: any;
  employee: any;
  weekly_off_list: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController, 
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData'));
    this.employee = this.loginData['fw_emp_int_code'];
    this.WeeklyOffData();
  }

  WeeklyOffData() {

    let postData = {
      'employee':  this.loginData['fw_emp_int_code'],
    }
 
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    this.http.post(this.appCommon.baseAppUrl + "GetWeeklyOffDataFromMobile", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {

          this.weekly_off_list = response['data'];     
          
        } else {
          this.weekly_off_list = [];
          console.log(this.weekly_off_list)
          this.appCommon.presentToast("No Records Found")
        }

      }, error => {  
        this.weekly_off_list = [];
        this.appCommon.presentAlert(error)
      });
  }

}
