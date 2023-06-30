import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserTab } from '@awesome-cordova-plugins/browser-tab/ngx';
import { Platform } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx'

// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
// import { File } from '@awesome-cordova-plugins/file/ngx';
// import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.page.html',
  styleUrls: ['./payslip.page.scss'],
})
export class PayslipPage implements OnInit {

  d_date: any;
  loginData: any;
  empData: any;
  saveClicked: boolean = false;
  header_arr: any;
  header: any;
  summary: any;
  earn: any;
  net_pay: any;
  ded_arr: any;
  show_slips: boolean = false;
  total_earning: any;
  total_deduction: any;
  payslip_name:any;

  constructor(
    public http: HttpClient,
    public appCommon: AppCommon,
    private platform: Platform, 
    private browserTab: BrowserTab,
    public common: AppCommon,
    private route: ActivatedRoute,
    private iab: InAppBrowser,
    // private transfer: FileTransfer, 
    // private file: File,
    // private fileOpener: FileOpener
  ) {}

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData')); 
    // this.d_date = '2022-11-01'
    this.route.queryParams.subscribe(params => {
      this.d_date = params["d_date"];
      setTimeout(() => {
        this.GetPayslipDetails();
      }, 500);
    });
 
  }

  clearvariables(){
    this.earn = ''
    this.ded_arr = ''
    this.summary = ''
    this.total_earning= 0;
    this.total_deduction= 0;
    this.net_pay= 0;
  
  }

  GetPayslipDetails() {
   
    this.clearvariables();
    let postData = {
      'employee': this.loginData['fw_emp_int_code'],
      'date' : this.d_date,
    }
    if(this.d_date != '')
    this.show_slips = true;

    if (navigator.onLine) {
      //CONTINUE 
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
      // 
    this.http.post(this.appCommon.baseAppUrl + "GetPaySlipFromMobile", postData)   
      .subscribe(response => {
      
        this.show_slips= false;
        console.table(response)

        if (response['error_code'] == '0') {
         
          this.header = response['data']['header_arr']
          this.earn = response['data']['earning_arr']
          this.ded_arr = response['data']['ded_arr']
          this.summary = response['data']['summary_arr']

          if(this.summary != null)
          {
            // alert(this.summary.payslip_month);
            this.total_earning = this.summary.total_earning;
            this.total_deduction = this.summary.total_deduction;
            this.payslip_name = this.summary.payslip_name;
            this.net_pay = this.summary.net_pay;
            this.show_slips = true;
            if(this.summary.payslip_month != '')
              this.d_date = this.summary.payslip_month
          }
          
        } else {
          this.earn = [];
          this.ded_arr = [];
          this.appCommon.presentToast("No Records Found")
        }

      }, error => {  
        this.earn = [];
        this.ded_arr = [];
        this.appCommon.presentAlert(error)
      });
  }
    
    DownloadMothlyPayslipPDF() {
      let fileUrl = this.appCommon.baseAppUrl+"DownloadEmployeePayslipFromMobile&Employee="+this.loginData['fw_emp_int_code']+"&month="+this.d_date;

      const browser = this.iab.create(fileUrl,'_system');

        
        browser.on('loadstop').subscribe(event => {
          browser.insertCSS({ code: "body{color: red;" });  
        });

        browser.close();

      // const fileTransfer: FileTransferObject = this.transfer.create();
 

      // this.file.checkDir(this.file.dataDirectory, 'test').then(_ => console.log('Directory exists')
      // ).catch(err => {
      //     this.file.createDir(this.file.dataDirectory, 'test',false).then(_ => console.log('Directory created')).catch(err =>
      //       console.log("failed")); 
      // });
 
      // const url =  this.appCommon.baseAppUrl+"DownloadEmployeePayslipFromMobile&Employee="+this.loginData['fw_emp_int_code']+"&month="+this.d_date;
      // fileTransfer.download(url, this.file.dataDirectory+ 'filetest.pdf').then((entry) => {
      //   console.log('download complete: ' + entry.toURL());
      //   this.fileOpener.open(this.file.dataDirectory+ 'filetest.pdf', 'application/*')
      //     .then(() => 
      //       console.log('opened' + JSON.stringify(entry.toURL()))
      //     )
      //     .catch(e =>
      //       this.appCommon.presentAlert('Error opening file' + JSON.stringify(e))
      //     );
      // }, (error) => { 
      // });
    }
 
    
  }
 


