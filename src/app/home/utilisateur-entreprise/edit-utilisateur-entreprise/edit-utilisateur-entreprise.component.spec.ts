import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUtilisateurEntrepriseComponent } from './edit-utilisateur-entreprise.component';

describe('EditUtilisateurEntrepriseComponent', () => {
  let component: EditUtilisateurEntrepriseComponent;
  let fixture: ComponentFixture<EditUtilisateurEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUtilisateurEntrepriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUtilisateurEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
