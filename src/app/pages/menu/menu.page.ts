import { Component, OnInit } from '@angular/core';
// import { MenuService } from '../../services/menu-service';
import { NavController } from '@ionic/angular';
import { AlertController, Platform, LoadingController } from '@ionic/angular'; 

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public appPages:any = [];
  photo: any = 'assets/imgs/avatar/dp.png';
  
  headerMenuItem = {
    'image': '',
    'title': '',
    'background': ''
  }

  login_real_name: any;
  loginData: any;
  gedit_int_code: any;
  profile_name: string;

  menuLevel1 = null;
  menuLevel2 = null;
  menuLevel3 = null;

  constructor(
    // private menuService: MenuService,
    // private navController: NavController,
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController
  ) {
    console.log('in menu 1');
    // this.appPages = this.menuService.getAllThemes()
    this.appPages = JSON.parse(localStorage.getItem('menuData'));
    // this.appPages = this.menuService.getMenuData()

    // this.headerMenuItem = this.menuService.getDataForTheme(null)
    this.headerMenuItem = {
      'background': 'assets/imgs/background/31.jpg',
      'image': '',
      'title': 'Ionic UI - Billy Theme'
    };
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
  }

  openPage(page: any) {
    this.navCtrl.navigateRoot([page.url], {});
   
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
}
