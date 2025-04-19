import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeAbonnementComponent } from './list-type-abonnement.component';

describe('ListTypeAbonnementComponent', () => {
  let component: ListTypeAbonnementComponent;
  let fixture: ComponentFixture<ListTypeAbonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTypeAbonnementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTypeAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
