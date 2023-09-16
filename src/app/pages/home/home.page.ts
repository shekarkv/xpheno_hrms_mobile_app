import { Component, ViewChild  } from "@angular/core";
import { IonRouterOutlet,Platform, AlertController, MenuController, ModalController, IonModal, LoadingController, NavController  } from "@ionic/angular";
import { AppCommon } from 'src/app/app.common';
import { HttpClient } from "@angular/common/http";
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { MonthlyAttandenceListPage } from '../monthly-attandence-list/monthly-attandence-list.page';
import { TripListPage } from '../trip-list/trip-list.page';
import { Router } from "@angular/router";
import { OverlayEventDetail } from '@ionic/core/components';
import { NavigationExtras} from '@angular/router';
import { Observable } from "rxjs";
import { ApprovalsLevelTwoPage } from "../approvals-level-two/approvals-level-two.page";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  // providers: [],
})
export class HomePage {
  @ViewChild(IonModal) modal: IonModal; 
  startingLocation:any;
  tripStartTime:any;
  tripName:any; 
  locationName:any; 
  trip_int_code:any = 0; 

  isTracking:boolean = false;
  isEndTripModalOpen:boolean = false;


  item = {
    description: "",
    link: "",
    subtitle2: "",
    subtitle: "",
    title: "",
    background: "",
    toolbarTitle: "",
  };

  gettingLocation: any = false;
  isModalOpen = false;
  gedit_int_code: any;
  loginData: any;
  in_time: any;
  out_time: any;
  db_time: any;
  work_latitude: any;
  work_longitude: any;
  in_status: any;
  out_status: any;
  in_flag: boolean = true;
  out_flag: boolean = false;
  name: any;
  client: any;
  location: any;
  employee_data: any; 
  empData: any;
  time_string: any;
  tripTime: any;
  userTheme: any;
  employee: string;
  login_int_code: any;
  check_in_msg: any;
  checked_address: any;
  checkin_data: any;
  attendance_type: any;
  trips_required: any;
  attendance: any;
  geo_fencing: any;
  fencing_dia: any;
  trips_flag:boolean = true;
  attendance_flag: boolean = true;
  exitAlert:boolean = false;
  org_lat: any;
  org_lang: any;
  gps_distance: number;
  checkin_outside_fence : any;
  check_in_within_location = 'Yes';
  check_out_within_location = 'Yes';
  calculate_distance : any;
  dash: any;
  dash_data: any;
  reporting_manager : any;
  start_time: any;
  reason: any;
  currernt_time: any;
  late_check_in: any; 
  geo_address: any;
  client_int_code: any;
  location_int_code: any;
  module_list: any;
  attend_cnt: any;
  fw_claim_appl: any;
  shift_data: any;
  menuData: any;
  attendance_home: any;
  attendance_appl: any;
  leave_appl: any;


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  } 

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      // window.location.reload();
      this.ngOnInit();
    }, 2000);
  };

  ionViewWillEnter(){
    this.ngOnInit();
  }

  constructor(
    public menuCtrl: MenuController,
    public modalController: ModalController,
    public appCommon: AppCommon,
    public http: HttpClient,
    private geolocation: Geolocation,
    private route: Router,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    public alertController: AlertController,
    private routerOutlet: IonRouterOutlet,
    public navCtrl: NavController) {

      this.platform.backButton.subscribeWithPriority(-1, () => {
        if (!this.routerOutlet.canGoBack()) {
          this.exitAlert = true;
          this.exitAppOnBackBtn() 
        }
      });
  }

  ngOnInit() {
    this.checkAppVersion();

    this.menuCtrl.enable(true);
    this.loginData = JSON.parse(localStorage.getItem('loginData') || ''); 
    this.empData = JSON.parse(localStorage.getItem('employeeData')); 
    this.menuData = JSON.parse(localStorage.getItem('menuData')); 
    this.userTheme = JSON.parse(localStorage.getItem('userTheme')); 
    this.loginData['fw_emp_int_code'];
    // this.showbutton(); 
    this.name = this.empData['name']; 
    this.client = this.empData['client_name'];  
    this.location = this.empData['location_name']; 
    this.reporting_manager = this.empData['reporting_manager']; 
    this.geo_address = this.empData['geo_address']; 
    this.client_int_code = this.empData['client_int_code']; 
    this.location_int_code = this.empData['location_int_code']; 
    // alert(this.geo_address);
    this.org_lat = this.empData['latitude']; 
    this.org_lang = this.empData['longitude']; 
    this.getHomeScreenAttendance();
    this.getTripData(); 
    // this.changeTheme('arg0: string')
    document.body.removeAttribute("class");
    document.body.classList.add(this.userTheme);   
    
    this.employee = this.loginData['fw_emp_int_code']; 
    this.fw_claim_appl = this.loginData['fw_claim_appl']; 
    this.attendance_appl = this.loginData['attendance_appl']; 
    this.leave_appl = this.loginData['leave_appl']; 
    // alert(this.attendance_appl );
    // alert(this.leave_appl );
    // this.ngOnInit();
    if(!this.employee)
    {
      this.GetManagerDashboardScreen();
      this.getModuleList();
      this.getAttendanceCount();
      this.trips_flag = false;
    }
    

  }

  checkAppVersion(){
    let postData = { 
      "app_version": localStorage.getItem('app_version'), 
    }  
   
    this.http.post(this.appCommon.baseAppUrl + "checkAppVersionFromMobile",postData, {responseType: 'text'})
    .subscribe((response:any) => {  
      response = JSON.parse(response);
          console.table(response)  
          if (response['error_code'] == '0') { 
            // var app_version = localStorage.getItem('app_version');
            if(response['data']['version_check'] == 'failed' && this.platform.is('android'))
            {
              alert('Please update the app version to '+response['data']['app_version']);
              setTimeout(() => {
                // this.appCommon.presentAlert();
                localStorage.clear();
                this.navCtrl.navigateRoot('login');
              }, 1000);
            }
            else{

            }
          }  
          else 
          {
            // this.appCommon.presentToast(response['data']);
          }
        }, error => {
          this.appCommon.presentToast("Error->" + JSON.stringify(error))
        }); 
  }

  async exitAppOnBackBtn(){
    const alert = await this.alertController.create({
      message: 'Exit the app?',
      buttons: [
        {
          text: 'Yes',
          cssClass: 'secondary',
          handler: () => { 
            navigator['app'].exitApp();
          }
        },
        {
          text: 'No',
          cssClass: 'secondary',
          handler: () => {  
          }
        }
      ]
    });

    if(this.exitAlert == true)
    {
      this.exitAlert = false;
      await alert.present(); 
    }
  }

  changeTheme(arg0: string) {
    throw new Error("Method not implemented.");
  }
  
  
  clearFields() {
    this.gedit_int_code = '0';
    this.ngOnInit();
  }

  appGetIn(reason: any){  
 
    if (navigator.onLine) { 
      //CONTINUE
    } else { 
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
   
    this.gettingLocation = true;

    this.geolocation.getCurrentPosition().then((resp) => { 

      this.work_latitude = resp.coords.latitude;
      this.work_longitude = resp.coords.longitude;
      
      if(this.geo_fencing = 'Yes' && this.org_lat != '' && this.org_lang != '')
      {
        this.gps_distance = this.appCommon.getDistanceFromLatLonInMeter(this.org_lat,this.org_lang,this.work_latitude,this.work_longitude);
      
        if(this.gps_distance > this.fencing_dia)
        {
          this.check_in_within_location = 'No'
          if(this.checkin_outside_fence == 'No')
          {
            this.appCommon.presentToast("Check in Outside Of the Location Not Allowed");
            return false;
          }
          else
            this.appCommon.presentToast("You Have Checked in Outside Of the Location");
        }
       
       
      } 
      let postData = { 
        "module_id": "1082",
        "module_name": "emp_attendance",  
        "gedit_int_code": this.gedit_int_code,
        "user_id": this.loginData['login_int_code'],  
        'login_counter': this.loginData['login_counter'],
        'fw_emp_int_code': this.loginData['fw_emp_int_code'],
        'work_latitude' : this.work_latitude,
        'work_longitude' : this.work_longitude,
        'check_in_within_location' : this.check_in_within_location,
        'reason' : reason,
        
      }  
     
      this.http.post(this.appCommon.baseAppUrl + "insertCheckinDataFromMobile", postData)
        .subscribe((response:any) => {  
          console.table(response)  
          if (response['error_code'] == '0') { 
            // this.showbutton(); 
            this.getHomeScreenAttendance();
          }  
          else 
          {
            this.appCommon.presentToast(response['data']);
          }
        }, error => {
          this.appCommon.presentToast("Error->" + JSON.stringify(error))
        });
 
    }).catch((error) => {     
      this.gettingLocation = false;
    });  
 
  }

  appGetDateTimeOut(){ 
 
    if (navigator.onLine) {
      //CONTINUE
    } else { 
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    this.gettingLocation = true;
    // this.appCommon.presentNoInternetToast('1');
    this.geolocation.getCurrentPosition().then((resp) => {
      this.work_latitude = resp.coords.latitude;
      this.work_longitude = resp.coords.longitude; 
      // this.getlocationout( this.work_latitude,this.work_longitude)
      // this.appCommon.presentNoInternetToast('2');
      if (this.isTracking == true) {
        this.appCommon.presentToast("Please End Trip And Check Out")
        return false;
      }
    
      if(this.geo_fencing = 'Yes' && this.org_lat != '' && this.org_lang != '')
      {
     
        this.gps_distance = this.appCommon.getDistanceFromLatLonInMeter(this.org_lat,this.org_lang,this.work_latitude,this.work_longitude);

        if(this.gps_distance > this.fencing_dia)
        {
          this.check_out_within_location = 'No'
        }
       
      }
      let postData = {
        "module_id": "1082",
        "module_name": "emp_attendance",  
        "gedit_int_code": this.gedit_int_code,
        "user_id": this.loginData['login_int_code'], 
        'login_counter': this.loginData['login_counter'],
        'fw_emp_int_code': this.loginData['fw_emp_int_code'],
        "work_latitude": this.work_latitude, 
        "work_longitude": this.work_longitude,
        'check_out_within_location' : this.check_out_within_location,
      } 
     
      this.http.post(this.appCommon.baseAppUrl + "insertCheckoutDataFromMobile", postData) 
        .subscribe((response:any) => {  
          console.table(response)  
          if (response['error_code'] == '0') { 
            // this.showbutton(); 
            this.getHomeScreenAttendance();
          }  
          else 
          {
            this.appCommon.presentToast(response['data']);
          }
        }, error => {
          this.appCommon.presentToast("Error->" + JSON.stringify(error))
        });

    }).catch((error) => {     
      this.gettingLocation = false;
    });  

    
      // this.buttonDisabled = false;
      // setTimeout(() => {
      //   // Any calls to load data go here
      //   window.location.reload();    
      // }, 2000);
  }

  async AttendenceList() {

    const modal = await this.modalController.create({
      component: MonthlyAttandenceListPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        "isModal": "true",
      }
    });
  
    modal.onDidDismiss().then((dataReturned) => {
      this.gedit_int_code = dataReturned['data']['internal_code']
      console.log('Data Received:', this.gedit_int_code);
      // this.editRecord();
    });
  
    return await modal.present();
  
  }

  getHomeScreenAttendance() {
    if(this.loginData['fw_emp_int_code'] != '')
    {
    let postData = {
									  
											
      "user_id": this.loginData['login_int_code'],
      'login_counter': this.loginData['login_counter'],
      'employee': this.loginData['fw_emp_int_code'],
    }
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.http.post(this.appCommon.baseAppUrl + "GetHomeScreenAttendanceFromMobile", postData, {responseType: 'text'})
      .subscribe(response => {
        response = JSON.parse(response);
        console.table(response) 

        if (response['error_code'] == '0') {
          
          this.check_in_msg = response['data']['time_string']
          if(this.appCommon.Empty(response['data']['out_location'])) 
            this.checked_address = response['data']['in_location'] 
          else 
            this.checked_address = response['data']['out_location']

          this.in_time = response['data']['in_time']
          this.out_time = response['data']['out_time']
          this.attendance_type = response['data']['attendance_type']
          this.trips_required = response['data']['trips_required']
          this.attendance = response['data']['attendance']
          this.geo_fencing = response['data']['geo_fencing']
          this.fencing_dia = response['data']['fencing_dia']
          this.checkin_outside_fence = response['data']['checkin_outside_fence']
          this.shift_data = response['data']['shift_data']

          if(this.attendance == 'Yes')
            this.attendance_flag = true;
          else
            this.attendance_flag = false;

          if(this.employee > '0' &&  this.trips_required == 'Yes')
            this.trips_flag = true;
          else
            this.trips_flag = false;
          
          if((this.attendance == 'Yes') && ( (this.in_time == '')||(this.in_time != '' && this.out_time != ''))){
            this.in_flag = true  
          }
          else
            this.in_flag = false  
          if((this.attendance == 'Yes') && (this.attendance_type == 'Check IN and OUT') && (this.out_time == '' && this.in_time != '')){
            this.out_flag = true
          }
          else
            this.out_flag = false   
         
          // this.time_string = response['data']['check_in_msg']; 
 
        } else {
          // this.appCommon.presentSuccessToast(response['status']); 
        }

      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
      // this.navCtrl.navigateRoot('/home');
    }
  }
  
  startTrip(){ 
    // this.gettingLocation = true;
    this.isTracking = true; 
    var latitude:any;
    var longitude:any;

    this.geolocation.getCurrentPosition().then((resp) => {
      latitude = resp.coords.latitude;
      longitude = resp.coords.longitude; 
      
      let postData = {  
        "employee": this.loginData['fw_emp_int_code'],
        'location': this.startingLocation,
        'tripName': this.tripName,
        'latitude': latitude,
        'longitude': longitude,
      }
      if (navigator.onLine) {
        //CONTINUE
      } else {
        this.appCommon.presentNoInternetToast('No Network Connection');
        return false;
      }
      this.http.post(this.appCommon.baseAppUrl + "saveTripStartDataFromMobile", postData)
        .subscribe(response => { 
          // console.table(response) 

          if (response['error_code'] == '0') {
            this.isTracking = true; 
            this.appCommon.presentSuccessToast(response['data']['msg']);
            this.trip_int_code = response['data']['last_insert_id'];  
            this.getTripData();
   
          } else {
            this.isTracking = false; 
            this.appCommon.presentToast(response['data']['msg']);
          }

        }, error => {
          this.appCommon.presentToast("Error->" + JSON.stringify(error));
          this.isTracking = false; 
      });
    }).catch((error) => {     
      // this.gettingLocation = false;
      this.appCommon.presentToast("Error->" + JSON.stringify(error))
    });  
  }
 

  addPitStop(isEnd){
    // this.isTracking = true; 
    // this.gettingLocation = true;
    var latitude:any;
    var longitude:any;

    this.geolocation.getCurrentPosition().then((resp) => {
      latitude = resp.coords.latitude;
      longitude = resp.coords.longitude; 
      
      let postData = {  
        "employee": this.loginData['fw_emp_int_code'],
        'location': this.locationName,
        'tripName': this.tripName,
        'latitude': latitude,
        'longitude': longitude,
        'isEnd':isEnd,
        'trip_int_code':this.trip_int_code
      }
      
      if (navigator.onLine) {
        //CONTINUE
      } else {
        this.appCommon.presentNoInternetToast('No Network Connection');
        return false;
      }
      this.http.post(this.appCommon.baseAppUrl + "addTripPitStopFromMobile", postData)
        .subscribe(response => {
    
          console.table(response) 

          if (response['error_code'] == '0') {
            this.appCommon.presentToast(response['data']);
            if(isEnd == 'yes')
            {
              this.isTracking = false;
              this.startingLocation = "";
              this.tripName = "";
              this.locationName = "";
            }
            else
            {
              this.isTracking = true;
              this.locationName = "";
            }
  
          } else {
            this.appCommon.presentToast(response['data']);
          }

        }, error => {
          this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
    }).catch((error) => {     
      // this.gettingLocation = false;
      this.appCommon.presentToast("Error->" + JSON.stringify(error))
    }); 
  }


  async viewTripDetails(){
    const modal = await this.modalController.create({
      component: TripListPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        "module_id": "89",
        "table_name": "employee",
        "gedit_int_code": this.gedit_int_code,
        "user_id": this.loginData['login_int_code'],
        'login_counter': this.loginData['login_counter'],
      }
    });
  
    modal.onDidDismiss().then((dataReturned) => {
      this.gedit_int_code = dataReturned['data']['internal_code']
      console.log('Data Received:', this.gedit_int_code);
      // this.editRecord();
    });
  
    return await modal.present();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.isModalOpen = false;
  }
  cancelEndTrip() {
    this.isEndTripModalOpen=false;
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
  confirmEndTrip() {
    this.isEndTripModalOpen=false;
    // this.modal.dismiss(this.name, 'confirm');
    if(this.locationName == null || this.locationName == '')
    {
      this.appCommon.presentToast("Please enter location name!");
      return;
    }
    else
      this.addPitStop('yes');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // console.log('ev.detail.data - '+ev.detail.data);
      if(this.tripName == null || this.tripName == '')
      {
        this.appCommon.presentToast("Please enter details!");
        return;
      }
      if(this.startingLocation == null || this.startingLocation == '')
      {
        this.appCommon.presentToast("Please Enter The Location!");
        return;
      }
      else
        this.startTrip();
    }
  }
  onPitStopDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') { 
      if(this.locationName == null || this.locationName == '')
      {
        this.appCommon.presentToast("Please enter location name!");
        return;
      }
      else
        this.addPitStop('no');
    }
  }

  getTripData(){
    let postData = {
      "employee": this.loginData['fw_emp_int_code']
    }
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.http.post(this.appCommon.baseAppUrl + "getTripDataFromMobile", postData, {responseType: 'text'})
      .subscribe(response => {
        response = JSON.parse(response);
        console.table(response) 

        if (response['error_code'] == '0') {
          if(response['data']['internal_code'] >0)
          {
            this.startingLocation= response['data']['start_location'];
            this.tripName=response['data']['trip_name'];  
            this.trip_int_code=response['data']['internal_code']; 
            this.tripStartTime=response['data']['trip_start']; 
            this.tripTime=response['data']['trip_start_time'];   
            this.isTracking = true;
          }
 
        } else {
          // this.appCommon.presentToast(response['status']);
          this.isTracking = false;
        }

      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
  }

  LeaveBalance() {
    this.route.navigate(['/leave-balance']);
  }
  MyAttendance() {
    this.route.navigate(['/monthly-attandence-list']);
  }
  ApplyLeave() {
    this.route.navigate(['/apply-leave']);
  }
  Holidays() {
    this.route.navigate(['/holiday-list']);
  }
  ApproveAttedance() {
    this.route.navigate(['/employee-list']);
    // .then(() => {
    //   this.getAttendanceCount();
    // });
  }
  Approvals() {
    this.route.navigate(['/approvals']);
  }
  Payslip() {
    this.route.navigate(['/payslip']);
  }
  IDCard() {
    this.route.navigate(['/id-card']);
  }
  claims() {
    this.route.navigate(['/claim-entry']);
  }
  AttedanceReg() {
    this.route.navigate(['/attendance-register']);
  }
  LeaveReg() {
    this.route.navigate(['/leave-register']);
  }
  ClaimsReg() {
    this.route.navigate(['/claims-register']);
  }
  Regularization() {
    this.route.navigate(['/attendance-regularization']);
  }
  RegularizationList() {
    this.route.navigate(['/regularization-register']);
  }
  ExitEmployee() {
    this.route.navigate(['/exit-employees-register']);
  }
  EmployeeLeave() {
    this.route.navigate(['/upcoming-employee-leave']);
  }


  onWillPresent(){ 
    if( this.in_time == '' || this.in_time == undefined)
    {
      this.appCommon.presentToast('Trip can only be started after checking in!');
      this.modal.dismiss();
      return false;
    }
  }

  async CheckInSpinner() {
    const loading = await this.loadingCtrl.create({
      message: 'Checking in...',
      duration: 7000,
      'spinner': 'circular',
    });

    loading.present();
  }

  async CheckOutSpinner() {

    if(this.isTracking == false)
    {
      const loading = await this.loadingCtrl.create({
        message: 'Checking out...',
        duration: 7000,
        'spinner': 'circular',
      });

      loading.present();
    }
  }



  LateCheckIn() {
    this.in_flag = false;
    
    let postData = {
      'employee': this.loginData['fw_emp_int_code'],
      'client_int_code':this.client_int_code, 
      'location_int_code':this.location_int_code,  
      
    }
    
    // alert(this.client);
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.http.post(this.appCommon.baseAppUrl + "EmployeeLateCheckInMsg", postData)
      .subscribe(response => {

        console.table(response) 

        if (response['error_code'] == '0') {
          
          this.late_check_in = response['data']['late_check_in']; 
          // alert(this.late_check_in);  
          if(this.late_check_in == 'Yes')
          {
            // alert("inside"); 
            this.LateCheck();
          }
          else if(this.late_check_in == 'No')
          { 
            // alert("out");
            this.CheckInSpinner();
            this.appGetIn('');
          }
          else
          { 
            this.appCommon.presentToast("No Shift Found");
            return false;
          }
           
           
        } else {
          this.appCommon.presentToast(response['data']);
        }

      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
    });
  }

  async LateCheck() {

    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Reason For Late Check In',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.in_flag = true;
          }
        }, {
          text: 'Submit', 
          handler: data => {  
            if(data.reason == null || data.reason == '')
            {
              this.appCommon.presentToast("Please enter the reason!");
              return false;
            }
            this.CheckInSpinner();
            this.appGetIn(data.reason); 
            
          } 
        }   
      ],
      inputs: [
        {
          type: 'textarea',
          placeholder: 'Enter The Reason',
          name:'reason',
        },
      ],
    });

    await alert.present();
  }

  GetManagerDashboardScreen() {
    let postData = {
      'employee': this.loginData['fw_emp_int_code'],
      'fw_repmgr_code':  this.loginData['fw_repmgr_code'],
      
    }
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.http.post(this.appCommon.baseAppUrl + "GetManagerDashboardFromMobile", postData)
      .subscribe(response => {

        console.table(response) 

        if (response['error_code'] == '0') {

          this.dash_data = response['data']

        } else {
          this.dash_data = [];
          console.log(this.dash_data)
          this.appCommon.presentToast("No Records Found")
        }

      }, error => {  
        this.dash_data = [];
        this.appCommon.presentAlert(error)
      });
  }

  OpenEmployeeDashboard(type) {  
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'type': type
      }
  };
    this.route.navigate(['/manager-dashboard'],navigationExtras);
    
  }

  getModuleList() {

    let postData = {
      'login_int_code': this.loginData['login_int_code']
    };

    this.http.post(this.appCommon.baseAppUrl + "appGetApprovalsLevelOneModuleList", postData)
      .subscribe(response => {

        if (response['error_code'] == '0') {
          this.module_list = response['data'];
        }
        else {
          this.module_list = [];
          console.log(this.module_list)
          this.appCommon.presentToast("No Pending Approvals")
        }

      }, error => {
        this.module_list = [];
        this.appCommon.presentAlert(error)
      });
  }

  async openModule(system_module_table_name: any, module_id: any, display_module_name: any) {

    const modal = await this.modalController.create({
      component: ApprovalsLevelTwoPage,
      componentProps: {
        "system_module_table_name": system_module_table_name,
        "module_id": module_id,
        "display_module_name": display_module_name
      }
    });

    modal.onDidDismiss().then(() => {
      this.getModuleList();
    });

    return await modal.present();
  }

  getAttendanceCount() {
    let postData = {
      "user_id": this.loginData['login_int_code'],  
      'employee':  this.loginData['fw_emp_int_code'],
      'fw_repmgr_code':  this.loginData['fw_repmgr_code'],
    }
    
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }
    this.http.post(this.appCommon.baseAppUrl + "GetApproveAttendanceCountFromMobile", postData, {responseType: 'text'})
      .subscribe(response => {

        console.table("GetApproveAttendanceCountFromMobile..."+response)
        response = JSON.parse(response);

        if (response['error_code'] == '0') {

            this.attend_cnt = response['data'];     

        } else {
          // this.appCommon.presentToast(response['status']);
        }

      }, error => {
        this.appCommon.presentToast("Error->" + JSON.stringify(error))
      });
      
  }
  

}
