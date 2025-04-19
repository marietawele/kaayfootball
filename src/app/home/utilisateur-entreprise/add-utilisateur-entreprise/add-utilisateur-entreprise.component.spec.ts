import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUtilisateurEntrepriseComponent } from './add-utilisateur-entreprise.component';

describe('AddUtilisateurEntrepriseComponent', () => {
  let component: AddUtilisateurEntrepriseComponent;
  let fixture: ComponentFixture<AddUtilisateurEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUtilisateurEntrepriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUtilisateurEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
