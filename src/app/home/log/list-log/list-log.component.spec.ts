import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLogComponent } from './list-log.component';

describe('ListLogComponent', () => {
  let component: ListLogComponent;
  let fixture: ComponentFixture<ListLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
