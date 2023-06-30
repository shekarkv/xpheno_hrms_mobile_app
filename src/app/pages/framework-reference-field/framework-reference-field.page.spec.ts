import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FrameworkReferenceFieldPage } from './framework-reference-field.page';

describe('FrameworkReferenceFieldPage', () => {
  let component: FrameworkReferenceFieldPage;
  let fixture: ComponentFixture<FrameworkReferenceFieldPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameworkReferenceFieldPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FrameworkReferenceFieldPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
