import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUtilisateurEntrepriseComponent } from './list-utilisateur-entreprise.component';

describe('ListUtilisateurEntrepriseComponent', () => {
  let component: ListUtilisateurEntrepriseComponent;
  let fixture: ComponentFixture<ListUtilisateurEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUtilisateurEntrepriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUtilisateurEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
