import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController, IonModal } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { MapsPage } from '../maps/maps.page';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.page.html',
  styleUrls: ['./trip-list.page.scss'],
}) 
export class TripListPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal; 

  loginData: any;
  trip_list: any;
  trip_name: any;
  trip_start: any; 
  start_location: any;
  pit_stops:any;
  isModalOpen: boolean = false;
  trip_start_time: any;
  trip_int_code: any;
  selected_trip:any;
  total_dist:any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController, 
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router,) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.getTripList();
  }

  getTripList() {
    let postData = {
      'login_int_code': this.loginData['login_int_code'],
      "employee": this.loginData['fw_emp_int_code']
    }
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.http.post(this.appCommon.baseAppUrl + "getTripListFromMobile", postData)
      .subscribe(response => {

        console.table(response)

        if (response['error_code'] == '0') {

            this.trip_list = response['data'];     

        } else {
          this.appCommon.presentToast(response['status']);
        }

      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }
  getTripData(data){
    this.start_location = data.start_location; 
    this.trip_start = data.trip_start; 
    this.trip_name = data.trip_name; 
    this.trip_start_time = data.trip_start_time; 
    this.trip_int_code = data.internal_code;
    this.selected_trip = data;
    this.isModalOpen = true;
    let postData = {
      "int_code": data.internal_code
    }
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.http.post(this.appCommon.baseAppUrl + "getTripDataByIntCodeFromMobile", postData)
      .subscribe(response => {
  
        console.table(response) 

        if (response['error_code'] == '0') {
           
            this.isModalOpen = true; 
            this.pit_stops=response['data'];    
            this.total_dist = response['data'][0]['tot_distance'];
          
        } else { 
          // this.isModalOpen = false;
        }

      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.isModalOpen = false;
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
    this.isModalOpen = false;
  }

  onWillDismiss(event: Event) { 
    this.modal.dismiss(null, 'cancel');
    this.isModalOpen = false;
  }

  async openMap(){
    const modal = await this.modalController.create({
      component: MapsPage,
      cssClass: 'my-custom-modal-css',
      componentProps: { 
        "isModal": "true",
        "trip_int_code": this.trip_int_code,
        "pit_stops": this.pit_stops,
        "selected_trip": this.selected_trip,
      }
    });
  
    modal.onDidDismiss().then((dataReturned) => { 
    });
  
    return await modal.present();
   }

   GoBack() {
    this.modalController.dismiss(null, 'cancel');
  }
}
