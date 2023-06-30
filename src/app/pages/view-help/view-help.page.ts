import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common'; 
import { HelpItemsPage } from '../help-items/help-items.page';

@Component({
  selector: 'app-view-help',
  templateUrl: './view-help.page.html',
  styleUrls: ['./view-help.page.scss'],
})
export class ViewHelpPage implements OnInit {

  gedit_int_code: any;
  loginData: any;
  empData: any;
  d_date: any;
  ticket_no: any;
  query_type: any;  
  category: any;
  description: any;
  attachment: any = '';
  help_list: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController, 
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router,) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData'));
    this.HelpDetails();
  }

  HelpDetails() {

    let postData = {
      'employee':  this.loginData['fw_emp_int_code'],
    }
 
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    this.http.post(this.appCommon.baseAppUrl + "GetHelpDataFromMobile", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {

          this.help_list = response['data'];     
          
        } else {
          this.help_list = [];
          console.log(this.help_list)
          this.appCommon.presentToast("No Records Found")
        }

      }, error => {  
        this.help_list = [];
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
    (this.help_list).splice(id,1);
  };

  Delete(internal_code){  
    let postData = { 
      "module_id": "1115",
      "module_name": "help_desk",  
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
  
    this.http.post(this.appCommon.baseAppUrl + "DeleteHelpDataFromMobile", postData)   
      .subscribe(response => { 
        this.appCommon.presentToast(response['status']);
        this.HelpDetails(); 
      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
      console.log(internal_code); 
  }

  GoHelpDeskPage() {
    this.route.navigate(['/help']);
  }

  
  async showHelpItems(row_data: any, index: any) {

    const modal = await this.modalController.create({
      component: HelpItemsPage,
      componentProps: {
        "int_code": row_data['int_code'],
      }
    });

    modal.onDidDismiss().then(() => {
    
    });

    return await modal.present();
  }

}
