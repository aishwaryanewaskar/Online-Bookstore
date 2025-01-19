import { Component, OnInit } from '@angular/core';
import { AngularOnlinebookstoreService } from 'src/app/angular-onlinebookstore.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit { 
  userName: string='';
  constructor(
    private service: AngularOnlinebookstoreService
  ){
    if (this.service.getAdminName() !== null) {
      this.userName=this.service.getAdminName();
    }
    this.service.isAdminLoginPresent();
  }
  ngOnInit(): void {
      
  }
  
}
