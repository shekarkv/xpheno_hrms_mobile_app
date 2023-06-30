import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// import { AgmCoreModule } from '@agm/core';

import { LoginLayout1Page } from './login/login-layout-1/login-layout-1.page';
import { LoginLayout2Page } from './login/login-layout-2/login-layout-2.page';

import { WizardLayout1Page } from './wizard/wizard-layout-1/wizard-layout-1.page';
import { WizardLayout2Page } from './wizard/wizard-layout-2/wizard-layout-2.page';
import { WizardLayout3Page } from './wizard/wizard-layout-3/wizard-layout-3.page';
import { WizardLayout4Page } from './wizard/wizard-layout-4/wizard-layout-4.page';

import { FormsLayout1Page } from './forms/forms-layout-1/forms-layout-1.page';
import { FormsLayout2Page } from './forms/forms-layout-2/forms-layout-2.page';
import { FormsLayout3Page } from './forms/forms-layout-3/forms-layout-3.page';
import { FormsLayout4Page } from './forms/forms-layout-4/forms-layout-4.page';

import { SelectLayout1Page } from './select/select-layout-1/select-layout-1.page';
import { SelectLayout2Page } from './select/select-layout-2/select-layout-2.page';
import { SelectLayout3Page } from './select/select-layout-3/select-layout-3.page';
import { SelectLayout4Page } from './select/select-layout-4/select-layout-4.page';
import { SelectLayout5Page } from './select/select-layout-5/select-layout-5.page';
import { SelectLayout6Page } from './select/select-layout-6/select-layout-6.page';

import { RadioButtonLayout1Page } from './radio-button/radio-button-layout-1/radio-button-layout-1.page';
import { RadioButtonLayout2Page } from './radio-button/radio-button-layout-2/radio-button-layout-2.page';
import { RadioButtonLayout3Page } from './radio-button/radio-button-layout-3/radio-button-layout-3.page';

import { ToggleButtonLayout1Page } from './toggle-button/toggle-button-layout-1/toggle-button-layout-1.page';
import { ToggleButtonLayout2Page } from './toggle-button/toggle-button-layout-2/toggle-button-layout-2.page';
import { ToggleButtonLayout3Page } from './toggle-button/toggle-button-layout-3/toggle-button-layout-3.page';

import { SearchBarLayout1Page } from './search-bar/search-bar-layout-1/search-bar-layout-1.page';
import { SearchBarLayout2Page } from './search-bar/search-bar-layout-2/search-bar-layout-2.page';
import { SearchBarLayout3Page } from './search-bar/search-bar-layout-3/search-bar-layout-3.page';

import { MapLayout1Page } from './map/map-layout-1/map-layout-1.page';
import { MapLayout2Page } from './map/map-layout-2/map-layout-2.page';
import { MapLayout3Page } from './map/map-layout-3/map-layout-3.page';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';


import { FilterPipe } from './search-bar/FilterPipe';

import { ProfileLayout1Page } from './profile/profile-layout-1/profile-layout-1.page';

import { DragAndDropListLayout3Page } from './drag-and-drop-list/drag-and-drop-list-layout-3/drag-and-drop-list-layout-3.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // AgmCoreModule.forRoot({ apiKey: 'AIzaSyA-bEht-apy6Z0Z1bjgGM3MiopdTY3rcXM'}),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCQjBEpQ6BiwazVr3H_k9V_Bh8kZvZVBVg'}),
    AgmDirectionModule
  ], 
  declarations: [LoginLayout1Page, LoginLayout2Page,  WizardLayout1Page, WizardLayout2Page, WizardLayout3Page, WizardLayout4Page,
    FormsLayout1Page, FormsLayout2Page, FormsLayout3Page, FormsLayout4Page,  SelectLayout1Page, SelectLayout2Page, SelectLayout3Page,
    SelectLayout4Page, SelectLayout5Page, SelectLayout6Page, ToggleButtonLayout1Page, ToggleButtonLayout2Page, ToggleButtonLayout3Page,
    RadioButtonLayout1Page, RadioButtonLayout2Page, RadioButtonLayout3Page, SearchBarLayout1Page, SearchBarLayout2Page, SearchBarLayout3Page,
    FilterPipe,ProfileLayout1Page,DragAndDropListLayout3Page,MapLayout1Page, MapLayout2Page, MapLayout3Page

  ],
  exports: [ LoginLayout1Page, LoginLayout2Page,  WizardLayout1Page, WizardLayout2Page, WizardLayout3Page, WizardLayout4Page,
    FormsLayout1Page, FormsLayout2Page, FormsLayout3Page, FormsLayout4Page,  SelectLayout1Page, SelectLayout2Page, SelectLayout3Page,
    SelectLayout4Page, SelectLayout5Page, SelectLayout6Page, ToggleButtonLayout1Page, ToggleButtonLayout2Page, ToggleButtonLayout3Page,
    RadioButtonLayout1Page, RadioButtonLayout2Page, RadioButtonLayout3Page, SearchBarLayout1Page, SearchBarLayout2Page, SearchBarLayout3Page,
    FilterPipe,ProfileLayout1Page,DragAndDropListLayout3Page,MapLayout1Page, MapLayout2Page, MapLayout3Page
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})  
export class SharedModule { }
 