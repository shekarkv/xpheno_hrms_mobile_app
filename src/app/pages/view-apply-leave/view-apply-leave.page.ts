import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx'
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
// import { File } from '@awesome-cordova-plugins/file/ngx';
// import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

@Component({
  selector: 'app-view-apply-leave',
  templateUrl: './view-apply-leave.page.html',
  styleUrls: ['./view-apply-leave.page.scss'],
})
export class ViewApplyLeavePage implements OnInit {
  reason: any;
  leave_type: any;
  txt_ref_schema_leave_type: any;  
  from_date: any;
  to_date: any;
  from_half_day: string;
  to_half_day: string;
  no_of_days: any;
  gedit_int_code: any;
  loginData: any;
  empData: any;
  leave_balance: any;
  employee: any;
  txt_ref_schema_employee: any; 
  leave_list: any;
  int_code: any;
  internal_code: any;

  constructor(public alertController: AlertController,
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
    if(this.employee == '0')
    {
      this.appCommon.presentNoInternetToast('You cant delete this leave');
      this.navCtrl.navigateRoot('/home');
    }
    //?  
    this.txt_ref_schema_employee = this.empData['name'];
    this.leaveEntryData();
  }

  clearFields() {
    this.gedit_int_code = '0';
    this.ngOnInit();
  }

  leaveEntryData() {

    let postData = {
      'employee':  this.loginData['fw_emp_int_code'],
    }
 
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    this.http.post(this.appCommon.baseAppUrl + "GetLeaveEntryDataFromMobile", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {

          this.leave_list = response['data'];     
          
        } else {
          this.leave_list = [];
          console.log(this.leave_list)
          this.appCommon.presentToast("No Records Found")
        }

      }, error => {  
        this.leave_list = [];
        this.appCommon.presentAlert(error)
      });
  }

  async chooseAction(internal_code) {
    const alert = await this.alertController.create({
      message: 'You Want to Delete?',
      buttons: [
        {
          text: 'Delete', 
          cssClass: 'secondary',
          handler: data => { 
            console.log('Confirm Okay');
            action :("remove(id)");
            this.Delete(internal_code); 
          }
        },
            {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
      ]
    });
    await alert.present();
  }


  remove(id){ 
    (this.leave_list).splice(id,1);
  };

  Delete(internal_code){  
    let postData = { 
      "module_id": "922",
      "module_name": "leave_entry",  
      "gedit_int_code": this.gedit_int_code,
      "ea_int_code": internal_code,
      "user_id": this.loginData['login_int_code'],    
    }     
  
    if (navigator.onLine) {
      //CONTINUE
    } else { 
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
  
    this.http.post(this.appCommon.baseAppUrl + "DeleteLeaveEntryDataFromMobile", postData)   
      .subscribe(response => { 
        this.appCommon.presentToast(response['status']);
        this.leaveEntryData(); 
      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
      console.log(internal_code); 
  }

  GoApplyLeavePage() {
    this.route.navigate(['/apply-leave']);
  }

  // DownloadleavePDF(attachment) {

  //   const browser = this.iab.create(attachment,'_system');

      
  //     browser.on('loadstop').subscribe(event => {
  //       browser.insertCSS({ code: "body{color: red;" });  
  //     });

  //     browser.close();
  // }

  DownloadleavePDF(attachment) {

    const browser = this.iab.create(attachment,'_system');

      
    browser.on('loadstop').subscribe(event => {
      browser.insertCSS({ code: "body{color: red;" });  
    });

    browser.close();
    // const fileTransfer: FileTransferObject = this.transfer.create();

    // alert(attachment);

    // const url =  this.appCommon.baseAppUrl+"DownloadEmployeeYtdPDFFromMobile&Employee="+this.loginData['fw_emp_int_code']+"&fin_year="+ this.SelectedYearIdValue;
    // var extenstion = attachment.split('.')[2];
    // fileTransfer.download(attachment, this.file.dataDirectory+ this.empData['code']+'_leave.'+extenstion).then((entry) => {
    //   console.log('download complete: ' + entry.toURL());
    //   this.fileOpener.open(this.file.dataDirectory+ this.empData['code']+'_leave.'+extenstion, 'application/*')
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
