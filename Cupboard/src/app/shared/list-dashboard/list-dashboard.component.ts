import {
  AfterContentInit,
  Component,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { Inventory, ShoppingList } from 'src/app/interfaces';
import { HouseholdInfoService } from 'src/app/services/household-info.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'shared-list-dashboard',
  templateUrl: './list-dashboard.component.html',
  styleUrls: ['./list-dashboard.component.css'],
})
export class ListDashboardComponent implements OnInit {
  @Input() public reachEndpoint: 'user' | 'household' = 'user';
  @Input() public budget?: number;

  public inventory = signal<Inventory | undefined>(undefined);
  public shoppingList = signal<ShoppingList | undefined>(undefined);
  public editing: boolean = false;

  constructor(
    private userService: UserInfoService,
    private householdService: HouseholdInfoService
  ) {}

  ngOnInit(): void {
    if (this.reachEndpoint === 'user') {
      this.userService.getUserList('inventory').subscribe(({ ok, list }) => {
        if (!ok) return;
        this.inventory.set(list);
      });
      this.userService
        .getUserList('shopping-list')
        .subscribe(({ ok, list }) => {
          if (!ok) return;
          this.shoppingList.set(list);
        });
    }
    if (this.reachEndpoint === 'household') {
      this.householdService
        .getHouseholdList('inventory')
        .subscribe(({ ok, list }) => {
          if (!ok) return;
          this.inventory.set(list);
        });
      this.householdService
        .getHouseholdList('shopping-list')
        .subscribe(({ ok, list }) => {
          if (!ok) return;
          this.shoppingList.set(list);
        });
    }
  }

  public toggleEditMode = (changeMode: boolean) => (this.editing = changeMode);
}
