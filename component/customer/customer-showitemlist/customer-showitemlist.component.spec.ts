import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerShowitemlistComponent } from './customer-showitemlist.component';

describe('CustomerShowitemlistComponent', () => {
  let component: CustomerShowitemlistComponent;
  let fixture: ComponentFixture<CustomerShowitemlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerShowitemlistComponent]
    });
    fixture = TestBed.createComponent(CustomerShowitemlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
