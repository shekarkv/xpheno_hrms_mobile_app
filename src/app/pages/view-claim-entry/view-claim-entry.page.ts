import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-view-claim-entry',
  templateUrl: './view-claim-entry.page.html',
  styleUrls: ['./view-claim-entry.page.scss'],
})
export class ViewClaimEntryPage implements OnInit {

  entry_no: any;
  employee_name: any;
  d_date: any;
  client: any;
  txt_ref_schema_client: any;
  claim_type: any;
  city_category: any;
  start_date: any;
  end_date: any;
  gedit_int_code: any;
  loginData: any;
  empData: any;
  int_code: any;
  internal_code: any;
  employee: any;
  claim_data: any;
  status_type: any;
  status_yes: any;
  status_no: any;
  amount: any; 
  txt_ref_schema_employee: any;
  module: any = 'claim_entry';
  payload = {
    claim_entry_details_group: []
  }

  constructor(public alertController: AlertController,
    public navCtrl: NavController, 
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router,) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData'));
    this.employee = this.loginData['fw_emp_int_code'];
    this.ClaimData();
  }

  clearFields() {
    this.gedit_int_code = '0';
    this.ngOnInit();
  }

  ClaimData() {

    let postData = {
      'employee':  this.loginData['fw_emp_int_code']
    }
 
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    this.http.post(this.appCommon.baseAppUrl + "ViewClaimEntryFromMobile", postData)   
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') { 

          this.claim_data = response['data'];     
          
        } else {
          this.claim_data = [];
          console.log(this.claim_data)
          this.appCommon.presentToast("No Records Found")
        }

      }, error => {
        this.claim_data = [];
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
    (this.claim_data).splice(id,1);
  };

  Delete(internal_code){  
    let postData = { 
      "module_id": "1065",
      "module_name": "claim_entry",  
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
  
    this.http.post(this.appCommon.baseAppUrl + "DeleteClaimDataFromMobile", postData)   
      .subscribe(response => { 
        this.appCommon.presentToast(response['status']);
        this.ClaimData(); 
      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
      console.log(internal_code); 
  }

  EditClaimEntry(internal_code) {  
    let navigationExtras: NavigationExtras = {
      queryParams: {
        internal_code : internal_code,
      }
  };
    this.route.navigate(['/claim-entry'],navigationExtras);
    
  }

}
