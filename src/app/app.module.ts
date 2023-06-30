import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AppCommon } from './app.common';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { FrameworkReferenceFieldPageModule } from './pages/framework-reference-field/framework-reference-field.module';
import { FrameworkGridViewPageModule } from './pages/framework-grid-view/framework-grid-view.module';
import { LoadingService } from './services/loading-service';

import { BrowserTab } from '@awesome-cordova-plugins/browser-tab/ngx';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx'; 
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx'; 
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileTransfer,FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { DocumentPicker } from '@awesome-cordova-plugins/document-picker/ngx';
// import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
// import {FCM} from 'cordova-plugin-fcm-with-dependecy-updated/ionic';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    FrameworkReferenceFieldPageModule,FrameworkGridViewPageModule],
  providers: [Geolocation,NavParams,LoadingService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: AppCommon, useClass: AppCommon },
    BrowserTab,
    PhotoViewer,
    FilePath,
    File,
    FileTransfer,
    Camera,
    Chooser,
    NativeGeocoder,
    InAppBrowser,
    DocumentPicker,
    FileTransferObject,
    FileOpener,
    // FCM
    // UniqueDeviceID
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
