import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams, Platform } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { FrameworkReferenceFieldPage } from '../framework-reference-field/framework-reference-field.page';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx'; 
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx'; 
import { File } from '@awesome-cordova-plugins/file/ngx';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DocumentPicker } from '@awesome-cordova-plugins/document-picker/ngx';

@Component({
  selector: 'app-claim-entry-details',
  templateUrl: './claim-entry-details.page.html',
  styleUrls: ['./claim-entry-details.page.scss'],
})
export class ClaimEntryDetailsPage implements OnInit {
  group_int_code: any;
  claim_date: any;
  component: any;
  txt_ref_schema_component: any;
  kilometers: any;
  from_place: any;
  to_place: any;
  amount: any;
  loginData: any;
  saveClicked: boolean = false;
  employee: any;
  empData: any;
  remarks: any;
  items_clicked: boolean = false;
  show_km: boolean = false;
  show_place: boolean = false;
  show_attach: boolean = false;
  attachmentBase64:any = '';
  is_image: any = 'Yes';
  lastImage: string;
  view_file_name: any = ''; 
  targetPath: string;
  filename: string;
  logged_in_member: any;
  othermemberid: any = [];
  myStuff: string;
  status: any; 
  chatMembers: any = [];
  conversations: any;
  is_contact: any = 'No';
  contact_attch_name: string;
  contact_attch_phone: string; 
  base64Image: string; 
  file_type: string; 
  attachment1: string;
  claim_type: any;
  city_category: any;
  total_amount: any;
  component_data: any;
  per_km_amount: any;
  max_amount: any;
  bills_required: any;
  place_required: any;
  trip_claim: any;
  count: any;
  start_location: any;
  end_location: any;
  cut_off_date: any;
  current_date: any;
  isEnabled: boolean = false;

  constructor(private modalController: ModalController,
    public http: HttpClient,
    public alertController: AlertController,
    private navParams: NavParams,
    public appCommon: AppCommon,
    private camera: Camera,
    private photoViewer: PhotoViewer,
    private fileChooser: Chooser,
    private transfer: FileTransfer,
    private file: File,
    private activatedRoute: ActivatedRoute,
    private docPicker: DocumentPicker,
    private plt: Platform,) { }

  ngOnInit() {
    console.table(this.navParams);
    this.group_int_code = this.navParams.data.group_int_code;
    this.claim_date = this.navParams.data.claim_date;
    this.component = this.navParams.data.component;
    this.txt_ref_schema_component = this.navParams.data.txt_ref_schema_component;
    this.kilometers = this.navParams.data.kilometers;
    this.from_place = this.navParams.data.from_place;
    this.to_place = this.navParams.data.to_place;
    this.amount = this.navParams.data.amount;
    this.remarks = this.navParams.data.remarks;
    this.attachment1 = this.navParams.data.attachment1;
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData'));   
    this.employee = this.loginData['fw_emp_int_code']; 
    this.current_date = this.loginData['fw_current_date']; 
  }

  async getComponentReferenceData() {
    if (navigator.onLine) {
      //CONTINUE
    } else {
      this.appCommon.presentNoInternetToast('No Network Connection');
      return false;
    }

    const modal = await this.modalController.create({
      component: FrameworkReferenceFieldPage,
      componentProps: {
        pop_up_table_name: 'claim_components',
        calling_table_name: 'claim_entry',
        system_name: 'component',
        value: '',
        ref_search_value: 0, 
        search_ref_module_db_field: 0,
        all_data_obj:{employee:this.employee,claim_type:this.claim_type,city_category:this.city_category} 
      }
    });
    modal.onDidDismiss().then((dataReturned) => {   

      console.table('Ref Data Received' + JSON.stringify(dataReturned));

      if (dataReturned['data']['internal_code'] > 0) {
        this.component = dataReturned['data']['internal_code'];
        this.txt_ref_schema_component = dataReturned['data']['value'];
      }
    });
    return await modal.present();
  }
  
  async closeModal() {
    const onClosedData: any = {
      quantity: '0'
    };
    await this.modalController.dismiss(onClosedData);
  }

  async SaveClaimDetails() {

    if (this.claim_date == 'undefined' || this.claim_date == undefined || this.claim_date == '' || this.claim_date == '0') {
      this.appCommon.presentToast("Select the Claim Date")
      return false;
    }

    if (this.cut_off_date != '' && this.current_date > this.cut_off_date){ 
      this.appCommon.presentToast("You cannot claim for this date as the cutoff date is over")
      return false;
    }
    
    if (this.amount == 'undefined' || this.amount == undefined || this.amount == '' || this.amount == '0') {
      this.appCommon.presentToast("Please Enter Amount")
      return false;
    }
    // if (this.amount > this.max_amount) {
    if (parseFloat(this.amount) > parseFloat(this.max_amount)){
      this.appCommon.presentToast("Please Enter Amount Less Than " + this.max_amount)
      return false;
    }
    if (this.show_attach == true && (this.attachment1 == 'undefined' || this.attachment1 == undefined || this.attachment1 == '')){
      // this.attachment1 = '';
      this.appCommon.presentToast("Please upload Document")
      return false;
    }
    if (this.show_attach == false)
       this.attachment1 = '';

    if (this.group_int_code == 'undefined' || this.group_int_code == undefined || this.group_int_code == '')
      this.group_int_code = '0';

    const onClosedData: any = {

      group_int_code: this.group_int_code,
      claim_date: this.claim_date.substr(0,10), 
      component: this.component,
      txt_ref_schema_component: this.txt_ref_schema_component,
      kilometers: this.kilometers,
      from_place: this.from_place,
      to_place: this.to_place,
      amount: this.amount,
      remarks: this.remarks,
      attachment1: this.attachment1,
    };
    await this.modalController.dismiss(onClosedData);
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  clickImage() {

    //this.attachment= 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAEmtJREFUeJztnXuUHVWVh7/uTprQIZJASCKCSTCIeQiICRh5w4ATHFCcMQ6MsMAH42Oc8YGDjsCIL0ZRBPE1MjLRAUFRkJBBRkcQeYzhzYSHmBCaCOYdAp3Oq5O+/rGpxeXS3blVtetU1a3ft9ZeKyt/dO1zqk7dU2fv/dsghBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQohAtOXtgGA0MBuYCGwC7gCeyNUjIQrAeOAqoA+oNdjdwClAe27eCZETw4CPAc/x8oXRaIuAd+TjphDhORz4f3a8MBrtXuCEHPwVIgjjgB8Qf2E02p3A0YF9FyIz2oEPAs+SfnHU2y3Yh70QpWUmcA++C6PRbgIOCjUgITzYFfgmsJ1sF0e9XQdMDzE4IdJwGrCCcAuj3rYDPwL2zXyUQsRkKnAr+SyMRtsGXIEFHoXIlS7gQmAr+S+MRtsCfBvYM7PRCzEEJwHd+DzMv8M+6t8NLHH6m5FtAi4G9shkFoRoYCIwH5+H91ngA7w0pWQY8D7gKadrRNYDfAkY4zkZQkQMBz4F9OLzwP4QCyAORifwD8CfnK4X2XrgfGBUmskQop4jgUfxeUAfI140fGfgbGC10/UjWwP8M/YdJUQixmFveo8HciPwL9gvQxJ2Ac7FPyq/HPhHYKeEfokK0o59G6zD5yH8b2Cyk2+jgc8Dzzv5Ftky4CzsG0iIQXkDdqrk8dD9EfjrjPwcC1yE/TJ5LpQlwOmoFkU0MAq4BAu0pX3I+oCvYduirJkAXIbFPTwXyqPAXFR1KrAH4Rl8Hqy7gP3Dug/Aq4HvMXCFYhp7EIv5iAoyBbgZnwdpLRa/yPuN+xrsYME7WXIhcHzAcYgcGQFcAGzG5+H5T+yboEhMBX4C9OO7UG7DKiNFi/IWYDE+D8vDFP9hOQC/yH+9/RI4OOA4RMbsib1RPR6OXuAcLLpeFg4G/gf/hTIfW4SipHRgKiJecYP5lDuV/HBsm+S5SPqxl8/rAo5DODAbO4XxeAieAt4W1v1MOQ6/eE9k27ADgn0CjkMkYDfsyNPjA7UP+AowMugIwnEi8AC+C6UPm/+9A45DNEEbcCZ+iX13AK8POoJ8aAP+BngE34WyGfgGFswUOTMDuB2fG7saeA/5xzRC044VbXmd8kXWi/0K7x5uKCJiJDb5HhHkfuBybItWZbIq2noe+Bym/CICcDKWhepx8x4C3hzW/cKTVdHWOiz1v1W/63JnMrAAn5vVA3wcpXkPxc7AJ4BV+C6UVdjcjwg3lNamE3vzeKV4/wzYK+gIys0uwGfwL9p6BvgQyYvJBHAMVq7qcUOeAOaEdb+lyKpo60nscKQj3FDKzwRMMdDjBmzBbuzOQUfQumRVtPUH4LCA4yglHVit9Hp8Jv3XwH5BR1AdJmDxDq/s6Bqm56VDk0E4GLgPn4leAZwa1v3Ksje+RVursEIw8QKeKSLbMZV1nbmHx7No66bAvheSdiww5ZUicg8m5SnyZSrwY9K/8GaFdrxITAB+i8/CeBY7LpQiR7E4ALiB5Pf13PAuF4PdsRMLj8XxX1hrZVFcZpGsaOs/8nC2CFxF+oXxKHBUYL9FcjqAK4l3j6/OxdOcmUK6vWkv8GnKVfZadQ4B7if+vb4sD2fz5tMkXxzzgUnBPRZJGQN8l+SnWu8N73L+XE/8iepGImZl4wzSJTluoqLlB3FPrhai9OgyMR2f08nPBva7MPyU+JP1AEoyLDqeBWw/pcJH9l8l+cTdBhwa3mWxA07GrwrxGipeJ3IY6SdxAXBgaMfFy/AsYFuJtV+oPG34dHTtx9IZXhvWfYEVOJ2LT7r7duBbWK2JeIGz8Hnr1DDRsu+j7M9QHAP8Hp97p9y5ITgfv0VSw4qivoHSTrLCs4BNuXNNMger2/BcKL3AhagvuBcdwEfwK2DbURts0cBITJDBWxBgPXAe6guehln4FbA9DBwR1v3WYgz25u/Fd6GsxqRrKn10GJPRwHfwKXzagPVlV+6cE1k1p4wkZnSjhuZ07MjVY86vQ0LWmTEJa3Hm0X223p7E8oQkMfNSpuHXP+QJ4ISw7leXqVjqgXfPvd8D76J6QtWNdAFfBraSfk43Yxq82s7mwBvx60xbbw9R3Uzht+OXInIfsG9Y98VAHIFfu4N6q1K740nAjfjO3zas/HlKuGGIoZiD3xFkvbVyu2NvjeOBrA/LbJgUZkhiKKIOSd7q4zVMZKCVZGeOxk/juBnbih0VSyQ8R/YCriXbG30DsH+oAWXAeHxEMpKa2rHlwDAs+NdDmJscZQ6Xqd1xO9YExytFJK1txGqB9shy0MLqSRaRz03eBsyj+O2OZwL3kv+iGMh6gC9R0XrzLNkDezi94yFJbCvw7xQvSjwa+DY+KSJ92Bt/CtlkNjwHXIA0lFPTDvw91t8u74XRaJuBSynG/vo0/FJE7uTlbbAnAlfgn9mwDutetYvbTFSIg7D4hMeN2Ihl934MvwcpsjzbHU8DfhPD16FsLSYmPlR2wX74CFM32mrgk2kmokq8AvtZ99gq1LC66cl1f38kcA6wxunvR/Y84bYNXVj2s0eKSA3Lexsb4/oH4h9srGF6vFVP/xmSU4Hl+Ez2MiydYjBGYZWN3ic9WW8bTsLE9Dx8fYR0dRqzgVucfInsohT+tCyvw9qleUxwHzbJzQrOjQG+gP+x8WrgbPx6I07E5Fc9fOsFPoVf+v+xwO+cfKsB73Tyq/R0AV/E75TkdmBGQl+yak65HOu7uFNCv4ZjmsZexWQ3kl0qyElYAmhaH1egpquciN9WYTVwJj7716yKtv4IfIB4b+2jsFYPHtdfhom8ZU0b8Lek7wEzN4CvheUr+Nz0fiw5LosTJO/mlJE9ifUFHzbEtcdj2bEe14tiGqE1jodhCu1JU+q/HtjfwvAJfG78w4TJvN0H+AH+MYDFWPyiXv6mHfgwfiIWA8U0QrMTpowSV8HmqjyczZvxpN9Lb8DOzId6A2fBfph2rHcM4DHgFKwN9j1Of3Mt8H6Kc2Q6F3iaeGO4IhdPc+Y80t3468k/xeP1wM/xXSSeNo/iJAXuS7L+hDUsZ6ty3E2yyVoKvDUHf4diJvAL8l8QkaWNaXgyAqtP30zy8RwX3OsC8BzxJikSAijykd+hwK3ktzA2Uqy+jXMwZZM0Y+qmONvDoMRdIA9RnhLYY4G7CLs4FlCc8ta9MS2stGPaQmtVc8biYZJN2s2UZ9JOIJt6+XoLFdNohuGYeuIG0o9rGxWPosftld1oZSmBbQPeQfIXwmAWxTSKkh5+OH5jXI46iPFXpJ/IMpXAtmMJmGmjyjVs+1aUl8M4LDbksTDURKeONvzO+rdhN6noJbBgUqdnYlH0uOMsUkyjHfggfgVsd2OigKKO6VjulMcE13ixBLYMEjPDsQes2aDZPIoT03gjyY/pG20dNg9qojMIM7APTa9FUuPFEtgydJkaAXyUgRdKL6ZHPDs3717KrtgWyKuAbR7FWfSFZhSW6u5dsLQB+DfKoZzRiYm6vQf7VplFscSfT8OvC9giynNkXyjGAJ/HSlY9F4qUM5IzFb/gZw+WoBo6d67l2B2T4vcuWFqHadKGTvcuI13Yr69Xrfu1wKuCjqACvBLb83rdpMhWAR+nWFuYIuHZDmEx8Jaw7lePydgxrtfHYWRRO7bOcEMpNJPxUyjZhAlhJC0vFgmYTjbp5d1YxVtV98adwLn4bWlvohwxqZblTfiJpDVuB/6Oap3JH4u1ofOaw7tR//PCMAcf5YxGewTrN1KEiHVWvBK4Gv+5q/Hi8XoeCpOigXbsjL4b/xt9P5Yz1kp0AP9E/HKDJPY8VsOj3KoCsC/+WruR/R+tUdX2JuABsl8YjfYs9o0zKvshikaGY/q6XmJqQ9ltFKeUNQ67AZeTf8uINdi96sp2uCLiSOx7IfSN/iVwSIDxpaUNO53zTAj1sJWYur7iUBkxDj8xtTS2AHhDxmNNyv6YFpbHOHswgb/Hnf5eZM9g2l+KQzkR1SB4ial5WD/wMyxGUwRGYUqEXuJ29SkiUS1Lt9PfjmwZcBbFEZsoJTPxK7D6A75n/zUsyv8j7LAgL+Zib2WP8SwB/nKQ63RijUG92lNEthQ4A1uIokk8++1twGRxOrGbcDr2IHje5G1YE5pJGczFYKQRZWu0zVjmczPfB13YR/dap2tH9jjadjXFu/GrQbiWgZUYh2HtxryS8yLbCnyXbKsbPUTZ6u1XJPsF3PUFPzzLFBairOtBmYZfDcLjwPFNXLMTS1z02qLUv5GzaPDpIcoW2Z+Adzn4NBZTWtnk5NeNVCvtZ4d41iBsxIJTcX+qR2Cp8KscfKi3qMFnnP5/A+ElylbDtoOXYr0gPdkT+A4+9/EcZ99Ki2cNwg2k/wYYiX2veLed7sHavMVNv/AUZathbdKyPqL2KFPopeJ162OxB9rjpj+JdavyZFfso9U7d2k9Vi/RzNv7CPxE2dZh/eZDbl2mYeITSSP57w/oa6EYj0/waQsmkZ+lsPVu2PbPO6VlLfZLNZBC4jjgh47Xmke+b+ODSKaCf1kezhYBj5YB/0tYZcXxwCX4nRxFthrbQo3EPyBapHYIHcSXnb0mF09z5nDS3fTlWDemvNgLE6nzrpdfiV/GbS/2kVuUCPUhWAlB3HF8Lw9n82YeyW76NuwntygSPlHfQu96+bT2c+DVGY47DmOwmFDSOfpMeJfzZynxJ2ohto8tIlOBn5B/Snk3/gcVaTiDdEfm/cCU0E4XgbgCAfMoRwnsgfgpg8SxrdhBRVFqLaYDvyX9uK4M7XhRSBKx/hXWAbYMHIL5G2Jx3Ir9ghWBkVhA1KOn/EKK3XIvUxaSfOLmAweEdzkRRwJ3EH+MzWzVVmL5akXhZPyCvQspTku5XLiAdBNYpuY5YKnjcdL1hwpMbscynIsihjAZKx7zWBgrsSzrMmynM2UKPj/DUfOcyWHdT8zbaE6qaAUWAG38/3spTo9GT8G57Vj+1pigIyg4F+Hz1qkRJr3cizYse/Yxhh7Torp/r8eKlIqS3XoMfkVn91Oeb8vgfBm/RVLDUq0voRzqfh3YN8Rg6TZ3YFvJq/BPl0/KBKxy0uNePQd8BFUQ7pCz8auhjmwDduxZhp/sdmzrdQ0m3XkXJkrxToqzMDqwh9mrydHVmLqjaJIZwPX4LpJoa3I+Ei1Lwyz8+r0/DvxFWPdbi1n41VfX2xrgkxQnkFYGRmMfzh5pNJuA81A7BDeOwCcS22jLsa2CRAGG5nT8pFx/AbwmrPvV4Tis+s17oTyFiTVUtSfIYEzDJFY95vhpTCVfBOBE4EH8F8pi7CSpKMenedGFnSh6pO/3AV9j4CIwkSFt2MnOo/gvlCr0BBkMTz2AOzHZU5Ej7dhbfzH+C+U+4K3hhpIrk/DLPF6LbVmr+IIpLMMw9fJu/BfKXVi0uBXpxNphe6SI9ANXkF7OSGRIVqJvNeAW4M3hhpI5R7PjFJdmbRFwWFj3RRpGYH0nsug0dRPFrWZshvFYyorHXGzAsh90AlhSItE3b1HlGhbtnxFuKKlpx5IcvVJErmNgjWNRQl4BfBZ/0beo1cFrg40kGTOx9HiPMS+lOocXlWM34EL8ZDsjy6PVQTN4tozYgkmlVrb0tUqMAy7GT308sq3YA/kq8uc0/L7Bfk15KjaFI3sC32Lgir00tglbgHnIe04DfhPD16FsBXBqUO9FIZkIfB+f0t96C1mL0oVtHz1SRLYD36Q4onyiIEzB9Je81RHXA/+Kf/+NiJPwC5Leg33UCzEo07BWbd7qiGsxjVyvWpSJmPSR1yL+EErWFDE4AL+eJfW2EgtkNtMgcyCGY/EdrxYMV2IBRCESMQu4Gf+F8jT21o5TtHUUflnMj2EpJ0K4cCh+TUXrrZsdF22NxwQcPK63EUtSVDWlyIRjsHoH74WyBItf1H8HtAMfxq+JzgLKI64nSk5cGdE4W59TMBE1r7+/DNPMFSI4zcqI5mF9mMr6yMxGL0QTtAFzyaYMOKndTrkyjkUFaMe+I5aQ38JYDZyJyl5FgcmyDHgw6wcux7KWhSgFWZYB19uDwOxAYxLCnRHAR7EMWc+F0YNF5aWMLlqCLiwfaw3pF8e1FKP2RAh3RmEizklqxJdgMRghWp4xWClrDzteGJuxno5JkxyFKC1jMU3cgbZevcClwD65eVdxdF5eHDqxpMjJmBjEUkwGdVOeTgkhhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgTizxjGvA+Dib3TAAAAAElFTkSuQmCC'

    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {

      this.attachmentBase64 = 'data:image/jpeg;base64,' + imageData
      this.attachment1 = 'jpeg,'+imageData
      this.file_type = 'img'

    }, (error) => {
      this.appCommon.presentToast(error)
    });

  }

  selectFromGallery() {

    // this.attachment= 'data:image/jpeg;base64,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'
 
     const options: CameraOptions = {
       quality: 75,
       destinationType: this.camera.DestinationType.DATA_URL,
       encodingType: this.camera.EncodingType.JPEG,
       mediaType: this.camera.MediaType.ALLMEDIA,
       sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
     }
 
     this.camera.getPicture(options).then((imageData) => {
 
       this.attachmentBase64 = 'data:image/jpeg;base64,' + imageData
       this.attachment1 = 'jpeg,'+imageData;
       this.file_type = 'img'
     }, (error) => {				
       this.appCommon.presentToast(error)
     });
 
   }

   fileFunc() {
    this.is_contact = 'No';
    this.attachmentBase64 = '';
    this.view_file_name = ''; 
    this.contact_attch_name = '';
    this.contact_attch_phone = '';
 
    if (this.plt.is('ios'))
    {
      this.iOSFilePicker(); 
    }
    this.FilePicker();
  }

  iOSFilePicker(){
    this.docPicker.getFile('all') 
    .then(async uri => { 
      this.view_file_name = uri.substr(uri.lastIndexOf('/') + 1);
      this.attachment1 = uri;
      
      var currentName = uri.substr(uri.lastIndexOf('/') + 1);
      var correctPath = uri.substr(0, uri.lastIndexOf('/') + 1);
      this.is_image = 'No';
      this.lastImage = currentName; 
      this.file_type = 'doc'
   
      this.makeFileIntoBlob(this.attachment1).then((resolve)=>{ 

          var filereader = new FileReader();
          filereader.readAsDataURL(resolve['imgBlob']);
          filereader.onload=()=>{ 
            this.attachmentBase64 = filereader.result;
            this.attachment1 = resolve['fileName'].split('.')[1]+","+filereader.result.toString().split(',')[1];
          }
      });
 
    })
    .catch(e => console.log(e));
  }

  FilePicker(){ 
    this.fileChooser.getFile()
      .then(file => {
        
        this.view_file_name = file.name; 
        this.attachment1 = file.name.split('.')[1]+","+file.dataURI.split(',')[1];
        this.attachmentBase64 = file.dataURI;
        // this.attachmentFiles = file.uri; 
        var currentName = file.uri.substr(file.uri.lastIndexOf('/') + 1);
        var correctPath = file.uri.substr(0, file.uri.lastIndexOf('/') + 1);
        this.is_image = 'No';
        this.lastImage = currentName;
        // this.view_file_name = file.name;
        this.file_type = 'doc'
      })
      .catch((error: any) => console.error(error));
  
  }

  deleteAttachmentFile() { 
    this.view_file_name = '';
    this.attachmentBase64 = '';
    this.attachment1 = ''
  }

  async chooseImage() {
    const alert = await this.alertController.create({
      message: 'Are you sure, you want delete the Image.',
      buttons: [
        {
          text: 'Delete',
          cssClass: 'secondary',
          handler: () => {
            this.deleteImage();
          }
        },
        {
          text: 'View',
          cssClass: 'secondary',
          handler: () => {
           this.viewHeaderImage();
          }
        }
      ]
    });
    await alert.present();
  }

  deleteImage() {
    this.attachment1 = ''
  }


  viewHeaderImage() { 
    // this.photoViewer.show(this.appCommon.baseAttachmentUrl + this.attachment_display, '', { share: false });
    this.photoViewer.show(this.attachmentBase64, "", { share: false });
  }

  OpenNativeFileDownload(fileUrl) {
 
    // this.browserTab.isAvailable()
    //   .then(isAvailable => {
    //     if (isAvailable) {
    //       this.browserTab.openUrl(fileUrl);
    //     } else {
    //       //TODO
    //     }
    //   });  
     
  }

  ClaimCoponentConfiguration()
  {
      if (navigator.onLine) {
        //CONTINUE
      } else {
        this.appCommon.presentNoInternetToast('No Network Connection');
        return false;
      }
      // this.saveClicked = true;
      let postData = {
  
        'employee' : this.loginData['fw_emp_int_code'],
        'claim_type':this.claim_type,
        'city_category':this.city_category, 
        'component':this.component,
        
      };
      // alert(this.claim_date);
   
      this.http.post(this.appCommon.baseAppUrl + "GetClaimCoponentConfigurationFromMobile", postData)
        .subscribe(response => {
  
          console.table(response) 
  
          if (response['error_code'] == '0') {  
  
            // this.amount = (response['data']);  
            this.per_km_amount= response['data']['per_km_amount']; 
            this.max_amount= response['data']['max_amount'];
            this.trip_claim= response['data']['trip']; 
            if(response['data']['limit_type'] == 'Fixed')
            {
              this.amount =  response['data']['max_amount'];
              this.isEnabled = true;
            }
            // this.bills_required= response['data']['bills_required'];
            // this.place_required= response['data']['place_required'];
          
          }
          else
          {
            this.appCommon.presentAlert(response['data'])
          }
          if(response['data']['per_km_amount'] > 0)
            this.show_km = true;
          else 
            this.show_km = false;

          if(response['data']['bills_required'] == 'Yes')
            this.show_attach = true;
          else
            this.show_attach = false;

          if(response['data']['place_required'] == 'Yes')
            this.show_place = true;
          else
            this.show_place = false;
        }, error => {
          // this.saveClicked = false;
          this.appCommon.presentToast("Error->" + JSON.stringify(error))
        });
        
  }

  GetTripKMs()
  {
    if(this.trip_claim == 'Yes')
    {
      if (navigator.onLine) {
        //CONTINUE
      } else {
        this.appCommon.presentNoInternetToast('No Network Connection');
        return false;
      }
      let postData = {

        'employee' : this.loginData['fw_emp_int_code'],
        'claim_date':this.claim_date,
    
      };
      // alert(this.claim_date);
  
      this.http.post(this.appCommon.baseAppUrl + "GetTripKMsFromMobile", postData)
        .subscribe(response => {

          console.table(response) 
          this.from_place = '';
          this.to_place = '';
          if (response['error_code'] == '0') {  

          if(this.kilometers= response['data']['tot_distance'])
          {
            this.isEnabled = true;
          }
            this.cut_off_date= response['data']['cut_off_date'];  
           if(response['data']['count'] == 1)
           {
              this.from_place= response['data']['start_location'];
              this.to_place= response['data']['end_location'];
           }
            this.CalcKMAmont();
          }
          else
          {
            this.appCommon.presentAlert(response['data'])
          }
    
        }, error => {
          // this.saveClicked = false;
          this.appCommon.presentToast("Error->" + JSON.stringify(error))
        });
    }
  }

  CalcKMAmont()
  {
    this.amount = Math.round(this.per_km_amount*this.kilometers);
  }

  makeFileIntoBlob(filePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
     let fileName = "";
     this.file
       .resolveLocalFilesystemUrl(filePath)
       .then(fileEntry => {
         let { name, nativeURL } = fileEntry;
   
         // get the path..
         let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
         console.log("path", path);
         console.log("fileName", name);
   
         fileName = name;
   
         // we are provided the name, so now read the file into
         // a buffer
         return this.file.readAsArrayBuffer(path, name);
       })
       .then(buffer => {
         // get the buffer and make a blob to be saved
         let imgBlob = new Blob([buffer], {
           type: "image/jpeg"
         });
         console.log(imgBlob.type, imgBlob.size);
         resolve({
           fileName,
           imgBlob
         });
       })
       .catch(e => reject(e));
    });
  }
}
