import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Household } from '../../../interfaces/household.interface';

@Component({
  selector: 'household-info',
  templateUrl: './household-info.component.html',
  styleUrls: ['./household-info.component.scss'],
})
export class HouseholdInfoComponent implements OnInit {
  @Input() public household!: Household;

  @Output()
  public onToggleEditMode: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    console.log(this.household);
  }

  public enterEditMode = () => {
    this.onToggleEditMode.emit(true);
  };
}
