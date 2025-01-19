import { DatePipe } from '@angular/common';
  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { take } from 'rxjs';
  import { Order } from '../../model/order.model';
import { AngularOnlinebookstoreService } from 'src/app/angular-onlinebookstore.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerOrderHistoryComponent } from '../customer-order-history/customer-order-history.component';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
  export class CustomerOrderComponent implements OnInit {
    orderList: Order[]=[];
    constructor(
      private service: AngularOnlinebookstoreService,
      private router: Router,
      private datePipe : DatePipe,
      private dialog: MatDialog
    ) { 
      this.service.isCustomerLoginPresent();
    }
  
    ngOnInit(): void {
      this.getOrderList();
    }
    getOrderList():void{
      this.service.orderList(this.service.getCustomerAuthorization()).pipe(take(1)).subscribe(
        (res: any) => {
          console.log("****",res);
          if(!!res && Array.isArray(res)){
            this.orderList=res;
          }
          
        }, err => {
          console.log("Error");
        }
      )
    }
    getDate(d:string|undefined):any{
      //return  !!d ? this.datePipe.transform(new Date(d),"" )?.toString(): "";
      //return this.datePipe.transform(d,"").toString();
      let ans :any;
      console.log("DDDDDD",d);
      if(!!d && d!== null){
        ans=this.datePipe.transform(d,"shortDate")||null;
        console.log("@@@@@@@@",ans);
      }
      return ans;
    }
    
    addPayment(order: Order): void {
      this.router.navigate([`/customer/payment/${order?.orderId}/${order?.totalPrice}`])
    }
    
    openHistory(order: Order): void {
      console.log(">>>>>>>",order);
      const dialogRef = this.dialog.open( CustomerOrderHistoryComponent, {
        data: order,
        maxWidth: '100vw',
        height: '80%'
      });

    }
  }
