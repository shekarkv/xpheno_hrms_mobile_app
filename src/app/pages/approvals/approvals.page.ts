import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, IonModal  } from "@ionic/angular";
import { AppCommon } from 'src/app/app.common';
import { HttpClient } from "@angular/common/http";
import { ApprovalsLevelTwoPage } from '../approvals-level-two/approvals-level-two.page';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.page.html',
  styleUrls: ['./approvals.page.scss'],
})
export class ApprovalsPage implements OnInit {

  loginData: any;
  module_list: any;

  constructor(
    public menuCtrl: MenuController,
    public modalController: ModalController,
    public appCommon: AppCommon,
    public http: HttpClient,

  ) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.getModuleList();
  }

  getModuleList() {

    let postData = {
      'login_int_code': this.loginData['login_int_code']
    };

    this.http.post(this.appCommon.baseAppUrl + "appGetApprovalsLevelOneModuleList", postData)
      .subscribe(response => {

        if (response['error_code'] == '0') {
          this.module_list = response['data'];
        }
        else {
          this.module_list = [];
          console.log(this.module_list)
          this.appCommon.presentToast("No Pending Approvals")
        }

      }, error => {
        this.module_list = [];
        this.appCommon.presentAlert(error)
      });
  }

  async openModule(system_module_table_name: any, module_id: any, display_module_name: any) {

    const modal = await this.modalController.create({
      component: ApprovalsLevelTwoPage,
      componentProps: {
        "system_module_table_name": system_module_table_name,
        "module_id": module_id,
        "display_module_name": display_module_name
      }
    });

    modal.onDidDismiss().then(() => {
      this.getModuleList();
    });

    return await modal.present();
  }

  

}
