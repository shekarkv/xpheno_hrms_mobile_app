import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSelect, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx'

@Component({
  selector: 'app-it-computation',
  templateUrl: './it-computation.page.html',
  styleUrls: ['./it-computation.page.scss'],
})
export class ITComputationPage implements OnInit {
 
  loginData: any;
  empData: any;
  employee: any;
  module: any;
  date_select: any;
  fin_year: any;
  header: any;
  ytd_data: any;
  it_data: any;
 
  SelectedYearIdValue : any ;
  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData'));   
    this.employee = this.loginData['fw_emp_int_code'];
    this.GetITFinYear();
  }
  onSelectChangefn(selectedValue: any) {
    this.SelectedYearIdValue = selectedValue.detail.value ;
    this.GetITStatement();
  }
  GetITFinYear() {
    let postData = {
      'login_int_code': this.loginData['login_int_code'],
      'login_counter': this.loginData['login_counter'],
      'module': this.module,
    }

    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    this.http.post(this.appCommon.baseAppUrl + "GetPayRollFinYearForMobile", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {

          this.date_select = response['data']['year_data']
          this.SelectedYearIdValue  = response['data']['current_year'];
          this.GetITStatement();
        } else {
          this.appCommon.presentToast(response['status']);
        }

      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

 
  GetITStatement() {
 
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    var data="&employee="+this.loginData['fw_emp_int_code'];
    data+="&fin_year="+this.SelectedYearIdValue;
    this.http.get(this.appCommon.baseAppUrl + "GetITComputStatementFromMobile"+data).subscribe((response) => {
      console.log(response); 
      if (response['error_code'] == '0') {

        this.header = response['data']['header_arr'];   
        this.it_data = response['data']['it_details'];

    } else {
      this.appCommon.presentToast(response['status']);
    }

      }, (error) => {
    this.appCommon.presentToast("Error->" + JSON.stringify(error))
    }); 
   
  }

  DownloadITPDF(month,year) {
    let fileUrl = this.appCommon.baseAppUrl+"DownloadITPDFFromMobile&Employee="+this.loginData['fw_emp_int_code']+"&year="+year+"&month="+month;

    const browser = this.iab.create(fileUrl,'_system');

      
      browser.on('loadstop').subscribe(event => {
        browser.insertCSS({ code: "body{color: red;" });  
      });

      browser.close();
  }

}
