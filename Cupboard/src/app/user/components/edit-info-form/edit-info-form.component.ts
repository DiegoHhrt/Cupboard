import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserInfoData } from 'src/app/interfaces';
import { UserInfoService } from 'src/app/services/user-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-edit-info-form',
  templateUrl: './edit-info-form.component.html',
  styleUrls: ['./edit-info-form.component.scss'],
})
export class EditInfoFormComponent implements OnInit {
  @Input() public user!: User;

  @Output() public onToggleEditMode: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserInfoService
  ) {}

  UpdateForm: FormGroup = this.fb.group({
    name: [, []],
    userName: [, []],
    email: [, []],
    password: [, []],
    budget: [, []],
  });

  ngOnInit() {
    console.log(this.user);
  }

  public updateInfo = () => {
    if (this.UpdateForm.invalid) return;

    //TODO: Improve validation
    const updateData: UserInfoData = {};
    if (
      this.UpdateForm.get('name')?.dirty &&
      this.UpdateForm.get('name')?.value.length > 0
    )
      updateData.name = this.UpdateForm.get('name')?.value;
    if (
      this.UpdateForm.get('userName')?.dirty &&
      this.UpdateForm.get('userName')?.value.length > 0
    )
      updateData.userName = this.UpdateForm.get('userName')?.value;
    if (
      this.UpdateForm.get('email')?.dirty &&
      this.UpdateForm.get('email')?.value.length > 0
    )
      updateData.email = this.UpdateForm.get('email')?.value;
    if (
      this.UpdateForm.get('password')?.dirty &&
      this.UpdateForm.get('password')?.value.length > 0
    )
      updateData.password = this.UpdateForm.get('password')?.value;
    if (this.UpdateForm.get('budget')?.dirty)
      updateData.budget = this.UpdateForm.get('budget')?.value;

    //If no changes made, exit edit mode
    if (Object.keys(updateData).length === 0) return this.exitEditMode();

    this.userService.updateSelf(updateData).subscribe((response) => {
      if (response.ok) {
        location.reload();
        this.exitEditMode();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.msg || 'An unknown error has occurred',
        });
      }
    });
  };

  public exitEditMode = () => {
    this.onToggleEditMode.emit(false);
  };
}
