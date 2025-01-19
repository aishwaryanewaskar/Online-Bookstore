import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AngularOnlinebookstoreService } from 'src/app/angular-onlinebookstore.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})


export class AdminLoginComponent {

  email: string="";
  password="";


  constructor(
    private router:Router,
    private service:AngularOnlinebookstoreService
  ) { }
 
  ngOnInit(): void {}
  signIn(): void{
    const pattern=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!pattern.test(this.email)){
      alert("Password should not be blank");
      return;
    }
    if (this.password===''){
      alert("Password should not be blank");
      return;
    }
    // alert ("success")
    const body={
      "adminEmailId": this.email,
      "adminPassword": this.password,
    }

    this.service.adminSignIn(body).pipe(take(1)).subscribe((res: any) => {
      console.log("*****",res);
      if(res && res?.adminId){
        let userName = '';
        if(res?.firstName){
          userName+=res?.firstName;
        }
        if(res?.lastName){
          userName+=' ' + res?.lastName;
        }
        this.service.storeAdminUserName(userName);
        this.service.storeAdminAuthorization(res?.adminId);
        this.router.navigate(['/admin/home']);

      }
    }, err =>{
      console.log("Error ",err);
      alert("Something wrong in login , pls try again");
    
    })
  }
}
