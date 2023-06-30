import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AppCommon {
 
    isLoading = false;
    loaderToShow: any;

    //DEV
    // readonly baseAppUrl: string = 'https://xpheno.in/hrms/app.php?a=';
    // readonly baseUrl: string = 'https://xpheno.in/hrms/'; 
    baseAppUrl: string = '';
    baseUrl: string = ''; 
    //readonly baseAppDocUrl: string = 'https://team.tarka.in/emperor_lift/';
 
    constructor(
        public toastController: ToastController,
        public alertCtrl: AlertController,
        public loadingController: LoadingController,
        public http: HttpClient
    ) {

     
    }

    // async presentToast(message: string) {
    //     const toast = await this.toastController.create({
    //         message: message,
    //         duration: 2000
    //     });
    //     toast.present();
    // }

    async presentNoInternetToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            color: 'danger',
            duration: 2000
        });
        toast.present();
    }

    async presentAlert(Msg) {
        const alert = await this.alertCtrl.create({
            header: 'Alert',
            message: Msg,
            buttons: ['OK']
        });

        await alert.present();
    }

    async presentLoader(Msg: string) {
        this.isLoading = true;
        this.loaderToShow = this.loadingController.create({
            message: Msg
        }).then((res) => {
            res.present().then(() => {
                if (!this.isLoading) {
                    res.dismiss().then(() => console.log('abort presenting'));
                }
            });
            res.onDidDismiss().then((dis) => {
                console.log('Loading dismissed!');
            });
        });
    }

    dismissLoader() {
        this.loadingController.dismiss();
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 5000,
            cssClass: 'custom-toast',
            icon: 'alert-outline',
            buttons: [
              {
                text: 'Dismiss',
                role: 'cancel'
              }
            ],
          });
        toast.present();
      }
      async presentSuccessToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 5000,
            cssClass: 'custom-success-toast',
            icon: 'checkmark-circle-outline',
            buttons: [
              {
                text: 'Dismiss', 
                role: 'cancel'
              }
            ],
          });
        toast.present();
      }

      async Empty(mixed_var: any) {
        var key ;    
        if (mixed_var === "" || mixed_var === 'undefined'||
         
            mixed_var === "0" ||
            mixed_var === null ||     
            typeof mixed_var === 'undefined'
        )
        {
            return true;
        } 
        if (typeof mixed_var == 'object') {
            for (key in mixed_var) {
                return false;
            }        return true;
        }
      
        return false;
      }

      getDistanceFromLatLonInMeter(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        var m = d*1000; //in meter
        return m;
      }
      
      deg2rad(deg) {
        return deg * (Math.PI/180)
      }

      sendPushNotification(postData) { 
     
        console.log("postData - "+JSON.stringify(postData)); 

        this.http.post(this.baseAppUrl + "appSendFirebaseNotification", postData).subscribe((res: any) =>{
            console.log(res);
            // var response = JSON.parse(res.data);
            // this.presentToast(response.data);
        }, error => {
              // this.presentToast(error)
            });
      }
}