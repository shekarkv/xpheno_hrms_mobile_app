import { Component, OnInit } from '@angular/core';
import { NavController, ModalController,NavParams } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";

// import { MapsService } from "./../../services/maps-service";
import { ToastService } from "src/app/services/toast-service";

import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage {

  isModal: boolean = false;
  trip_int_code=0;
  pit_stops:any;
  selected_trip_data:any;

  data = {
    toolbarTitle: '',
    map:{},
    origin:{},
    destination:{}
    // waypoints:{}
  };
  type: string;

  nativeGeocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(public navCtrl: NavController, 
    // private service: MapsService, 
    private toastCtrl: ToastService, 
    private route: ActivatedRoute,
    private nativeGeocoder: NativeGeocoder,
    private modalController: ModalController,
    public navParams: NavParams) {
    this.type = this.route.snapshot.paramMap.get("type");

    this.isModal = this.navParams.get('isModal');
    this.trip_int_code = this.navParams.get('trip_int_code');
    this.pit_stops = this.navParams.get('pit_stops');
    this.selected_trip_data = this.navParams.get('selected_trip');

    this.data = this.formMapData(this.selected_trip_data,this.pit_stops);
 

    // this.service.load(service.getAllThemes()[this.type]
    // ).subscribe((d) => {
    //   this.data = d;
    // });

    // this.data = service.getDataForLayout3();
    // this.data = {
    //         'toolbarTitle': 'Full Screen View',
    //         'map': {
    //             'lat': 24.799448,
    //             'lng': 120.979021,
    //             'zoom': 15,
    //             'mapTypeControl': true,
    //             'streetViewControl': true
    //         },
    //         'origin':  { 'lat': 29.8174782, 'lng': -95.6814757 },
    //         'destination': { 'lat': 40.6976637, 'lng': -74.119764 },
    //         'waypoints' : [
    //             {'location': { 'lat': 39.0921167, 'lng': -94.8559005 }},
    //             {'location': { 'lat': 41.8339037, 'lng': -87.8720468 }},
    //             {'location': { 'lat': 41.8339037, 'lng': -80.8720468 }}
    //          ],
    //     };
 

    this.nativeGeocoder.reverseGeocode(52.5072095, 13.1452818, this.nativeGeocoderOptions)
    .then((result: NativeGeocoderResult[]) => console.log(JSON.stringify(result)))
    .catch((error: any) => console.log(error));
 
  }
 

  isType(item) {
    return item === parseInt(this.type, 10);
  }

  // events
  onLike(params) {
    this.toastCtrl.presentToast("onLike:" + JSON.stringify(params));
  }

  onFavorite(params) {
    this.toastCtrl.presentToast("onFavorite:" + JSON.stringify(params));
  }

  onShare(params) {
    this.toastCtrl.presentToast("onShare:" + JSON.stringify(params));
  }

  onItemClick(params) {
    this.toastCtrl.presentToast("onItemClick:" + JSON.stringify(params));
  }

  onRates(params) {
    this.toastCtrl.presentToast("onRates:" + JSON.stringify(params));
  }

  close() {
    this.modalController.dismiss();
  }
 
  formMapData(selected_trip_data, pit_stops){

    var title = selected_trip_data.trip_name;
    var start_location = selected_trip_data.start_location;
    var start_latitude = parseFloat(selected_trip_data.start_latitude); 
    var start_longitude = parseFloat(selected_trip_data.start_longitude);
    var end_latitude = parseFloat(selected_trip_data.end_latitude);
    var end_longitude = parseFloat(selected_trip_data.end_longitude);

    var waypoints = [];

    for(let p of pit_stops)
    {
      waypoints.push({'location': { 'lat': parseFloat(p.stop_latitude), 'lng': parseFloat(p.stop_longitude)}})
        
    }
    
    return {
      'toolbarTitle': title,
      'map': {
          'lat': start_latitude,
          'lng': start_longitude,
          'zoom': 15,
          'mapTypeControl': true,
          'streetViewControl': true
      },
      'origin':  { 'lat': start_latitude, 'lng': start_longitude },
      'destination': { 'lat': end_latitude, 'lng': end_longitude },
      'waypoints' : waypoints
   };
  }
}
