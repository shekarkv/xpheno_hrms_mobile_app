import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
@Component({
  selector: 'app-letters',
  templateUrl: './letters.page.html',
  styleUrls: ['./letters.page.scss'],
})
export class LettersPage implements OnInit {
  loginData: any;
  empData: any;
  employee: any;
  letter_data: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController, 
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router,
    private iab: InAppBrowser,
    private transfer: FileTransfer, 
    private file: File,
    private fileOpener: FileOpener) { }

    ngOnInit() {
      this.loginData = JSON.parse(localStorage.getItem('loginData'));
      this.empData = JSON.parse(localStorage.getItem('employeeData'));
      this.employee = this.loginData['fw_emp_int_code'];
      this.LetterData();
    }
  
    LetterData() {
  
      let postData = {
        'employee':  this.loginData['fw_emp_int_code'],
      }
   
      if (navigator.onLine) {
        //CONTINUE
      } else {
        this.appCommon.presentNoInternetToast('No Network Connection');
        return false;
      }
  
      this.http.post(this.appCommon.baseAppUrl + "GetLetterDataFromMobile", postData)
        .subscribe(response => {
  
          console.table(response)
  
          if (response['error_code'] == '0') {
  
            this.letter_data = response['data'];     
            
          } else {
            this.letter_data = [];
            console.log(this.letter_data)
            this.appCommon.presentToast("No Records Found")
          }
  
        }, error => {  
          this.letter_data = [];
          this.appCommon.presentAlert(error)
        });
    }

  DownloadletterPDF(attchemnt_path) {

    let fileUrl = this.appCommon.baseAppUrl+"DownloadEmployeePayslipFromMobile&Employee="+this.loginData['fw_emp_int_code']+'letter.pdf';

    const browser = this.iab.create(attchemnt_path,'_system');

      
      browser.on('loadstop').subscribe(event => {
        browser.insertCSS({ code: "body{color: red;" });  
      });

      browser.close();

    // const fileTransfer: FileTransferObject = this.transfer.create();
    // fileTransfer.download(attchemnt_path, this.file.dataDirectory+ this.empData['code']+'letter.pdf').then((entry) => {
    //   console.log('download complete: ' + entry.toURL());
    //   this.fileOpener.open(this.file.dataDirectory+ this.empData['code']+'letter.pdf', 'application/*')
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
