import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AngularOnlinebookstoreService } from 'src/app/angular-onlinebookstore.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  url: string = '';
  userName: string = '';
  constructor(
    private service :AngularOnlinebookstoreService,
    private router:Router,
    private changeDetector: ChangeDetectorRef
  ) {
    if (this.service.getAdminName() !== null) {
      this.userName = this.service.getAdminName();
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
    if (link === '/admin/logout') {
      this.service.adminLogout();
      return;
    }
    this.router.navigate([link]);
  }
}
