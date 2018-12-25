import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoreVehicleComponent } from './add-more-vehicle.component';

describe('AddMoreVehicleComponent', () => {
  let component: AddMoreVehicleComponent;
  let fixture: ComponentFixture<AddMoreVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMoreVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoreVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
