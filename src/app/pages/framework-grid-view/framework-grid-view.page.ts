import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AppCommon } from 'src/app/app.common';
// import { FilterPipe } from 'src/app/components/search-bar/FilterPipe';

@Component({
  selector: 'app-framework-grid-view',
  templateUrl: './framework-grid-view.page.html',
  styleUrls: ['./framework-grid-view.page.scss'],
  providers: [],
  // providers: [FilterPipe],
})
export class FrameworkGridViewPage implements OnInit {

  module_id: any;
  table_name: any;
  response: any;
  module_list: any;
  search_val: any;
  loginData: any;
  projectSetup: any;
  showroom: string;
  plant: string;
  project: string;


  constructor(private navParams: NavParams, 
    private modalController: ModalController, 
    public toastController: ToastController,
    public http: HttpClient,
    public appCommon: AppCommon,
   ) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.projectSetup = JSON.parse(localStorage.getItem('projectSetup'));
    this.module_id = this.navParams.data.module_id;
    this.table_name = this.navParams.data.table_name;
    this.search_val = '';
    if (localStorage.getItem('projectSetup') == null || localStorage.getItem('projectSetup') == undefined || localStorage.getItem('projectSetup') == 'undefined' || localStorage.getItem('projectSetup') == '') {
      this.plant = '0'
      this.showroom = '0'
      this.project = '0'
    }
    else {
      this.plant = this.projectSetup['plant']; 
      this.showroom = this.projectSetup['showroom'];
      this.project = this.projectSetup['project'];
    }
    this.getModuleDetails(this.search_val);
  }

  
   getModuleDetails(search_string: any) {

    this.module_list = [];

   let postData = {
      'module_id': this.module_id,
      'table_name': this.table_name,
      'plant': this.plant,
      'showroom': this.showroom,
      'project': this.project,    
      'search_string': search_string
    };

    this.http.post(this.appCommon.baseAppUrl + "appViewModuleDetails&module", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {

          this.module_list = response['data'];
         // this.appCommon.presentToast(this.module_list);

        } else {
          this.appCommon.presentToast(response['status']);
        }

      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

  async close() {
    const onClosedData: any = {
      'internal_code': '0'
    };
    await this.modalController.dismiss(onClosedData);
  }

  getItems(ev: any) {
    this.search_val = ev.target.value;
    this.getModuleDetails(this.search_val)
  }


  async editRecord(id: any) {

    const onClosedData: any = {
      'internal_code': id
    };
    console.log("Selected Value->" + JSON.stringify(onClosedData))
    await this.modalController.dismiss(onClosedData);
  }

  // async closeModal(internal_code: any, value: any) {

  //   const onClosedData: any = {
  //     'internal_code': '0'
  //   };
  //   await this.modalController.dismiss(onClosedData);
  // }


}
