import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseholdRoutingModule } from './household-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { HouseholdDisplayComponent } from './components/household-display/household-display.component';
import { HouseholdInfoComponent } from './components/household-info/household-info.component';
import { EditInfoFormComponent } from './components/edit-info-form/edit-info-form.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainPageComponent,
    HouseholdDisplayComponent,
    HouseholdInfoComponent,
    EditInfoFormComponent,
  ],
  imports: [
    CommonModule,
    HouseholdRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class HouseholdModule {}
