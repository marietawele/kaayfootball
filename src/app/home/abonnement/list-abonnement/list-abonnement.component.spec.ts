import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAbonnementComponent } from './list-abonnement.component';

describe('ListAbonnementComponent', () => {
  let component: ListAbonnementComponent;
  let fixture: ComponentFixture<ListAbonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAbonnementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
