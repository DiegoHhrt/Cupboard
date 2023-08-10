import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Household } from 'src/app/interfaces';
import { HouseholdInfoService } from 'src/app/services/household-info.service';

@Component({
  selector: 'household-edit-info-form',
  templateUrl: './edit-info-form.component.html',
  styleUrls: ['./edit-info-form.component.css'],
})
export class EditInfoFormComponent {
  @Input() public household!: Household;

  @Output() public onToggleEditMode: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private householdService: HouseholdInfoService
  ) {}

  public UpdateForm: FormGroup = this.fb.group({
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
