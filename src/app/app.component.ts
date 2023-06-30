import { Component } from '@angular/core';
import { AlertController, Platform, LoadingController } from '@ionic/angular'; 
import { MenuService } from './services/menu-service';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppCommon } from './app.common'; 
// import {FCM} from 'cordova-plugin-fcm-with-dependecy-updated/ionic';
// import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { NotificationsService } from './services/notifications-service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: []
})
export class AppComponent {
  menuLevel1 = null;
  menuLevel2 = null;
  menuLevel3 = null;
  
  public appPages:any = [];
  photo: any = 'assets/imgs/avatar/dp.png';
 
  headerMenuItem = {
    'image': '',
    'title': '',
    'background': ''
  }
  login_real_name: any;
  isEnabledRTL: boolean = false;
  loginData: any;
  gedit_int_code: any;
  profile_name: string;

  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private menuService: MenuService,
    private navController: NavController,
    public http: HttpClient,
    public appCommon: AppCommon,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    // private uniqueDeviceID: UniqueDeviceID,
    public loadingCtrl: LoadingController,
    public pushNotifications: NotificationsService
  ) {
    this.isEnabledRTL = localStorage.getItem('isEnabledRTL') == "true";

    this.pushNotifications.initPush();
    
    this.initializeApp();
    this.appPages = JSON.parse(localStorage.getItem('menuData'));   
    // this.appPages = this.menuService.getAllThemes()
    // this.getMenuData()
    this.headerMenuItem = this.menuService.getDataForTheme(null)
    let localStoragedata = localStorage.getItem('loginData');
    if(localStoragedata != null)
    { 
      this.loginData = JSON.parse(localStoragedata);
      this.login_real_name = this.loginData['login_real_name'];  
      this.profile_name = this.loginData['login_username']+' - '+this.loginData['login_real_name'];  
      this.photo = this.loginData['profile_photo_url'];  
    }
  }

  ngOnInit() {
    console.log('testestestestes');
    this.http.post('https://xpheno.in/app_config/app_config.php', '').subscribe((res: any) =>{
      console.log(res); 
      localStorage.setItem('app_config', JSON.stringify(res));
      this.appCommon.baseAppUrl = res.locationApiUrl;
      this.appCommon.baseUrl = res.locationUrl;
     }, error => {
        this.appCommon.presentToast(error) 
    });
    
    Geolocation.checkPermissions().then(() => { 
      console.log("got location perms");
    }).catch((error) => {      
      this.appCommon.presentToast("Error getting location data!! Please check if location service is enabled.");
    });  

    this.getUniqueDeviceID()
  } 

  initializeApp() {
 

    this.platform.ready().then(() => {

      // FCM.getToken().then(token => {
      //   console.log('token > '+token);
      //   localStorage.setItem('token', token);
      // });
      // ionic push notification example
      // FCM.onNotification().subscribe(data => {
 
      //   console.log("fcm data -> "+JSON.stringify(data));
      //   if (data.wasTapped) {
      //     console.log('Received in background'); 
          
      //   } else {
      //     console.log('Received in foreground');  
      //     let body = JSON.parse(data.body);   
 
      //     alert(data.title+' : '+body.msg);
      //   }
      // });      

      // FCM.getInitialPushPayload().then((res) => {
      //   alert('ress-'+JSON.stringify(res));
      // })
      // refresh the FCM token
      // FCM.onTokenRefresh().subscribe(token => {
      //   console.log("token -> "+token);
      // });

      // this.statusBar.overlaysWebView(false);
      // this.statusBar.backgroundColorByHexString('#000000');
      //this.splashScreen.hide();
      this.setRTL();
    });
 
  }

  getUniqueDeviceID() {
    // this.uniqueDeviceID.get()
    //   .then((uuid: any) => {
    //     console.log("uuid - "+uuid); 
    //     localStorage.setItem('uuid', uuid); 
    //   })
    //   .catch((error: any) => {
    //     console.log(error);  
    //   });
  }

  setRTL() {
    document.getElementsByTagName('html')[0]
            .setAttribute('dir', this.isEnabledRTL  ? 'rtl': 'ltr');
  }

  openPage(page: any) {
    this.navController.navigateRoot([page.url], {});
   
  }

  async  logout() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm?',
      message: 'Are you sure to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Logout',
          handler: () => {
            setTimeout(() => {
              this.presentLoading();
              localStorage.clear();
              this.navCtrl.navigateRoot('login');
            }, 1000);
          }
        }
      ] 
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait..',
      duration: 2000
    });
    await loading.present();
  }

  levelNav1(navX: string) {
    if (this.isNav1Displayed(navX)) {
      this.menuLevel1 = null;
    } else {
      this.menuLevel1 = navX;
    }
  }
  isNav1Displayed(navX: string) {
    return this.menuLevel1 === navX;
  }
  levelNav2(navX: string) {
    if (this.isNav2Displayed(navX)) {
      this.menuLevel2 = null;
    } else {
      this.menuLevel1 = navX;
      this.menuLevel2 = navX;
    }
  }
  isNav2Displayed(navX: string) {
    return this.menuLevel2 === navX;
  }
  // levelNav3(navX: string) {
  //   if (this.isNav3Displayed(navX)) {
  //     this.menuLevel3 = null;
  //   } else {
  //     this.menuLevel2 = navX;
  //     this.menuLevel3 = navX;
  //   }
  // }
  // isNav3Displayed(navX: string) {
  //   return this.menuLevel3 === navX;
  // }
  clearAccordionNav() {
    this.menuLevel1 = null;
    this.menuLevel2 = null;
    // this.menuLevel3 = null;
  }

  // getMenuData() { 
  //   var menuData = [];

  //   let postData = { 
  //   }

  //   if (navigator.onLine) {
  //     //CONTINUE
  //   } else {
  //     this.appCommon.presentNoInternetToast('No Network Connection');
  //     return false;
  //   } 

  //   var headers = new HttpHeaders({
  //     'Access-Control-Allow-Origin' : '*',
  //     'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
  //     'Content-Type': 'application/json',
  //     "Accept": 'application/json'
  //    });
  //   const requestOptions = { headers: headers };
     
  //   this.http.post(this.appCommon.baseAppUrl + "GetMenuDataFromMobile", postData,requestOptions)
  //     .subscribe((response:any) => {

  //       console.table(response)

  //       if (response['error_code'] == '0') { 
             
  //         this.appPages = response['data'];  
  //       } else { 
  //         this.appCommon.presentToast(response['status']);
  //       }

  //     }, error => { 
  //       this.appCommon.presentToast("Error->" + JSON.stringify(error))
  //     });
  // }
}
