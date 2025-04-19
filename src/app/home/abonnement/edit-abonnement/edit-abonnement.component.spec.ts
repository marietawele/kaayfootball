import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAbonnementComponent } from './edit-abonnement.component';

describe('EditAbonnementComponent', () => {
  let component: EditAbonnementComponent;
  let fixture: ComponentFixture<EditAbonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAbonnementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
