import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { UserDisplayComponent } from './components/user-display/user-display.component';
import { MaterialModule } from '../material/material.module';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { EditInfoFormComponent } from './components/edit-info-form/edit-info-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainPageComponent,
    UserDisplayComponent,
    UserInfoComponent,
    EditInfoFormComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
