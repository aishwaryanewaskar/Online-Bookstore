import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AngularOnlinebookstoreService } from 'src/app/angular-onlinebookstore.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent {
  url: string = "/customer/home";
  userName: string = '';
  constructor(
    private service :AngularOnlinebookstoreService,
    private router:Router
  ) {
    if (this.service.getCustomerName() !== null) {
      this.userName = this.service.getCustomerName();
    }
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: any) => {
      this.url = event?.url;
    });
  }
  routerToLink(link: string): void {
    if (link === '/customer/logout') {
      this.service.customerLogout();
      return;
    }
    this.router.navigate([link]);
  }

}
