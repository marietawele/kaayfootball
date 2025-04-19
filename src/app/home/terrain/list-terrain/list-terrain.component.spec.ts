import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTerrainComponent } from './list-terrain.component';

describe('ListTerrainComponent', () => {
  let component: ListTerrainComponent;
  let fixture: ComponentFixture<ListTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTerrainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
