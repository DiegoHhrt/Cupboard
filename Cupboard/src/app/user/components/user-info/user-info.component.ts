import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces';
import { UserInfoService } from 'src/app/services/user-info.service';
import { DisplayPreferences } from '../../../interfaces/display-preferences.type';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  @Input() public user!: User;

  @Output()
  public onToggleEditMode: EventEmitter<boolean> = new EventEmitter();
  @Output()
  public onToggleShowHOnMenu: EventEmitter<boolean> = new EventEmitter();

  public showName: boolean = true;
  public showUserName: boolean = true;
  public showEmail: boolean = true;
  public showHouseholdOnMenu: boolean = false;

  constructor(private userService: UserInfoService) {}

  ngOnInit(): void {
    const preferences: DisplayPreferences =
      this.userService.loadDisplayPreferences();
    if (preferences.name !== undefined) {
      this.showName = preferences.name;
    }
    if (preferences.username !== undefined) {
      this.showUserName = preferences.username;
    }
    if (preferences.email !== undefined) {
      this.showEmail = preferences.email;
    }
  }

  public enterEditMode = () => {
    this.onToggleEditMode.emit(true);
  };

  public toggleProp = (toggle: 'name' | 'username' | 'email') => {
    if (toggle === 'name') this.showName = !this.showName;
    else if (toggle === 'username') this.showUserName = !this.showUserName;
    else if (toggle === 'email') this.showEmail = !this.showEmail;

    const preferences: DisplayPreferences = {
      name: this.showName,
      username: this.showUserName,
      email: this.showEmail,
    };

    this.userService.saveDisplayPreferences(preferences);
  };

  public toggleShowHouseholdOnMenu = (value: boolean) => {
    this.showHouseholdOnMenu = value;
    this.onToggleShowHOnMenu.emit(value);
  };
}
