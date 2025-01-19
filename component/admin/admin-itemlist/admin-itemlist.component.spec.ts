import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItemlistComponent } from './admin-itemlist.component';

describe('AdminItemlistComponent', () => {
  let component: AdminItemlistComponent;
  let fixture: ComponentFixture<AdminItemlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminItemlistComponent]
    });
    fixture = TestBed.createComponent(AdminItemlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
