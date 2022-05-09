import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketAdminComponent } from './cricket-admin.component';

describe('CricketAdminComponent', () => {
  let component: CricketAdminComponent;
  let fixture: ComponentFixture<CricketAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CricketAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
