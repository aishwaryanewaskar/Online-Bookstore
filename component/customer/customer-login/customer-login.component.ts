import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AngularOnlinebookstoreService } from 'src/app/angular-onlinebookstore.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})

export class CustomerLoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  ccustomerLoginForm = new FormGroup({});
  customerLoginForm : any;
  constructor(
    private router: Router,
    private service:AngularOnlinebookstoreService,
    private fb: FormBuilder

  ) {
    const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
    this.customerLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(pattern)]],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });

  }

  ngOnInit(): void {
  }

  
  signIn(): void {

    const body = {
      "emailID": this.customerLoginForm.controls['email'].value,
      "password": this.customerLoginForm.controls['password'].value
    }
    console.log("=======>",body);
    this.service.customerSignIn(body).pipe(take(1)).subscribe((res :any) => {
      console.log("*****",res);
      if(res && res?.customerId){
       // alert("Login sucessful");
        this.service.storeCustomerAuthorization(res?.customerId);
        let userName = '';
        if (res?.firstName) {
          userName+=res?.firstName;
        }
        if (res?.lastName){
          userName+=' ' + res?.lastName;
        }
        this.service.storeCustomerUserName(userName);
        this.router.navigate(['/customer/home']);
       
      }
    }, err =>{
      console.log("Error  ",err);
      alert("Customer not found  !!pl try again");
    })

  }

  routeToNewUser(): void {
    this.router.navigate(["/customer-register"]);
  }

  routeToForgotPassword(): void {
    this.router.navigate(["/forgot-password"]);
  }
}

