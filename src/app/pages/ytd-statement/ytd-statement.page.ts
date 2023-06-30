import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonSelect, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx'
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
// import { File } from '@awesome-cordova-plugins/file/ngx';
// import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

@Component({
  selector: 'app-ytd-statement',
  templateUrl: './ytd-statement.page.html',
  styleUrls: ['./ytd-statement.page.scss'],
})
export class YTDStatementPage implements OnInit {
 
  loginData: any;
  empData: any;
  employee: any;
  module: any;
  date_select: any;
  date: any;
  ytd_data: any;
  header: any;
  fin_year: any;
  internal_code: any;
   SelectedYearIdValue : any ;
 
  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router,
    private iab: InAppBrowser,
    // private transfer: FileTransfer, 
    // private file: File,
    // private fileOpener: FileOpener

  ) { }
 
  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData'));   
    this.employee = this.loginData['fw_emp_int_code'];
      this.GetPayRollFinYear();
 
  }
  
  onSelectChangefn(selectedValue: any) {
    this.SelectedYearIdValue = selectedValue.detail.value ;
    this.GetYTDSalStatement();
  }
  GetPayRollFinYear() {
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
        if (response['error_code'] == '0') {
         this.SelectedYearIdValue  = response['data']['current_year'];
          this.date_select = response['data']['year_data']
          this.GetYTDSalStatement();
        } else {
          this.appCommon.presentToast(response['status']);
        } 
      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

  GetYTDSalStatement() {
    let postData = {
      'employee': this.loginData['fw_emp_int_code'],
      'fin_year': this.SelectedYearIdValue,
    }
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.http.post(this.appCommon.baseAppUrl + "GetYTDSalStatementFromMobile", postData)
      .subscribe(response => {

        console.table(response) 

        if (response['error_code'] == '0') {

            this.header = response['data']['header_arr'];     
            this.ytd_data = response['data']['ytd_data'];
            

        } else {
          this.ytd_data = [];
          console.log(this.ytd_data)
          this.appCommon.presentToast("No Records Found")
        }

      }, error => {  
        this.ytd_data = [];
        this.appCommon.presentAlert(error)
      });
  }

  OpenPaySlipPage(d_date) {  
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'd_date': d_date
      }
  };
    this.route.navigate(['/payslip'],navigationExtras);
    
  }


  DownloadYTDPayslipPDF() {
    // const fileTransfer: FileTransferObject = this.transfer.create();

    const url =  this.appCommon.baseAppUrl+"DownloadEmployeeYtdPDFFromMobile&Employee="+this.loginData['fw_emp_int_code']+"&fin_year="+ this.SelectedYearIdValue;
    // fileTransfer.download(url, this.file.dataDirectory+ this.empData['code']+"&fin_year="+ this.SelectedYearIdValue).then((entry) => {
    //   console.log('download complete: ' + entry.toURL());
    //   this.fileOpener.open(this.file.dataDirectory+ this.empData['code']+"&fin_year="+ this.SelectedYearIdValue, 'application/*')
    //     .then(() => 
    //       console.log('opened' + JSON.stringify(entry.toURL()))
    //     )
    //     .catch(e =>
    //       this.appCommon.presentAlert('Error opening file' + JSON.stringify(e))
    //     );
    // }, (error) => { 
    // });

    const browser = this.iab.create(url,'_system');

      
      browser.on('loadstop').subscribe(event => {
        browser.insertCSS({ code: "body{color: red;" });  
      });

      browser.close();
  }

}
