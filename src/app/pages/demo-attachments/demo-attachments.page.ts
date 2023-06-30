import { Component, OnInit } from '@angular/core';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { AppCommon } from 'src/app/app.common';
import { HttpClient } from "@angular/common/http";
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx'; 
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-demo-attachments',
  templateUrl: './demo-attachments.page.html',
  styleUrls: ['./demo-attachments.page.scss'],
})
export class DemoAttachmentsPage implements OnInit {

  item: any;
  member_name: any;
  status: any;
  othermemberid: any = [];
  name: any;
  imgUrl: any;
  mem_img: any;
  base64Image: any = '';
  chatMembers: any = [];
  conversations: any;
  is_contact: any = 'No';
  view_file_name: any = '';
  contact_attch_name: any = '';
  contact_attch_phone: any = '';
  message = '';
  myStuff: string;
  attachmentFiles = '';
  filename = '';
  targetPath = '';
  lastImage: string;
  imageURI: string;
  att_prev: any = '';
  is_image: any = 'Yes';
  scrollFab = false;
  logged_in_member: any;
  loginData: any;
  // group_name: any;
  group_chat: any = 'No';

  constructor(
    private chooser: Chooser,
    public appCommon: AppCommon,
    public http: HttpClient,
    private transfer: FileTransfer,
    private file: File,
    private fileChooser: Chooser,
    private camera: Camera,
  ) { }

  ngOnInit() {
  }

  sendMessage() {

    // if (this.attachmentFiles == '' || this.attachmentFiles == undefined || this.attachmentFiles == 'undefined') { 
        // if (this.myStuff == '' || this.myStuff == 'undefined' || this.myStuff == undefined) {
          // this.appCommon.presentToast("Cannot send empty message");
          // return false;
        // } 
    // }
    // else { 
        this.sendMessageWithAttachments();
    // }
  }
   

  sendMessageWithAttachments() {

    var url = this.appCommon.baseAppUrl+'SubmitChatMessageFromMobile';

    console.log('attvh');

    this.targetPath = this.attachmentFiles;
    this.filename = this.lastImage;

    var header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('Content-type', 'application/json');

    if (this.filename == '') {
      let data = this.attachmentFiles.split('/');
      let count = data.length;
      this.filename = data[count - 1];
    }

    let param = {
      'logged_in_member': this.logged_in_member,
      'other_member': this.othermemberid,
      'message': encodeURIComponent(this.myStuff),
      'actual_file_name': encodeURIComponent(this.view_file_name),
      'status': this.status
    }

    let options = {
      fileKey: 'fileToUpload',
      fileName: this.filename,
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: param
    }

    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.upload(this.targetPath, encodeURI(url), options)
      .then(data => {

        var response = JSON.parse(data.response);
        this.appCommon.presentToast(response.data);

        this.myStuff = "";
        this.attachmentFiles = '';
        this.filename = '';
        this.lastImage = '';
        this.att_prev = '';
        this.is_image = 'No';
        this.base64Image = '';
        this.is_contact = 'No';
        this.view_file_name = ''; 

      }, err => {
        this.appCommon.presentToast("error" + JSON.stringify(err));
      });
  }

  cameraFunc() {

    this.is_contact = 'No';
    this.view_file_name = '';
    this.att_prev = '';
    this.attachmentFiles = '';
    this.contact_attch_name = '';
    this.contact_attch_phone = '';

    const options: CameraOptions = {
      quality: 60, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }
    this.camera.getPicture(options).then((imageData) => {

      this.is_image = 'Yes';
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.attachmentFiles = this.base64Image;
 

    }, (err) => {
      this.appCommon.presentToast("Failed to Capture Image")
    });
  }

  galleryFunc() {

    this.is_contact = 'No';
    this.view_file_name = '';
    this.att_prev = '';
    this.attachmentFiles = '';
    this.contact_attch_name = '';
    this.contact_attch_phone = '';

    const options: CameraOptions = {
      quality: 60, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {

      this.is_image = 'Yes';
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.attachmentFiles = this.base64Image;
 

    }, (err) => {
      this.appCommon.presentToast("Failed to Select Image")
    });
  }

  fileFunc() {
    this.is_contact = 'No';
    this.attachmentFiles = '';
    this.view_file_name = '';
    this.att_prev = '';
    this.contact_attch_name = '';
    this.contact_attch_phone = '';
 
    this.FilePicker();
  }

  FilePicker(){ 
    this.fileChooser.getFile()
      .then(file => {
        // this.attachmentFiles = file.uri;
        // var currentName = file.uri.substr(file.uri.lastIndexOf('/') + 1);
        // var correctPath = file.uri.substr(0, file.uri.lastIndexOf('/') + 1);
        this.is_image = 'No';
        // this.lastImage = currentName;
        this.view_file_name = file.name;
 
      })
      .catch((error: any) => console.error(error));
  
  }

  deleteAttachmentFile() {
    this.base64Image = '';
    this.is_image = 'No';
    this.is_contact = 'No';
    this.att_prev = '';
    this.view_file_name = '';
    this.attachmentFiles = '';
    this.contact_attch_name = '';
    this.contact_attch_phone = '';
  }
}
