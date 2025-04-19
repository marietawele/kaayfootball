import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeReservationComponent } from './add-type-reservation.component';

describe('AddTypeReservationComponent', () => {
  let component: AddTypeReservationComponent;
  let fixture: ComponentFixture<AddTypeReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTypeReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTypeReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
