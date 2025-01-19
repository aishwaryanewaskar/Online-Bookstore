import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Item } from '../../model/item.model';
import { AngularOnlinebookstoreService } from 'src/app/angular-onlinebookstore.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent  {

  itemList: Array<Item> = [];
  quantity: number = 0;
  customer: any = {};
  getCategoryList: any[] = [];
  category: any = 100;
  allItemList : Array<Item>= [];
  offset: number = 0;
  pageSize: number = 10; // How many item you want to display in your page.
  totalItem: number = 1;

  constructor(
    private service: AngularOnlinebookstoreService,
    private router: Router,
    private snakcbar: MatSnackBar
  ) {
   this.service.isCustomerLoginPresent();
    this.getItemList(true);
    this.getCustomerDetail();
  }


  ngOnInit(): void {
   
    this.getCategoryList = this.service.getCategoryList();
  }

  getCustomerDetail(): void {
    const cid = this.service.getCustomerAuthorization();
    this.service.getCustomerById(cid).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("Customer***", res);
        if (!!res && res?.customerId) {
          this.customer = res;
        }
      }, err => {
        console.log("Err");
      }
    )
  }

  getItemList(isAllItem: boolean = false): void {
    let item: any = this.service.getAllItems(this.offset - 1 < 0 ? 0 : this.offset - 1, this.pageSize);
    if (!isAllItem) {
      item = this.service.getItemByCategory(this.category, this.offset - 1 < 0 ? 0 : this.offset - 1, this.pageSize);
    }
    item.pipe(take(1)).subscribe((res: any) => {
      ;
      if (res && res?.item && Array.isArray(res?.item)) {
        this.itemList = res?.item;
        this.allItemList = res?.item;
        this.totalItem = res?.totalItem;
      }
    }, (err: any) => {
      console.log("Error");
    });
  }

  addToCart(item: Item): void {
    const element: any = document.getElementById(item?.itemId.toString());
  let qty:any= element!==null ? element.value : 0; 
  if(qty ===""){
    element.value=0;
    qty=0;
  }
    if (qty === 0 || qty === "0") {
      alert("Quantity should not be zero");
      return ;
    }
    if (qty > item?.quantity) {
      alert('Added quantity should not greater than available quantity');
      return;
    }
    
    const body: any = {
      quantity: qty,
      mrpPrice: item?.mrpPrice,
      item: item,
      customer: this.customer
    };
    console.log("add to cart", body);
    this.service.addToCart(body, item?.itemId, this.customer?.customerId).pipe(take(1)).subscribe(
      (res: any) => {
        console.log(res);
        if (!!res && res?.cartId) {
        alert("Item added sucessfully");
          this.getItemList(true);
        }
      }, err => {
        console.log("Error");
      }
    )
  }

  getItemByCategory(): void {
    this.offset = 0;
    this.totalItem = 1;
    if (this.category === "100") {
      this.getItemList(true);
    } else {
      this.getItemList(false);
    }
  }

  onNextPageClick(pageOffSet: any): void {
    this.offset = pageOffSet;
    this.getItemList(this.category === 100 || this.category === "100");
  }

  onPreviousPageClick(pageOffSet: any): void {
    this.offset -= 1;
    this.getItemList(this.category === 100 || this.category === "100");
  }

  onFirstPageClick(pageOffSet: any): void {
    this.offset = 0;
    this.getItemList(this.category === 100 || this.category === "100");
  }

  onLastPageClick(pageOffSet: any): void {
    const lastPage = Math.ceil(this.totalItem / this.pageSize);
    this.offset = lastPage;
    this.getItemList(this.category === 100 || this.category === "100");
  }

}
