import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-help-items',
  templateUrl: './help-items.page.html',
  styleUrls: ['./help-items.page.scss'],
})
export class HelpItemsPage implements OnInit {
  int_code: any;
  help_details: any;

  constructor(private modalController: ModalController,
    private navParams: NavParams,
    public appCommon: AppCommon,
    public http: HttpClient,) { }

  ngOnInit() {
    console.table(this.navParams);
    this.int_code = this.navParams.data.int_code;
    // alert(this.po_inv_int_code);
    this.getHelpItem()
  }

  async closeModal() {
    const onClosedData: any = {
    
    };
    await this.modalController.dismiss(onClosedData);
  }

  getHelpItem() {
    let postData = {
      'int_code': this.int_code
    }

    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    this.http.post(this.appCommon.baseAppUrl + "appGetHelpItemList", postData)
      .subscribe(response => {
 
        console.table(response)

        if (response['error_code'] == '0') {

          this.help_details = response['data']['help_details']

        } else {
          this.appCommon.presentToast(response['status']);
        }

      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

}
