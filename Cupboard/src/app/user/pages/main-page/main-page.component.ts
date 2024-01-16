import { Component, OnInit, inject, signal } from '@angular/core';
import { UserInfoService } from '../../../services/user-info.service';
import { Inventory, ShoppingList, User, WishList } from 'src/app/interfaces';
import { switchMap } from 'rxjs';

//TODO: subscription manager

@Component({
  selector: 'user-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  private userService = inject(UserInfoService);

  public showHouseholdOnMenu: false | string = false;

  public user = signal<User | undefined>(undefined);
  public isUserLoaded = signal<boolean>(false);
  public wishlist!: WishList;

  ngOnInit(): void {
    this.getUserInfo();
  }

  private getUserInfo = () =>
    this.userService
      .getSelf()
      .pipe(
        switchMap(({ ok, user }) => {
          if (!ok) this.isUserLoaded.set(false);
          this.isUserLoaded.set(true);
          this.user.set(user);

          return this.userService.getUserList('wishlist');
        })
      )
      .subscribe(({ ok, list }) => {
        if (!ok) return;
        this.wishlist = list;
      });

  public setShowHousehold(show: boolean): void {
    //TODO: Call household endpoint
    if (show) this.showHouseholdOnMenu = 'A name owo';
    else this.showHouseholdOnMenu = false;
  }

  public updateUserInfo = () => this.getUserInfo();
}
