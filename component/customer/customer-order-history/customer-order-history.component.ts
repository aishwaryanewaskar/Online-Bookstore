import { Component,Inject } from '@angular/core';
import { Item } from '../../model/item.model';
import { Order } from '../../model/order.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-order-history',
  templateUrl: './customer-order-history.component.html',
  styleUrls: ['./customer-order-history.component.css']
})
export class CustomerOrderHistoryComponent {
  order: Order | undefined;
  item: Array<Item> = [];
  constructor(
    //In constructor argument pass component class name i.e OrderHistoryDialogComponent
    public dialogRef: MatDialogRef< CustomerOrderHistoryComponent >,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    console.log('>>>', data);
    if (!!data && data?.orderId) {
      this.order = data;
      if (this.order?.item && this.order?.item.length > 0) {
        this.item = this.order?.item;
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
