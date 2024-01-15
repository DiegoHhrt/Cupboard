import { Component, OnInit, signal, inject, Input } from '@angular/core';
import { Household } from 'src/app/interfaces';
import { HouseholdInfoService } from 'src/app/services/household-info.service';

@Component({
  selector: 'household-info-display',
  templateUrl: './household-display.component.html',
  styleUrls: ['./household-display.component.scss'],
})
export class HouseholdDisplayComponent implements OnInit {
  private householdService = inject(HouseholdInfoService);

  @Input() public household!: Household;
  public editing: boolean = false;

  ngOnInit(): void {}
  public toggleEditMode = (changeMode: boolean): boolean =>
    (this.editing = changeMode);
}
