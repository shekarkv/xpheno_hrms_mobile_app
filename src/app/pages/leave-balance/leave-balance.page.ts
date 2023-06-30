import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.page.html',
  styleUrls: ['./leave-balance.page.scss'],
})
export class LeaveBalancePage implements OnInit {
  loginData: any;
  gedit_int_code: any;
  empData: any;
  leave_balance: any;
  login_mobile_no: any;
  father_name: any;
  address: any;
  employee: any;
  short_name: any;
  leave_details: any;
  leave_int_code: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController, 
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router) { }

    ngOnInit() {
      this.loginData = JSON.parse(localStorage.getItem('loginData'));
      this.empData = JSON.parse(localStorage.getItem('employeeData'));  
      this.employee = this.loginData['fw_emp_int_code'];
      this.getLeaveBalance();
    }

    getLeaveBalance() {
      if (navigator.onLine) {
        //CONTINUE
      } else {
        this.appCommon.presentNoInternetToast('No Network Connection');
        return false;
      }
      // this.saveClicked = true;
      let postData = { 
        'employee': this.employee,  
        
      };  
      this.http.post(this.appCommon.baseAppUrl + "GetLeavebalanceArrayForEmployeeFromMobile", postData)
        .subscribe(response => { 
     
          console.table(response)
  
          if (response['error_code'] == '0') {
  
              this.leave_balance = response['data'];     
  
          } else {
            this.leave_balance = [];
            console.log(this.leave_balance)
            this.appCommon.presentToast("No Records Found")
          }
  
        }, error => {  
          this.leave_balance = [];
          this.appCommon.presentAlert(error)
        });
    }

    OpenLeaveDetailsForLeaveType(leave_int_code,short_name) {  
      let navigationExtras: NavigationExtras = {
        queryParams: {
          leave_int_code : leave_int_code,
          'short_name': short_name
        }
    };
      this.route.navigate(['/leave-details'],navigationExtras);
      
    }

}
