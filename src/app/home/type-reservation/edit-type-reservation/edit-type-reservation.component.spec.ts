import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeReservationComponent } from './edit-type-reservation.component';

describe('EditTypeReservationComponent', () => {
  let component: EditTypeReservationComponent;
  let fixture: ComponentFixture<EditTypeReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTypeReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTypeReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
