import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeAbonnementComponent } from './add-type-abonnement.component';

describe('AddTypeAbonnementComponent', () => {
  let component: AddTypeAbonnementComponent;
  let fixture: ComponentFixture<AddTypeAbonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTypeAbonnementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTypeAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
