import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface RouteLink {
  name: 'Home' | 'My profile' | 'My household';
  route: '/home' | '/user' | '/household';
}

@Component({
  selector: 'shared-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
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
      name: 'My household',
      route: '/household',
    },
  ];

  public activeLink?: RouteLink;
  public unActiveLinks?: [RouteLink, RouteLink];

  constructor(private router: Router) {}

  ngOnInit(): void {
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
}
