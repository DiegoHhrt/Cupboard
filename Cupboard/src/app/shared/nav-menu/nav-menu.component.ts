import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

interface RouteLink {
  name: 'Home' | 'My profile' | 'My household' | string;
  route: '/home' | '/user' | '/household';
}

@Component({
  selector: 'shared-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
  @Input() public household: false | string = false;

  private routeLinks: RouteLink[] = [
    {
      name: 'Home',
      route: '/home',
    },
    {
      name: 'My profile',
      route: '/user',
    },
    {
      //TODO: Listen to household changes
      //TODO: If user has no household, show nothing
      name: this.household ? this.household : 'My household',
      route: '/household',
    },
  ];

  public activeLink?: RouteLink;
  public unActiveLinks?: [RouteLink, RouteLink];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    //TODO: Properly guard
    this.authService.validateToken().subscribe((ok) => {
      if (!ok) this.router.navigate(['/auth']);
    });

    // console.log(this.authService.validateToken());

    if (this.router.url.includes('/home')) {
      this.activeLink = this.routeLinks[0];
      this.unActiveLinks = [this.routeLinks[1], this.routeLinks[2]];
    } else if (this.router.url.includes('/user')) {
      this.activeLink = this.routeLinks[1];
      this.unActiveLinks = [this.routeLinks[0], this.routeLinks[2]];
    } else if (this.router.url.includes('/household')) {
      this.activeLink = this.routeLinks[2];
      this.unActiveLinks = [this.routeLinks[0], this.routeLinks[1]];
    }
  }

  public logout = () => {
    //TODO: Centralize in service
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth');
  };
}
