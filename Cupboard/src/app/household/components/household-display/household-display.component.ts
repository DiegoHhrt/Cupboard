import { Component, OnInit } from '@angular/core';
import { Household } from 'src/app/interfaces';
import { HouseholdInfoService } from 'src/app/services/household-info.service';

@Component({
  selector: 'household-info-display',
  templateUrl: './household-display.component.html',
  styleUrls: ['./household-display.component.css'],
})
export class HouseholdDisplayComponent implements OnInit {
  public household!: Household;
  public editing: boolean = false;

  constructor(private householdService: HouseholdInfoService) {}

  ngOnInit(): void {
    this.householdService.getSelf().subscribe((response) => {
      if (response.ok) this.household = response.household!;
    });
  }
  public toggleEditMode = (changeMode: boolean): boolean =>
    (this.editing = changeMode);
}
