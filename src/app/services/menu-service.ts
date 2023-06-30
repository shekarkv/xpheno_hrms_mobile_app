import { IService } from './IService';
// import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { AppSettings } from './app-settings';
import { LoadingService } from './loading-service';

@Injectable({ providedIn: 'root' })
export class MenuService implements IService {

  constructor(
    // public af: AngularFireDatabase, 
    private loadingService: LoadingService) { }

  getId = (): string => 'menu';

  getTitle = (): string => 'UIAppTemplate';
  

  //* Data Set for main menu
  getAllThemes = (): Array<any> => {
    return [
      {
        "name" : "Profile",
        "nav" :[
        {
          'url': 'employee',
          'title': 'Employee Profile',
          'theme': 'profile',
          'icon': 'icon-account-outline',
          'listView': true,
          'component': '',
          'singlePage': false
        },
        {
          'url': 'profile-changes',
          'title': 'Profile Changes',
          'theme': 'form',
          'icon': 'icon-account-outline', 
          'listView': true,
          'component': '',
          'singlePage': false
        },
        {
          'url': 'theme-settings',
          'title': 'Theme Settings',
          'theme': 'form',
          'icon': 'icon-settings',  
          'listView': true,
          'component': '',
          'singlePage': false
        }
        
      ]},
      {
        "name" : "Attendance",
        "nav" :[
          {
            'url': 'employee-list',
            'title': 'Approve Attendance',
            'theme': 'listViews',
            'icon': 'icon-format-align-justify', 
            'listView': true,
            'component': '',
            'singlePage': false
          },
        {
          'url': 'monthly-attandence-list',
          'title': 'Monthly Attandence List',
          'theme': 'form',
          'icon': 'icon-format-line-spacing',   
          'listView': true,
          'component': '',
          'singlePage': false
        }, 
        {
          'url': 'on-duty-request',
          'title': 'On Duty Request',
          'theme': 'form',
          'icon': 'icon-comment-outline', 
          'listView': true,
          'component': '',
          'singlePage': false
        },
        {
          'url': 'holiday-list',
          'title': 'Holiday List',
          'theme': 'form',
          'icon': 'icon-content-paste', 
          'listView': true,
          'component': '',
          'singlePage': false
        },
        {
          'url': 'wfh-request',
          'title': 'WFH Request',
          'theme': 'form',
          'icon': 'icon-cellphone-settings',  
          'listView': true,
          'component': '',
          'singlePage': false
        },
        {
          'url': 'comp-off-request',
          'title': 'Comp off Request',
          'theme': 'form',
          'icon': 'icon-book',  
          'listView': true,
          'component': '',
          'singlePage': false
        }
      ]},
        {
          "name" : "Leave",
          "nav" :[ 
            {
              'url': 'apply-leave',
              'title': 'Apply Leave',
              'theme': 'form',
              'icon': 'icon-comment-account',   
              'listView': true,
              'component': '',
              'singlePage': false
        },
        {
          'url': 'comp-off-leave',
          'title': 'Comp off Leave',
          'theme': 'form',
          'icon': 'icon-clipboard',  
          'listView': true,
          'component': '',
          'singlePage': false
        },{
          'url': 'leave-balance',
          'title': 'Leave Balance',
          'theme': 'form',
          'icon': 'icon-clipboard',  
          'listView': true,
          'component': '',
          'singlePage': false
        },
        
      ]}
          
    ];
  }

  getDataForTheme = (menuItem: any) => {
    return {
      'background': 'assets/imgs/background/29.jpg',
      'image': '',
      'title': 'Ionic UI - Billy Theme'
    };
     
  } 

  getEventsForTheme = (menuItem: any): any => {
    return {};
  }

  prepareParams = (item: any) => {
    return {
      title: item.title,
      data: {},
      events: this.getEventsForTheme(item)
    };
  }

  // load(item: any): Observable<any> {
  //   this.loadingService.show();
    // if (AppSettings.IS_FIREBASE_ENABLED) {
    //   return new Observable(observer => {
    //     this.af
    //       .object('menu')
    //       .valueChanges()
    //       .subscribe(snapshot => {
    //         this.loadingService.hide();
    //         observer.next(snapshot);
    //         observer.complete();
    //       }, err => {
    //         this.loadingService.hide();
    //         observer.error([]);
    //         observer.complete();
    //       });
    //   });
    // } else {
    //   return new Observable(observer => {
    //     this.loadingService.hide();
    //     observer.next(this.getDataForTheme(item));
    //     observer.complete();
    //   });
    // }
  // }
}
