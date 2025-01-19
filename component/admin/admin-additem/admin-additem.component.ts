import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AngularOnlinebookstoreService } from 'src/app/angular-onlinebookstore.service';
import { Item } from '../../model/item.model';

@Component({
  selector: 'app-admin-additem',
  templateUrl: './admin-additem.component.html',
  styleUrls: ['./admin-additem.component.css']
})
export class AdminAdditemComponent implements OnInit {

  itemname: string = '';
  image: string = '';
  description: string = '';
  mrpPrice: number = 0;
  quantity: number = 0;
  isEdit: boolean = false;
  itemId: any;
  getCategoryList: any[] = [];
  category: number = 0;
  

  constructor(

    private service: AngularOnlinebookstoreService,
    private router: Router,
    private activateRouter: ActivatedRoute


  ) {
    this.activateRouter.queryParams.subscribe((params: any) => {
      if (params?.id) {
        this.isEdit = true;
        this.service.getItemById(params?.id).pipe(take(1)).subscribe((res:any)=> {
          if(!!res && res?.itemId){
          
            const item :Item=res;
            console.log('>>>>', item);
            this.itemname= item?.itemname;
            this.description=item?.description;
            this.image=item?.image;
            this.mrpPrice=item?.mrpPrice;
            this.quantity=item?.quantity;
            this.itemId=item?.itemId;
            const categoryName = this.getCategoryList.find((cate: any) => cate?.name.toString() === item?.category)?.value;
            this.category = categoryName;
            // this.mesurement = product?.measurment;
          }
          console.log(res);
        });
      }

    })
  }
  ngOnInit(): void {
    this.service.isAdminLoginPresent();
    this.getCategoryList = this.service.getCategoryList();
  }

  onAddItem(): void {
   
    if (this.itemname === '') {
      alert("Item name is required");
      return;
    }
    if (this.description === '') {
      alert("description  is required");
      return;
    }

    if (this.image === '') {
      alert("Image should not be blank");
      return;
    }
    console.log("****MRP price",this.mrpPrice);
    if (this.mrpPrice === 0 || this.mrpPrice===null) {
      alert("MRP Price should not be zero/blank");
      return;
    }
    if (this.quantity === 0|| this.quantity===null) {
      alert("Quantity should not be zero/blank");
      return;
    }
    
 

    const body: any = {
      itemname: this.itemname,
      image: this.image,
      description: this.description,
      mrpPrice: this.mrpPrice,
      quantity: this.quantity,
      category: this.category,
      // measurment: this.mesurement
    }
    if(this.isEdit){
      console.log("=======>", body);
    this.service.editItem(body,this.itemId).pipe(take(1)).subscribe((res: any) => {
      console.log("***", res);
      if (res && res?.itemId) {
        alert("Item updated sucessfully");
        this.router.navigate(["/admin/itemlist"]);
      }
    }, err => {
      console.log("Error  ", err);
      alert("Something going wrong!!pl try again");
    })
    }else{
      console.log("=======>", body);
      this.service.addItem(body).pipe(take(1)).subscribe((res: any) => {
        console.log("***", res);
        if (res && res?.itemId) {
          alert("Item added sucessfully");
          this.router.navigate(["/admin/itemlist"]);
        }
      }, err => {
        console.log("Error  ", err);
        alert("Something going wrong!!pl try again");
      })
    }
  }
}
