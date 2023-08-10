import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserInfoService } from '../../../services/user-info.service';
import { Inventory, ShoppingList, User } from 'src/app/interfaces';
import { switchMap } from 'rxjs';

@Component({
  selector: 'user-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  public showHouseholdOnMenu: false | string = false;

  public user?: User;

  constructor(private userService: UserInfoService) {}

  ngOnInit(): void {
    this.userService.getSelf().subscribe((response) => {
      if (response.ok) this.user = response.user;
    });

    this.userService.getUserList('wishlist');
  }

  public setShowHousehold(show: boolean): void {
    //TODO: Call household endpoint
    if (show) this.showHouseholdOnMenu = 'A name owo';
    else this.showHouseholdOnMenu = false;
  }
}
