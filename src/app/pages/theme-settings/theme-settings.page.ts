import { Component } from '@angular/core';
import { AppCommon } from 'src/app/app.common';
import { HttpClient } from "@angular/common/http";

@Component({
    templateUrl: 'theme-settings.html',
    styleUrls: ['theme-settings.page.scss']
})
export class ThemeSettingsPage {

    isRTLEnabled:Boolean = false;
    loginData: any;
    userTheme: any;
    name: any;

    constructor(   
        public appCommon: AppCommon,
        public http: HttpClient,) {
        this.isRTLEnabled = localStorage.getItem('isEnabledRTL') == "true"
    }

    ngOnInit() {
        this.loginData = JSON.parse(localStorage.getItem('loginData') || ''); 
        this.userTheme = JSON.parse(localStorage.getItem('userTheme')); 
      }

    changeTheme(name) {
        if (name) {
          document.body.removeAttribute("class");
          document.body.classList.add(name);
          localStorage.setItem('userTheme', JSON.stringify(name));
        }
        this.ThemeChanger(name);
    }

    ThemeChanger(userTheme){  
        let postData = { 
          "module_id": "155",
          "module_name": "s_sysdb",  
          "fw_user_theme": userTheme, 
          "user_id":this.loginData['login_int_code'] 
        }  
      
        if (navigator.onLine) {
          //CONTINUE
        } else { 
          this.appCommon.presentNoInternetToast('No Network Connection');
          return false;
        }
      
        this.http.post(this.appCommon.baseAppUrl + "UpdateUserThemeFromMobile", postData)
          .subscribe((response:any) => { 
       
            console.table(response) 
      
         
            if (response['error_code'] == '0') {
              // this.showbutton(); 
            }  
            else 
            {
              this.appCommon.presentToast(response['data']);
            }
          }, error => {
            this.appCommon.presentToast("Error->" + JSON.stringify(error))
          });
       
      }

    ionChangeRTL(e){
        localStorage.setItem('isEnabledRTL', "" + this.isRTLEnabled)

        document.getElementsByTagName('ion-menu')[0]
                .setAttribute('side', this.isRTLEnabled  ? 'end': 'start');
        document.getElementsByTagName('html')[0]
                .setAttribute('dir', this.isRTLEnabled  ? 'rtl': 'ltr');

    }
}
