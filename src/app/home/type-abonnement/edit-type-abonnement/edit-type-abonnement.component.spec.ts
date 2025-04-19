import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeAbonnementComponent } from './edit-type-abonnement.component';

describe('EditTypeAbonnementComponent', () => {
  let component: EditTypeAbonnementComponent;
  let fixture: ComponentFixture<EditTypeAbonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTypeAbonnementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTypeAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
