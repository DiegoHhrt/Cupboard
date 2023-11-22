import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, MaterialModule],
})
export class HomeModule {}
