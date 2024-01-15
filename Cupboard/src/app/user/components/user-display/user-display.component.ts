import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'user-info-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss'],
})
export class UserDisplayComponent implements OnInit {
  @Output()
  public togShowHOnMenu: EventEmitter<boolean> = new EventEmitter();

  @Input() public user!: User;
  public editing: boolean = false;

  constructor(private userService: UserInfoService) {}

  ngOnInit(): void {}

  public toggleEditMode = (changeMode: boolean): boolean =>
    (this.editing = changeMode);
  public toggleShowHouseholdOnMenu = (toggle: boolean): void => {
    this.togShowHOnMenu.emit(toggle);
  };
}
