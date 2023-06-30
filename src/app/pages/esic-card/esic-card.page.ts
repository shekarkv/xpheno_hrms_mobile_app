import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppCommon } from 'src/app/app.common';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx'

@Component({
  selector: 'app-esic-card',
  templateUrl: './esic-card.page.html',
  styleUrls: ['./esic-card.page.scss'],
})
export class ESICCardPage implements OnInit {
  loginData: any;
  employee: any;
  doc_url: any;

  constructor(
    public http: HttpClient,
    public appCommon: AppCommon,
    private iab: InAppBrowser,
  ) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.GetEmpDoc();
  }

  GetEmpDoc() {
    let postData = {
      'employee' : this.loginData['fw_emp_int_code'],
      'doc_type' : 'esic card'
    }

    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    this.http.post(this.appCommon.baseAppUrl + "GetEmployeeDocForMobile", postData)
      .subscribe(response => {
        if (response['error_code'] == '0') {

          this.doc_url = response['data']['doc']
        } else {
          this.appCommon.presentToast(response['status']);
        } 
      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

  DownloadESICCardPDF() {
    // let doc = this.appCommon.baseAppUrl+"DownloadCandidateIDpdf&ref_no="+this.loginData['fw_emp_int_code'];

    const browser = this.iab.create(this.doc_url,'_system');

      
      browser.on('loadstop').subscribe(event => {
        browser.insertCSS({ code: "body{color: red;" });  
      });

      browser.close();

  }
}
