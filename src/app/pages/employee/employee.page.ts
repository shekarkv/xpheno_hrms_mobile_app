import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, Platform, ActionSheetController } from '@ionic/angular';
import { AppCommon } from 'src/app/app.common';
import { ActivatedRoute, Router } from '@angular/router';
// import { EmployeeProfileEditPage } from '../employee-profile-edit/employee-profile-edit.page';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
// import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { Filesystem, Directory, Encoding, FilesystemDirectory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { PhotoViewerPage } from '../photo-viewer/photo-viewer.page';

declare let cordova: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {

  loginData: any;
  login_real_name: any;
  gedit_int_code: any;
  login_email: any;
  mobile_no: any;
  designation: any;
  email: any;
  gender: any;
  father_name: any;
  pr_mother_name: any;
  marital_status: any;
  blood_group: any;
  nationality: any;
  pr_address: any;
  address: any;
  photo: any = 'assets/imgs/avatar/dp.png';
  attachment_path: any = '';
  name: any = '';
  // doc_type: any;
  // file_name: any;
  code: any;
  module: any = 'employee';
  saveClicked: boolean;
  // camera: any;
  internal_code: any;
  aadhar_number: any;
  pan_number: any;
  empData: any;
  attachmentFiles: any;
  emp_int_code: any;
  fw_candidate_int_code: any;
  fw_login_email: any;
  employee: string;
  emp_personal_card: any;
  emp_id_card: any;
  emp_info_card: any;
  in_flag: boolean;
  uan_number: any;
  eisc_number: any;
  pf_number: any;
  bank_account: any;
  g_doj: any;
  details: any;
  
  constructor(
    public alertController: AlertController,
    public navCtrl: NavController, 
    public http: HttpClient,
    public appCommon: AppCommon,
    public modalController: ModalController,
    private route: Router,
    private photoViewer: PhotoViewer,
    private plt: Platform,
    private filePath: FilePath,
    private file: File,
    private transfer: FileTransfer,
    public actionSheetController: ActionSheetController,
    private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'));
    this.empData = JSON.parse(localStorage.getItem('employeeData'));

    this.login_real_name = this.loginData['login_real_name'];
    // this.fw_login_email = this.loginData['fw_login_email'];
    this.fw_login_email = this.loginData['email'];
    this.mobile_no = this.loginData['mobile_no']; 
    this.loginData['fw_emp_int_code'];
    this.fw_candidate_int_code = this.loginData['fw_candidate_int_code']

    this.email = this.empData['email'];
    this.father_name = this.empData['father_name']; 
    this.blood_group = this.empData['blood_group'];
    this.pr_address = this.empData['pr_address']; 
    this.aadhar_number = this.empData['aadhar_number'];
    this.pan_number = this.empData['pan_number']; 
    this.photo = this.loginData['profile_photo_url'];   
    this.code = this.loginData['fw_emp_code'];  
    this.uan_number = this.empData['uan_number']; 
    this.eisc_number = this.empData['eisc_number']; 
    this.pf_number = this.empData['pf_number']; 
    this.bank_account = this.empData['bank_account'];  
    this.g_doj = this.empData['g_doj']; 
    this.employee = this.loginData['fw_emp_int_code'];
    if(this.employee == '0')
    {
      this.in_flag = true  
    };
  }

  clearFields() {  
   this.gedit_int_code= '';
   this.photo = '';
   this.ngOnInit();
 }

 nextpage() {
  this.route.navigate(['/profile-changes']);
}


  async uploadProPic() {
    this.takePicture('android');
  }

  checkPlatformForWeb() {
    if(Capacitor.getPlatform() == 'web' || Capacitor.getPlatform() == 'ios') return true;
    return false;
  }

  async takePicture(a) {

    const image = await Camera.getPhoto({
      quality: 100, 
      source: CameraSource.Prompt,
      resultType:  this.checkPlatformForWeb() ? CameraResultType.DataUrl : CameraResultType.Uri,
      correctOrientation: true
    }); 
    console.log('uploadProPic');
    let selectedImage = image;

    if(this.checkPlatformForWeb()) 
      selectedImage.webPath = image.dataUrl;  

    let newImage = selectedImage.webPath || '';
    let currentName = newImage.substring(newImage.lastIndexOf('/') + 1, newImage.lastIndexOf('?'));

    this.copyFileToLocalDir(selectedImage, currentName,  this.createFileName(), selectedImage.webPath); 
  }

  private copyFileToLocalDir(namePath, currentName, newFileName,  fileData) {

    console.log('copyFileToLocalDir');
    console.log('namePath - '+namePath);
    console.log('currentName - '+currentName);
    console.log('Data - '+FilesystemDirectory.Data);

    this.updateProfilePicture(fileData, namePath, newFileName);
    // this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
    //   this.attachmentFiles = newFileName;

    //   this.updateProfilePicture(this.attachmentFiles, namePath);

    // }, error => {
    //   this.appCommon.presentToast('Error while storing file.');
    // });
  }

  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }


  async updateProfilePicture(filePath:any, namePath:any, newFileName) {
    // let url =  "UpdateProfilePictureFromMobile"; 

    console.log("filePath.. - "+filePath);

    var base64Data = "";

    if(this.plt.is('ios'))
      base64Data = filePath.split(',')[1];
    else
      base64Data = await this.readAsBase64(namePath); 
    // console.log("base64Data.. - "+base64Data);
    const response = await fetch(base64Data);
    const blob = await response.blob();

    let formData = {
      "fileToUpload": newFileName,
      "attachment": base64Data,
      "file_name": newFileName,
      'cand_int_code': this.fw_candidate_int_code,
    };

    // console.log("fw_candidate_int_code.. - "+this.fw_candidate_int_code);

    const headers = { 'content-type': 'multipart/form-data' };    
 
    this.http.post(this.appCommon.baseAppUrl + "UpdateProfilePictureFromMobile",formData)
    .subscribe((data:any) => {  
      
        console.log("data -> "+JSON.stringify(data));

        var response = JSON.parse(data);
        // var response = JSON.parse(data.data);
        this.appCommon.presentToast(response.data);

      }, (err:any) => {

        this.appCommon.presentAlert('Server Problem')
      }
    )
 
  }
  private async readAsBase64(photo: any) {
    if (this.plt.is('hybrid')) {
        const file = await Filesystem.readFile({
            path: photo.path
        });

        return file.data;
    }
    else {
        // Fetch the photo, read as a blob, then convert to base64 format
        const response = await fetch(photo.webPath);
        const blob = await response.blob();

        return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
          resolve(reader.result);
      };
      reader.readAsDataURL(blob);
  });

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  async viewProfilePicture(path) {
      
      if(this.plt.is('ios'))
      {
        const modal = await this.modalController.create({
          component: PhotoViewerPage,
          componentProps: { 
            selectedImage: path
          },
          cssClass:'modalcss'
        });
        modal.onDidDismiss().then((dataReturned) => {    
        });
        return await modal.present();
      }
      else
        this.photoViewer.show(path, '', { share: false });
  }

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.ngOnInit();
    }, 2000);
  };

}
