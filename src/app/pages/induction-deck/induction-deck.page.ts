import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common'; 
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx'

@Component({
  selector: 'app-induction-deck',
  templateUrl: './induction-deck.page.html',
  styleUrls: ['./induction-deck.page.scss'],
})
export class InductionDeckPage implements OnInit {
  loginData: any;
  empData: any;
  deck_arr: any;
  name: any;
  code: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController, 
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router,
    private iab: InAppBrowser) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData'));
    this.code = this.empData['code']; 
    this.DeckDetails();
  }

  DeckDetails() {

    let postData = {
      'employee':  this.loginData['fw_emp_int_code'],
      'code':  this.empData['code'],
    }
 
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    this.http.post(this.appCommon.baseAppUrl + "GetDeckDataFromMobile", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {

          this.deck_arr = response['data'];     
          
        } else { 
          this.deck_arr = [];
          console.log(this.deck_arr)
          this.appCommon.presentToast("No Records Found")
        }

      }, error => {  
        this.deck_arr = [];
        this.appCommon.presentAlert(error)
      });
  }

  DownloadInductionDeckPDF(link) {
    let fileUrl = this.appCommon.baseUrl+link;

    const browser = this.iab.create(fileUrl,'_system');

      
      browser.on('loadstop').subscribe(event => {
        browser.insertCSS({ code: "body{color: red;" });  
      });

      browser.close();
  }

}
