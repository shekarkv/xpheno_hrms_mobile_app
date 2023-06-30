import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, NavController, Platform } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { HttpClient, HttpHeaders   } from '@angular/common/http';
// import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
// import {FCM} from 'cordova-plugin-fcm-with-dependecy-updated/ionic';
import packageInfo from '../../../../package.json'; 
import { Device } from '@capacitor/device';
import { PushNotifications } from '@capacitor/push-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isUsernameValid = true;
  isPasswordValid = true;

  loginClicked: any = false;

  username: any;
  password: any;
  token: any;
  current_platform: any;
  loginData: any;
  UniqueDeviceID:string;
  fp_user_name: any;
  employee: any;
  user_name: any;
  data: any;
  email_id: any;

  constructor(
    public menuCtrl: MenuController,
    public appCommon: AppCommon,
    public navCtrl: NavController,
    public http: HttpClient,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    // private uniqueDeviceID: UniqueDeviceID,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    console.log('in login 1');
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.current_platform = 'android';
      } else if (this.platform.is('ios')) {
        this.current_platform = 'ios';
      } else {
        this.current_platform = 'desktop';
      }

     
      // FCM.getToken().then(token => {
      //   console.log('token > '+token);
      //   localStorage.setItem('token', token);
      // });
    });

   
    // ionic push notification example
    // FCM.onNotification().subscribe(data => {
    //   console.log("fcm data -> "+JSON.stringify(data));
    //   if (data.wasTapped) {
    //     console.log('Received in background');
    //     // alert(data.title);
    //     this.navCtrl.navigateRoot('/employee');  
        
    //   } else {
    //     console.log('Received in foreground');  
    //     let body = JSON.parse(data.body);  
    //     alert(data.title+' : '+body.msg+' : '+body.module);
    //   }

    // }); 
   
    console.log('in login 2');
    if (this.current_platform != 'desktop') {  

      let localStoragedata = localStorage.getItem('loginData');
      if(localStoragedata != null)
      { 
        this.loginData = JSON.parse(localStorage.getItem('loginData'));   
        if(this.loginData == '' || this.loginData == undefined || this.loginData == 'undefined' || this.loginData==null)
        { 
          this.navCtrl.navigateRoot('/login');
        }
        else
        {
          this.navCtrl.navigateRoot('/home');
        } 
      }
    }
    // this.onLoginFunc(); 
    
    this.UniqueDeviceID = localStorage.getItem('uuid');
  }
  changeTheme(arg0: string) {
    throw new Error('Method not implemented.');
  }

  // async getUniqueDeviceID(loginData) {
  //   this.uniqueDeviceID.get()
  //     .then((uuid: any) => {
  //       console.log("uuid - "+uuid);
  //       this.UniqueDeviceID = uuid;
  //       localStorage.setItem('uuid', uuid);
         
        //  this.SaveDeviceData(loginData);
  //     })
  //     .catch((error: any) => {
  //       console.log(error); 
  //       this.UniqueDeviceID = "Error! ${error}";
  //     });
  // }


  validate(): boolean {
    this.isUsernameValid = true;
    this.isPasswordValid = true;
    if (!this.username || this.username.length === 0) {
      this.isUsernameValid = false;
    }

    if (!this.password || this.password.length === 0) {
      this.isPasswordValid = false;
    }

    return this.isPasswordValid && this.isUsernameValid;
  }

  async onLoginFunc() {

    if (this.username == '' || this.username == undefined || this.username == 'undefined') {
      this.appCommon.presentToast('Username cannot be empty');
      return false;
    }

    if (this.password == '' || this.password == undefined || this.password == 'undefined') {
      this.appCommon.presentToast('Password cannot be empty');
      return false;
    }

    if (this.current_platform != 'desktop')
      this.token = localStorage.getItem('token')
    else
      this.token = 'no-token';

    this.appCommon.presentLoader("Logging in");

    // this.uniqueDeviceID.get()
    // .then((uuid: any) => { 
      // localStorage.setItem('uuid', uuid);  
    PushNotifications.requestPermissions().then(permission => {            
        if (permission.receive === 'granted') {                
            PushNotifications.register();           
        }   else {                
            // If permission is not granted            
        }        
    });

    PushNotifications.addListener('pushNotificationActionPerformed',(notification) => {

        console.log('App opened',notification) 
      }
    );

    PushNotifications.addListener('registration', (token) => {       
        localStorage.setItem('token',token.value);
        // alert(token.value);       
      
      });  

    const uuid = await Device.getId().then((deviceinfo: any) => {
              // alert("uuid - "+JSON.stringify(uuid)); 
      localStorage.setItem('uuid', deviceinfo.uuid);
      this.UniqueDeviceID = deviceinfo.uuid;
      let uuid  = deviceinfo.uuid;

      console.log("uuid - "+uuid);
           
      let postData = {
        'username': this.username,
        'password': this.password,
        'token': this.token,
        'current_platform': this.current_platform,
        // 'uuid': this.UniqueDeviceID,   
        'uuid': uuid,   
        'device_type':this.current_platform,
        // 'user_id':JSON.stringify(loginData['loginData']['user_id']),
        'app_version': packageInfo.version
      }

      if (navigator.onLine) {
        //CONTINUE
      } else {
        this.appCommon.presentNoInternetToast('No Network Connection');
        return false;
      }

      this.loginClicked = true;

      var headers = new HttpHeaders({
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      });
      const requestOptions = { headers: headers };
       
     
      this.http.post(this.appCommon.baseAppUrl + "ValidateUserNamePwdFromMobile", postData,requestOptions)
        .subscribe((response:any) => {

          console.table(response)
          this.appCommon.dismissLoader();
  
          if (response['error_code'] == '0') {

            this.loginClicked = false;
            var loginResponse = response['data']; 
            
            if (loginResponse['loginData']['count'] == '1') {
              // this.getUniqueDeviceID(loginResponse);
              // this.SaveDeviceData(loginResponse);
              localStorage.setItem('app_version', packageInfo.version);

              if(loginResponse['loginData']['is_registered'] != 'yes')
              {
                if(loginResponse['loginData']['is_registered'] == 'no')
                {
                  this.SaveDeviceData(loginResponse);
                  // this.getUniqueDeviceID(loginResponse);

                  localStorage.setItem('loginData', JSON.stringify(loginResponse['loginData']));
                  localStorage.setItem('employeeData', JSON.stringify(loginResponse['emp_info_data']));
                  localStorage.setItem('menuData', JSON.stringify(loginResponse['menu_data']));
                  localStorage.setItem('userTheme', JSON.stringify(loginResponse['loginData']['fw_user_theme']));
                  window.location.reload();
                  this.navCtrl.navigateRoot('/home');
                }
                else
                {
                  this.changeRegistration(loginResponse);
                }
              }
              else
              {
                this.SaveDeviceData(loginResponse);
                localStorage.setItem('loginData', JSON.stringify(loginResponse['loginData']));
                localStorage.setItem('employeeData', JSON.stringify(loginResponse['emp_info_data']));
                localStorage.setItem('menuData', JSON.stringify(loginResponse['menu_data']));
                localStorage.setItem('userTheme', JSON.stringify(loginResponse['loginData']['fw_user_theme']));
                window.location.reload();
                this.navCtrl.navigateRoot('/home');
              }

            } else {

              this.appCommon.presentToast('Invalid Credentials');

            }
          } else {
            this.loginClicked = false;
            this.appCommon.presentToast(response['status']);
          }

        }, error => {
          this.loginClicked = false;
          this.appCommon.presentToast("Error->" + JSON.stringify(error))
        });

    // })
    // .catch((error: any) => {
    //   console.log(error);  
    // });
    })
    .catch((error: any) => {
      console.log(error);  
    });


  } 

  async SaveDeviceData(loginData) {  
    if (navigator.onLine) { 
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
     
    var headers = new HttpHeaders({
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Content-Type': 'application/json',
      "Accept": 'application/json'
     });
    const requestOptions = { headers: headers };

    let postData = {
      'uuid': this.UniqueDeviceID,   
      'device_type':this.current_platform,
      'user_id':JSON.stringify(loginData['loginData']['user_id']),
      'app_version': packageInfo.version,
      'token': localStorage.getItem('token')
    };

    await this.http.post(this.appCommon.baseAppUrl + "SaveDeviceDataFromMobile", postData, requestOptions)
      .subscribe(response => { 
   
        console.table("SaveDeviceData -> "+response)  
        }, error => { 
          this.appCommon.presentAlert(error)
      });
  }

  async changeRegistration(loginData) {
    this.appCommon.dismissLoader();
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'User already registered to another device, want to apply for a new registration?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes', 
          handler: data => {   
            this.appCommon.presentToast('Sending request to HR!');
            // this.appCommon.presentToast('Request sent, Please wait for HR to process the request!');
            this.sendRegistrationReq(loginData);
          } 
        }   
      ],
      // inputs: [
      //   {
      //     type: 'textarea',
      //     placeholder: 'Reason For Reject',
      //     name:'reject_reason',
      //   },
      // ],
    });

    await alert.present();
  }

  sendRegistrationReq(loginData) {  
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
     
    var headers = new HttpHeaders({
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Content-Type': 'application/json',
      "Accept": 'application/json'
     });
    const requestOptions = { headers: headers };

    let postData = {
      'uuid': this.UniqueDeviceID,   
      'user_id':JSON.stringify(loginData['loginData']['user_id']),
      'token': localStorage.getItem('token')
    };

    this.http.post(this.appCommon.baseAppUrl + "sendRegistrationReqFromMobile", postData, requestOptions)
      .subscribe(response => { 
        
        console.table(response) 

        this.appCommon.presentToast('Request sent, Please wait for HR to process the request!');
        // if (response['error_code'] == '0') { 
        //   }   else { 
        //     this.appCommon.presentToast("Error!")
        //   } 
        }, error => { 
          this.appCommon.presentAlert(error)
          this.appCommon.presentToast('Request filed to send!');
      });
  }

  SendForgotPassword() {

    if (this.username == '' || this.username == undefined || this.username == 'undefined') {
      this.appCommon.presentToast('Username cannot be empty');
      return false;
    }
    
    let postData = {
      'username': this.username,
    }
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    this.appCommon.presentLoader('Please Wait...')
    this.http.post(this.appCommon.baseAppUrl + "SendForgotPasswordFromMobile", postData)
      .subscribe(response => {

        console.table(response) 
        this.appCommon.dismissLoader();
        if (response['error_code'] == '0') {
  
          this.appCommon.presentToast(response['data']);
        } 
        else 
        {
          this.appCommon.presentToast(response['data']) 
        }

      }, error => {  
        this.appCommon.presentAlert(error)
      });
  }

}
