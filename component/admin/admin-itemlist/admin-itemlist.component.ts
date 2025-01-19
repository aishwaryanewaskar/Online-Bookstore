import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Item } from '../../model/item.model';
import { AngularOnlinebookstoreService } from 'src/app/angular-onlinebookstore.service';

@Component({
  selector: 'app-admin-itemlist',
  templateUrl: './admin-itemlist.component.html',
  styleUrls: ['./admin-itemlist.component.css']
})

export class AdminItemlistComponent implements OnInit {

  itemList: Array<Item> = [];
  getCategoryList: any[] = [];
  category: any = 100;
  allItemList: Array<Item> = [];
  offset: number = 0;
  pageSize: number = 10; // How many item you want to display in your page.
  totalItem: number = 1;

  constructor(
    private service: AngularOnlinebookstoreService,
    private router: Router
  ) {
    this.service.isAdminLoginPresent();
    this.getItemList(true);
  }

  ngOnInit(): void {
    this.getCategoryList = this.service.getCategoryList();
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

  delItem(item: Item): void {
    this.service.deleteItem(item?.itemId).pipe(take(1)).subscribe(
      (res: any) => {
        alert("Item deleted sucessfully");
        this.getItemList(this.category === 100 || this.category === "100");
      }, err => {
        console.log("Error");
      }
    )
  }

  editItem(item: Item): void {
    this.router.navigate(['/admin/additem'], {
      queryParams: {
        id: item?.itemId
      }
    });

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