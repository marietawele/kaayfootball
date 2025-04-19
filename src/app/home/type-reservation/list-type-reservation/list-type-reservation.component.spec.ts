import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeReservationComponent } from './list-type-reservation.component';

describe('ListTypeReservationComponent', () => {
  let component: ListTypeReservationComponent;
  let fixture: ComponentFixture<ListTypeReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTypeReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTypeReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
