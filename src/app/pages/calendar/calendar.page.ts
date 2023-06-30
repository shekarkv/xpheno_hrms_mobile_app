import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { formatDate,DatePipe } from '@angular/common';
import { AlertController, ModalController } from '@ionic/angular';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { AppCommon } from 'src/app/app.common';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})


export class CalendarPage implements OnInit {
    
  selectedDate: Date;
  viewTitle: any;
  eventSource = [];
  startHour:number = 9;
  endHour:number = 19;
  step:number = 30;
  startingDayWeek:number = 1;
  textDescription :any;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  
  calendarMode:CalendarMode = 'month';

  calendar = {
    mode:this.calendarMode,
    currentDate: new Date(),
  };
  loginData: any;

  constructor(
    public appCommon: AppCommon,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData')); 
  }

  onTimeSelected(ev) {    
    this.selectedDate = new Date(ev.selectedTime);
  }

  onCurrentDateChanged(ev) {    
    let postData = {
      "employee": this.loginData['fw_emp_int_code'],
      "date": new Date(ev),
    } 
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.http.post(this.appCommon.baseAppUrl + "getCalendarDescriptionData", postData)
      .subscribe(response => {
  
        console.table(response) 

        if (response['error_code'] == '0') { 
          this.textDescription = response['data']['description'];
        } else {
          this.appCommon.presentToast(response['status']); 
        }

      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

  next() {
    this.myCal.slideNext();
  }
 
  back() {
    this.myCal.slidePrev();
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  async onEventSelected(event) {
    // let start = formatDate(event.startTime, 'medium', 'en-US');
    // let end = formatDate(event.endTime, 'medium', 'en-US');
    // let start_time = event.startTime.toISOString() 
 
    // const alert = await this.alertCtrl.create({
    //   header: event.title,
    //   // subHeader: event.desc,
    //   message: 'From: ' + start + '<br><br>To: ' + end,
    //   // buttons: ['OK'],
    //   cssClass: 'event-alert',
    //   buttons: [{
    //     text: 'Delete', 
    //     cssClass: 'danger-btn',
    //     handler: () => { 
    //       this.deleteEvent(event, start_time);
    //     }
    //   }, {
    //     text: 'Ok',
    //     handler: () => { 
    //     }
    //   }]
    // });
    // alert.present();
  }

  async openCalModal() { 
  }

}
