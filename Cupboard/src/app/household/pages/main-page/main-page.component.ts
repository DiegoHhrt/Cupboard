import { Component, OnInit } from '@angular/core';
import { Household, PlannedFoods } from 'src/app/interfaces';
import { HouseholdInfoService } from 'src/app/services/household-info.service';

@Component({
  selector: 'household-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  public household?: Household;
  public plannedFoods!: PlannedFoods;

  constructor(private householdService: HouseholdInfoService) {}

  ngOnInit(): void {
    this.householdService.getSelf().subscribe((response) => {
      if (response.ok) this.household = response.household;
    });
    this.householdService
      .getHouseholdList('planned-foods')
      .subscribe((response) => {
        if (response.ok) this.plannedFoods = response.list;
      });
  }
}
