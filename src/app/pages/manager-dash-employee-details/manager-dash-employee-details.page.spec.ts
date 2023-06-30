import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManagerDashEmployeeDetailsPage } from './manager-dash-employee-details.page';

describe('ManagerDashEmployeeDetailsPage', () => {
  let component: ManagerDashEmployeeDetailsPage;
  let fixture: ComponentFixture<ManagerDashEmployeeDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerDashEmployeeDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerDashEmployeeDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
