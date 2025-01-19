import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSignUpComponent } from './customer-signup.component';

describe('CustomerSignUpComponent', () => {
  let component: CustomerSignUpComponent;
  let fixture: ComponentFixture<CustomerSignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerSignUpComponent]
    });
    fixture = TestBed.createComponent(CustomerSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
