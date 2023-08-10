import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { Inventory, ShoppingList } from 'src/app/interfaces';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'shared-list-dashboard',
  templateUrl: './list-dashboard.component.html',
  styleUrls: ['./list-dashboard.component.css'],
})
export class ListDashboardComponent implements OnInit {
  @Input() public reachEndpoint: 'user' | 'household' = 'user';

  public inventory!: Inventory;
  public shoppingList!: ShoppingList;

  constructor(private userService: UserInfoService) {}

  ngOnInit(): void {
    if (this.reachEndpoint === 'user') {
      this.userService.getUserList('inventory').subscribe((response) => {
        if (response.ok) this.inventory = response.list;
      });
      this.userService.getUserList('shopping-list').subscribe((response) => {
        if (response.ok) this.shoppingList = response.list;
      });
    }
    //TODO: Add household endpoint
  }
}
