import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'user-edit-info-form',
  templateUrl: './edit-info-form.component.html',
  styleUrls: ['./edit-info-form.component.css'],
})
export class EditInfoFormComponent {
  @Input() public user!: User;

  @Output() public onToggleEditMode: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserInfoService
  ) {}

  UpdateForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    budget: ['', [Validators.required]],
  });

  public updateInfo = () => {
    console.log('update');
  };

  public exitEditMode = () => {
    this.onToggleEditMode.emit(false);
  };
}
